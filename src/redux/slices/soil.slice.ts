import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { ErrorObj, ErrorType, SliceStateStatus, Soil, SoilsStateInitial } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllSoilsThunk = createAsyncThunk(
  'soilsState/getAllSoilsThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllSoils();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: SoilsStateInitial = {
  soils: [],
  status: '',
  errors: [],
}

const serviceSlice = createSlice({
  name: 'soilsState',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllSoilsThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllSoilsThunk.fulfilled.toString()]: (state, action: PayloadAction<Soil[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.soils = action.payload;
    },
    [getAllSoilsThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.soils = initialState.soils;
    },
  }
});

export default serviceSlice.reducer;
