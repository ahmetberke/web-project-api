import { deleteCookie, setCookie } from "cookies-next"
import instance from "./instance";

export interface User {
  
  id : string;

  email: string;
  username: string;
  password: string;
  fullname: string;
  role: string;
  
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

}

export interface LoginResponse {
  user: User;
  token: string;
}

const Login = async (payload: {
  email: string
  password: string
}) : Promise<LoginResponse> => {
  const response = await instance.post('/auth/login', payload);
  if (window) {
    setCookie("token", response.data.data.token);
    setCookie("user", JSON.stringify(response.data.data.user));
  } 
  return response.data.data
}

const Register = async (payload: {
  email: string
  password: string
  fullname: string
  username: string
}) : Promise<LoginResponse> => {
  const response = await instance.post('/auth/register', payload);
  if (window) {
    setCookie("token", response.data.data.token);
    setCookie("user", JSON.stringify(response.data.data.user));
  } 
  return response.data.data
}


const Logout = () => {
  if (window) {
    deleteCookie("token")
  }
}

export default {
  Register,
  Login,
  Logout
}