import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productSize: string;
  productImage: string;
  productDescription: string;
  quantity: number;
}

interface CartState {
  selectedItems: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  selectedItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<CartState>) {
      state.selectedItems = action.payload.selectedItems;
      state.totalPrice = action.payload.totalPrice;
    },
    clearCartData(state) {
      state.selectedItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { setCartData, clearCartData } = cartSlice.actions;

export default cartSlice.reducer;
