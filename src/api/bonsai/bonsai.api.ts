/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllBonsaiResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllBonsai = (): Promise<GetAllBonsaiResp> => {
  return apiCall<GetAllBonsaiResp>(axios.get('http://localhost:8000/api/bonsai'));
};

export default {
  getAllBonsai,
};