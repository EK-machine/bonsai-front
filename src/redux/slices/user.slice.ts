import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { ErrorType, LoginBody, SliceStateStatus, UserStateInitial } from '../../types/index';

export const logInThunk = createAsyncThunk(
  'userState/logInThunk',
  async function (loginBody: LoginBody) {
    try {
      console.log('loginBody', loginBody);
      const resp = await Api.signIn(loginBody);
      console.log('resp', resp);
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        console.log(data.message)
      }
    }    
  }
);

const initialState: UserStateInitial = {
  access_token: '',
  status: '',
  error: [],
}

const modalSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
  extraReducers: {
    [logInThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.error = [''];
    },
    [logInThunk.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      state.status = SliceStateStatus.Fulfilled;
      state.error = [''];
      state.access_token = action.payload;
    },
    [logInThunk.rejected.toString()]: (state, action) => {}
  }
});

export const { logIn } = modalSlice.actions;

export default modalSlice.reducer;
