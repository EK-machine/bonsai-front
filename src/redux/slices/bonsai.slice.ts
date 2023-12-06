import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import {
  Bonsai,
  BonsaiStateInitial,
  CreateBonsaiBody,
  ErrorObj,
  ErrorType,
  RootState,
  SliceStateStatus,
} from '../../types/index';
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

export const createBonsaisThunk = createAsyncThunk(
  'bonsaiState/createBonsaisThunk',
  async function (createBonsaiBody: CreateBonsaiBody, {getState, rejectWithValue}) {
    try {
      const { admin: { accessToken } } = getState() as RootState;
      const resp = await Api.createBonsai(accessToken, createBonsaiBody);
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
    [createBonsaisThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [createBonsaisThunk.fulfilled.toString()]: (state, action: PayloadAction<Bonsai>) => {
      const oldBonsais = state.bonsais;
      oldBonsais.push(action.payload);
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.bonsais = oldBonsais;
    },
    [createBonsaisThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
    },
  }
});

export const { setEditBonsai, removeEditBonsai } = bonsaiSlice.actions;

export default bonsaiSlice.reducer;
