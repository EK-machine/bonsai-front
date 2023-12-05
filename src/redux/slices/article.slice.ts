import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../api/index';
import { Article, ArticleStateInitial, ErrorObj, ErrorType, SliceStateStatus } from '../../types/index';
import { setCommonErrors } from '../../utils/index';

export const getAllArticlesThunk = createAsyncThunk(
  'articleState/getAllArticlesThunk',
  async function (_, {rejectWithValue}) {
    try {
      const resp = await Api.getAllArticles();
      return resp.data;
    } catch (err) {
      const {data} = err as ErrorType;
      if (data && data.message) {
        return rejectWithValue(data.message);
      }
    }    
  }
);

const initialState: ArticleStateInitial = {
  articles: [],
  status: '',
  errors: [],
}

const articleSlice = createSlice({
  name: 'articleState',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllArticlesThunk.pending.toString()]: (state) => {
      state.status = SliceStateStatus.Loading;
      state.errors = [];
    },
    [getAllArticlesThunk.fulfilled.toString()]: (state, action: PayloadAction<Article[]>) => {
      state.errors = [];
      state.status = SliceStateStatus.Fulfilled;
      state.articles = action.payload;
    },
    [getAllArticlesThunk.rejected.toString()]: (state, action: PayloadAction<ErrorObj[]>) => {
      state.errors = setCommonErrors(action);
      state.status = SliceStateStatus.Rejected;
      state.articles = initialState.articles;
    },
  }
});

export default articleSlice.reducer;
