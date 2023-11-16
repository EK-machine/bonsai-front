/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { LoginBody, LoginResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const signIn = (data: LoginBody): Promise<LoginResp> => {
  return apiCall<LoginResp>(axios.post('http://localhost:8000/api/auth/login', data));
};

export default {
  signIn,
};