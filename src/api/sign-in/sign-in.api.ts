/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { SignInResp, SignInUpBody, SignUpResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const signIn = (data: SignInUpBody): Promise<SignInResp> => {
  return apiCall<SignInResp>(axios.post('http://localhost:8000/api/auth/login', data));
};

const signUp = (data: SignInUpBody): Promise<SignUpResp> => {
  return apiCall<SignUpResp>(axios.post('http://localhost:8000/api/auth/register', data));
};

export default {
  signIn,
  signUp,
};