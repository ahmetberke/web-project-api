export interface RegisterDTO {
  email: string;
  username: string;
  password: string;
  fullname: string;
  role: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}