export interface User {
  user_id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
  avatar?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user_id: number;

}

export interface CheckUserResponse {
  username: string;
  available: boolean;
}

export interface UserInfo {
  full_name?: string;
  user_id?: number;
  username?: string;
  avatar?: string;
}
