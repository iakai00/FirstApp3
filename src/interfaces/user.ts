export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: Date;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface Success {
  message: string;
  token: string;
}
