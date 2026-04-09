import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { authApi } from "../api/authApi";
import type { LoginRequest } from "../types/auth.types";
import type { User } from "../types/user";

// 1. Context에서 관리할 상태들의 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 로그아웃 함수: 상태와 저장소를 한 번에 비움
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }, []);

  // 앱 실행 시 로그인 상태 복원 (Silent Re-auth)
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("accessToken");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          const isValid = await authApi.verifyToken();
          if (isValid) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error("인증 복원 실패:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [logout]);

  // 로그인 함수
  const login = async (request: LoginRequest) => {
    try {
      const response = await authApi.login(request);
      
      console.log(response);
      const { token, user } = response;

      setUser(user);
      setIsAuthenticated(true);


      localStorage.setItem("user", JSON.stringify(user)); 
      
    } catch (error) {
      console.error("Login failed in Context:", error);
      throw error; 
    }
  };

  // 마이페이지 등에서 닉네임 수정 시 Context 상태만 살짝 바꿀 때 사용
  const updateUser = useCallback((updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  }, []);

  // 2. 가치(Value) 메모이제이션: 불필요한 전체 리렌더링 방지z
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  }), [user, isAuthenticated, loading, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};