import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import queriesReducer from "../features/home/queriesSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    queries: queriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
