/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { RefreshResp, SignInResp, SignInUpBody, SignUpResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const signIn = (data: SignInUpBody): Promise<SignInResp> => {
  const config = {
    withCredentials: true
  };
  return apiCall<SignInResp>(axios.post('http://localhost:8000/api/auth/login', data, config));
};

const signUp = (data: SignInUpBody): Promise<SignUpResp> => {
  return apiCall<SignUpResp>(axios.post('http://localhost:8000/api/auth/register', data));
};

const logOut = (token: string) => {
  const config = {
    headers: {'Authorization': `Bearer ${token}`},
    withCredentials: true
  };
  return apiCall(axios.post('http://localhost:8000/api/auth/logout', {}, config));
}

const refresh = (): Promise<RefreshResp> => {
  const config = {
    withCredentials: true
  };
  return apiCall(axios.post('http://localhost:8000/api/auth/refresh', {}, config));
}

export default {
  signIn,
  signUp,
  logOut,
  refresh,
};