/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllPotResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllPots = (): Promise<GetAllPotResp> => {
  return apiCall<GetAllPotResp>(axios.get('http://localhost:8000/api/related/pot'));
};

export default {
  getAllPots,
};