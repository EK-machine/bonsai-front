import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { Bonsai, BonsaiStateInitial, ErrorObj, ErrorType, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllBonsaisThunk = createAsyncThunk(
  'bonsaiState/getAllBonsaisThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllBonsai();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: BonsaiStateInitial = {
  bonsais: [],
  bonsaiEdit: {} as Bonsai,
  status: '',
  errors: [],
}

const bonsaiSlice = createSlice({
  name: 'bonsaiState',
  initialState,
  reducers: {
    setEditBonsai: (state, action: PayloadAction<Bonsai>) => {
      state.bonsaiEdit = action.payload;
    },
    removeEditBonsai: (state) => {
      state.bonsaiEdit = initialState.bonsaiEdit;
    },
  },
  extraReducers: {
    [getAllBonsaisThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllBonsaisThunk.fulfilled.toString()]: (state, action: PayloadAction<Bonsai[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.bonsais = action.payload;
    },
    [getAllBonsaisThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.bonsais = initialState.bonsais;
    },
  }
});

export const { setEditBonsai, removeEditBonsai } = bonsaiSlice.actions;

export default bonsaiSlice.reducer;
