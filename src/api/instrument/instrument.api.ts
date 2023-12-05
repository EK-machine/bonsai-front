/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllInstrumentResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllInstrument = (): Promise<GetAllInstrumentResp> => {
  return apiCall<GetAllInstrumentResp>(axios.get('http://localhost:8000/api/related/instrument'));
};

export default {
  getAllInstrument,
};