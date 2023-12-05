import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { ErrorObj, ErrorType, Pot, PotStateInitial, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllPotsThunk = createAsyncThunk(
  'potState/getAllPotsThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllPots();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: PotStateInitial = {
  pots: [],
  status: '',
  errors: [],
}

const potSlice = createSlice({
  name: 'potState',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPotsThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllPotsThunk.fulfilled.toString()]: (state, action: PayloadAction<Pot[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.pots = action.payload;
    },
    [getAllPotsThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.pots = initialState.pots;
    },
  }
});

export default potSlice.reducer;
