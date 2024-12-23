import {
  KEY_STORAGE,
  removeDataFromLocalStorage,
  saveDataToLocalStorage
} from '../../../src/local/config';
import { apiLogin } from '../../../src/api/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: any;
  token: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
};

const initialState: AuthState = {
  user: null,
  token: '',
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export const login = createAsyncThunk(
  'auth/login',
  async (args: { email: string; password: string }) => {
    const dataRes = await apiLogin(args);

    if (dataRes.status === 200) return dataRes.data;
    else return dataRes;
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      saveDataToLocalStorage(KEY_STORAGE.USER, action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      removeDataFromLocalStorage(KEY_STORAGE.USER);
      removeDataFromLocalStorage(KEY_STORAGE.TOKEN);
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
        state.user = action.payload;
        state.token = action.payload.token;
        saveDataToLocalStorage(KEY_STORAGE.USER, action.payload);
        saveDataToLocalStorage(KEY_STORAGE.TOKEN, action.payload.token);
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.data;
      })
});

const authReducer = AuthSlice.reducer;
export const { setToken, setDataUser, logout } = AuthSlice.actions;
export default authReducer;
