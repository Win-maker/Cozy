import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

const initialState: CartState = {
  items: [],
  shipping: 0,
  couponCode: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
decreaseQty: (state, action: PayloadAction<string>) => {
  const itemIndex = state.items.findIndex((i) => i.id === action.payload);
  if (itemIndex !== -1) {
    state.items[itemIndex].quantity -= 1;
    if (state.items[itemIndex].quantity <= 0) {
      state.items.splice(itemIndex, 1); 
    }
  }
},

    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
      // Example: 10% off coupon
      if (action.payload === "SAVE10") {
        state.items.forEach((item) => {
          item.discount = item.price * 0.1; 
        });
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.shipping = 0;
      state.couponCode = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  setShipping,
  applyCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

