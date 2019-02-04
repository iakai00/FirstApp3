
export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
  avatar?: string;
  confirmPassword?: string;


}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
  user: User;

}

export interface CheckUserResponse {
  username: string;
  available: boolean;
}

