/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllServiceResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllServices = (): Promise<GetAllServiceResp> => {
  return apiCall<GetAllServiceResp>(axios.get('http://localhost:8000/api/service'));
};

export default {
  getAllServices,
};