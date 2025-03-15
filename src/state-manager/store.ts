import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import cityReducer from "./citySlice";
// import cityApi from "./cityApiSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    city: cityReducer,
    // [cityApi.reducerPath]: cityApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(cityApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
