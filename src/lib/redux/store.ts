import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import sessionReducer from './session/slice';
import userReducer from './user/slice';
import messageReducer from './message/slice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer,
    message: messageReducer
  },
  middleware: [thunk]
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
