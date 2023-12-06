/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { CreateBonsaiBody, CreateBonsaiResp, GetAllBonsaiResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllBonsai = (): Promise<GetAllBonsaiResp> => {
  return apiCall<GetAllBonsaiResp>(axios.get('http://localhost:8000/api/bonsai'));
};

const createBonsai = (token: string, createBonsaiBody: CreateBonsaiBody): Promise<CreateBonsaiResp> => {
  const config = {
    headers: {'Authorization': `Bearer ${token}`},
    withCredentials: true
  };
  return apiCall<CreateBonsaiResp>(axios.post('http://localhost:8000/api/bonsai/create', createBonsaiBody, config));
};

export default {
  getAllBonsai,
  createBonsai,
};


