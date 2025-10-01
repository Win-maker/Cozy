import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./features/Card/cardSlice";
import orderSlice from "./features/Order/orderSlice"; 


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  cart: cartSlice,
  order: orderSlice,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
