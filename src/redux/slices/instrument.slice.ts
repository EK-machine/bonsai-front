import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { ErrorObj, ErrorType, Instrument, InstrumentStateInitial, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllInstrumentsThunk = createAsyncThunk(
  'instrumentState/getAllInstrumentsThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllInstrument();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: InstrumentStateInitial = {
  instruments: [],
  status: '',
  errors: [],
}

const instrumentSlice = createSlice({
  name: 'instrumentState',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllInstrumentsThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllInstrumentsThunk.fulfilled.toString()]: (state, action: PayloadAction<Instrument[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.instruments = action.payload;
    },
    [getAllInstrumentsThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.instruments = initialState.instruments;
    },
  }
});

export default instrumentSlice.reducer;
