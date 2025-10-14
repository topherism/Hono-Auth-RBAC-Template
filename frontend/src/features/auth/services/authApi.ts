import axios from '../../../config/axios';
import {type LoginFormValues } from '../components/LoginForm';

interface LoginResponse {
  user: { id: string; email: string; role: string };
  token: string;
}

export const loginApi = async (data: LoginFormValues): Promise<LoginResponse> => {
  const response = await axios.post('/auth/login', data);
  return response.data;
};
