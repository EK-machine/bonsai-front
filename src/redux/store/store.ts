import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from '../slices/admin.slice';
import articleReducer from '../slices/article.slice';
import bonsaiReducer from '../slices/bonsai.slice';
import instrumentReducer from '../slices/instrument.slice';
import modalReducer from '../slices/modal.slice';
import potReducer from '../slices/pot.slice';
import serviceReducer from '../slices/service.slice';
import soilReducer from '../slices/soil.slice';

export const rootReducer = combineReducers({
  admin: adminReducer,
  articles: articleReducer,
  bonsais: bonsaiReducer,
  instruments: instrumentReducer,
  modal: modalReducer,
  pots: potReducer,
  services: serviceReducer,
  soils: soilReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export const persistor = persistStore(store);

export default store;

export type RootReducerState = ReturnType<typeof rootReducer>

export type ApplicationDispatch = typeof store.dispatch;