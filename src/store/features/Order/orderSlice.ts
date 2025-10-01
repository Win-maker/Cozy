import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  customerInfo: OrderFormValues | null;
}

const initialState: OrderState = {
  customerInfo: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderForm: (state, action: PayloadAction<OrderFormValues>) => {
      state.customerInfo = action.payload;
    },

    clearOrder: (state) => {
      state.customerInfo = null;
    },
  },
});

export const { setOrderForm, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
