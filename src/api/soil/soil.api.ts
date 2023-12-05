/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllSoilResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllSoils = (): Promise<GetAllSoilResp> => {
  return apiCall<GetAllSoilResp>(axios.get('http://localhost:8000/api/related/soil'));
};

export default {
  getAllSoils,
};