import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { ErrorObj, ErrorType, Service, ServiceStateInitial, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllServicesThunk = createAsyncThunk(
  'serviceState/getAllServicesThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllServices();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: ServiceStateInitial = {
  services: [],
  status: '',
  errors: [],
}

const serviceSlice = createSlice({
  name: 'serviceState',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllServicesThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllServicesThunk.fulfilled.toString()]: (state, action: PayloadAction<Service[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.services = action.payload;
    },
    [getAllServicesThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.services = initialState.services;
    },
  }
});

export default serviceSlice.reducer;
