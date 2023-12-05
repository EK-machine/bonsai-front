/* eslint-disable import/no-anonymous-default-export */
import { default as axios } from 'axios';
import { GetAllArticleResp } from '../../types/index';
import { apiCall } from '../../utils/index';

const getAllArticles = (): Promise<GetAllArticleResp> => {
  return apiCall<GetAllArticleResp>(axios.get('http://localhost:8000/api/article'));
};

export default {
  getAllArticles,
};