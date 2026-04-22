import type { LoginRequest, LoginResponse, JoinRequest, JoinResponse } from "../types/auth.types";
import api from "./axiosInstance";

export const authApi = {
    login : async (request : LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/api/auth/login", request);
        return response.data;
    },

     join: async (request: JoinRequest): Promise<JoinResponse> => {
        const response = await api.post<JoinResponse>("/api//user/auth/join", request);
        return response.data;
    },
    
    refresh: async(refreshToken: string): Promise<LoginResponse> =>{
        const response = await api.post<LoginResponse>("/api/user/auth/refresh", {refreshToken});
        return response.data;
    },


    verifyToken :async(): Promise<boolean> =>{
        return true;
    },
}