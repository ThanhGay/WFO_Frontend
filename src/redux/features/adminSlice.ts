import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGetAllUsers } from '../../api/user';
import {
  apiAdminConfirmOrder,
  apiCancelOrder,
  apiDoneOrder,
  apiGetAllOrders,
  apiTransferOrderToCarrier
} from '../../api/order';

type REF_STATE = {
  data: any;
  isLoading: boolean;
  isError: boolean;
};

type AdminState = {
  listCustomer: REF_STATE;
  listOrder: REF_STATE;
};

const initialState: AdminState = {
  listCustomer: {
    data: [],
    isError: false,
    isLoading: false
  },
  listOrder: {
    data: [],
    isError: false,
    isLoading: false
  }
};

export const getListCustomer = createAsyncThunk('admin/customer', async () => {
  const dataRes = await apiGetAllUsers();

  return dataRes ? dataRes : [];
});

export const getListOrder = createAsyncThunk(
  'admin/order',
  async (token: string) => {
    const dataRes = await apiGetAllOrders(token);

    return dataRes ? dataRes : [];
  }
);

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    deleteCustomer: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
    confirmOrder: (state, action: PayloadAction<any>) => {
      const orderId = action.payload;

      const updatedOrders = [...state.listOrder.data]; // Tạo một bản sao để không thay đổi mảng gốc
      const orderIndex = updatedOrders.findIndex(
        (order) => order.id === orderId
      );
      if (orderIndex !== -1) {
        updatedOrders[orderIndex].status = 1;
        updatedOrders[orderIndex].updatedDate = new Date();

        state.listOrder.data = updatedOrders;
      }
    },
    deliveryOrder: (state, action: PayloadAction<any>) => {
      const orderId = action.payload;
      const updatedOrders = [...state.listOrder.data];
      const orderIndex = updatedOrders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex !== -1) {
        updatedOrders[orderIndex].status = 2;
        updatedOrders[orderIndex].updatedDate = new Date();

        state.listOrder.data = updatedOrders;
      }
    },
    haveDoneOrder: (state, action: PayloadAction<any>) => {
      const orderId = action.payload;
      const updatedOrders = [...state.listOrder.data];
      const orderIndex = updatedOrders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex !== -1) {
        updatedOrders[orderIndex].status = 5;

        state.listOrder.data = updatedOrders;
      }
    },
    cancelOrder: (state, action: PayloadAction<any>) => {
      const orderId = action.payload;
      const updatedOrders = [...state.listOrder.data];
      const orderIndex = updatedOrders.findIndex(
        (order) => order.id === orderId
      );

      if (orderIndex !== -1) {
        updatedOrders[orderIndex].status = 10;
        updatedOrders[orderIndex].updatedDate = new Date();

        state.listOrder.data = updatedOrders;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListCustomer.pending, (state) => {
        state.listCustomer.isLoading = true;
        state.listCustomer.isError = false;
      })
      .addCase(
        getListCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.listCustomer.data = action.payload;
          state.listCustomer.isLoading = false;
          state.listCustomer.isError = false;
        }
      )
      .addCase(getListCustomer.rejected, (state) => {
        state.listOrder.isLoading = false;
        state.listOrder.isError = true;
      })
      .addCase(getListOrder.pending, (state) => {
        state.listOrder.isLoading = true;
        state.listOrder.isError = false;
      })
      .addCase(getListOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.listOrder.data = action.payload;
        state.listOrder.isLoading = false;
        state.listOrder.isError = false;
      })
      .addCase(getListOrder.rejected, (state) => {
        state.listOrder.isLoading = false;
        state.listOrder.isError = true;
      });
  }
});

const adminReducer = AdminSlice.reducer;

export const {
  deleteCustomer,
  confirmOrder,
  deliveryOrder,
  cancelOrder,
  haveDoneOrder
} = AdminSlice.actions;

export default adminReducer;
