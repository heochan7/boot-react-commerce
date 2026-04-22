import type { User } from "./user";

export interface LoginRequest{
    email : string,
    password: string
}

export interface LoginResponse {
  token: string,
  user: User
}

export interface JoinRequest{
  username : string,
  phone? : string,
  email : string,
  password: string,
}

export interface JoinResponse{
  success : boolean,
  message? : string
}

// id, createdAt, updatedAt, businessName, business_number, status, user_id
export interface StoreJoinRequest extends JoinRequest{
  businessName: string,
  business_number: string,
}