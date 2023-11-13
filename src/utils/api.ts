import { UnknownError, ValidationError } from '../consts/index';
import { ApiCallErr } from '../types/index';

export const apiCall = async <T>(request: Promise<T>) => {
  try {
    return await request;
  } catch (error) {
    if ((error as ApiCallErr).response) {
      if ((error as ApiCallErr).response.status === 422) {
        throw { type: ValidationError, data: (error as ApiCallErr).response.data.result, code: (error as ApiCallErr).response.status };
      }
      throw { type: UnknownError, data: (error as ApiCallErr).response.data, code: (error as ApiCallErr).response.status };
    }
    throw { type: UnknownError, data: (error as ApiCallErr).message, code: error };
  }
};
