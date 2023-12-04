import { PayloadAction } from '@reduxjs/toolkit';
import { ErrorObj } from '../types/redux.types';

export const setCommonErrors = (action: PayloadAction<ErrorObj[]>) => {
  const isArr = Array.isArray(action.payload);
  if (!isArr && typeof action.payload === 'string') {
    return [{property: 'common', message: action.payload}]
  }
  return action.payload;
}