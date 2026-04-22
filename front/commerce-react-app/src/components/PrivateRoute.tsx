// components/PrivateRoute.jsx (예시 경로)
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // AuthContext 사용

const PrivateRoute = () => {
  const { user, loading } = useAuth(); // 로그인 정보와 로딩 상태 추출

  // 데이터 로딩 중일 때 처리 (필요시)
  if (loading) return <div>Loading...</div>;

  // 로그인이 안 되어 있으면 로그인 페이지로 이동
  return user ? <Outlet /> : <Navigate replace to="/login" />;
};

export default PrivateRoute;