import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { workspaceSlice ,boardsSlice, cardSlice, subCardSlice } from './slices';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  workspaces: workspaceSlice.reducer,
  boards: boardsSlice.reducer,
  cards: cardSlice.reducer,
  subCards: subCardSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    app: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;