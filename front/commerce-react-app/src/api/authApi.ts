import type { LoginRequest, LoginResponse, JoinRequest, JoinResponse } from "../types/auth.types";
import api from "./axiosInstance";

export const authApi = {
    login : async (request : LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/api/auth/login", request);
        return response.data;
    },

    join: async (request: JoinRequest): Promise<JoinResponse> => {
        try {
            await api.post("/api/auth/join", request);
            return { success: true };
        } catch (err: any) {
            return { 
            success: false, 
            message: err.response?.data?.message || "알 수 없는 오류가 발생했습니다." 
            };
        }
    },
    
    refresh: async(refreshToken: string): Promise<LoginResponse> =>{
        const response = await api.post<LoginResponse>("/auth/refresh", {refreshToken});
        return response.data;
    },


    verifyToken :async(): Promise<boolean> =>{
        return true;
    },
}