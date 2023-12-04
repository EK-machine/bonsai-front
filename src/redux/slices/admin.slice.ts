import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { AdminStateInitial, ErrorObj, ErrorType, RootState, SignInUpBody, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const signUpThunk = createAsyncThunk(
  'adminState/signUpThunk',
  async function (signUpBody: SignInUpBody, {rejectWithValue}) {
    try {
      const resp = await Api.signUp(signUpBody);
      return resp.data.message;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

export const signInThunk = createAsyncThunk(
  'adminState/signInThunk',
  async function (signInBody: SignInUpBody, {rejectWithValue}) {
    try {
      const resp = await Api.signIn(signInBody);
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

export const logoutThunk = createAsyncThunk( 
  'adminState/logoutThunk',
  async function (_, {getState, rejectWithValue}) {
    try {
      const { admin: { accessToken } } = getState() as RootState;
      const resp = await Api.logOut(accessToken);
      if (resp.status !== 200 && resp.statusText !== 'OK') {
        throw new Error();
      }
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

export const refreshThunk = createAsyncThunk(
  'adminState/refreshThunk',
  async function (timeToRefresh: number, {rejectWithValue}) {
    try {
      const resp = await Api.refresh();
      return {at: resp.data, timeToRefresh};
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: AdminStateInitial = {
  status: '',
  errors: [],
  loggedIn: false,
  refreshBaseTime: 0,
  accessToken: '',
  registerMessage: '',
}

const adminSlice = createSlice({
  name: 'adminState',
  initialState,
  reducers: {
    nullRegisterMessage: (state) => {
      state.registerMessage = initialState.registerMessage;
    },
    clearAdminErrors: (state) => {
      state.errors = initialState.errors;
    },
  },
  extraReducers: {
    [signInThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [signInThunk.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.errors = [];
      state.loggedIn = true;
      state.accessToken = action.payload;
      state.refreshBaseTime = new Date().getTime();
      state.status = SliceStateStatus.Fulfilled;
    },
    [signInThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.accessToken = initialState.accessToken;
    },
    [signUpThunk.pending.toString()]: (state) => {
      state.errors = [];
      state.status = SliceStateStatus.Loading;
    },
    [signUpThunk.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.errors = [];
      state.registerMessage = action.payload;
      state.status = SliceStateStatus.Fulfilled;
    },
    [signUpThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.registerMessage = initialState.registerMessage;
    },
    [logoutThunk.pending.toString()]: (state) => {
      state.errors = [];
      state.status = SliceStateStatus.Loading;
    },
    [logoutThunk.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.status = initialState.status;
      state.errors = initialState.errors;
      state.loggedIn = initialState.loggedIn;
      state.accessToken = initialState.accessToken;
      state.refreshBaseTime = initialState.refreshBaseTime;
      state.registerMessage = initialState.registerMessage;
    },
    [logoutThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
    },
    [refreshThunk.pending.toString()]: (state) => {
      state.errors = [];
      state.status = SliceStateStatus.Loading;
    },
    [refreshThunk.fulfilled.toString()]: (state, action: PayloadAction<{ at: string; timeToRefresh: number}>) => {
      state.accessToken = action.payload.at;
      state.refreshBaseTime += action.payload.timeToRefresh;
      state.status = SliceStateStatus.Fulfilled;
    },
    [refreshThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
    },
  }
});

export const { nullRegisterMessage, clearAdminErrors } = adminSlice.actions;

export default adminSlice.reducer;
