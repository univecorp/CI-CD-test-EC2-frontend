import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { AxiosError } from "axios";
// Async actions
// Register user
export const registers = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error?.response?.data?.message;
    console.log("error while login", error);

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  role: user?.role ? user?.role : "",
  isLoading: true,
  isError: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.role = action.payload.user?.role;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = "";
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(registers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(registers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role;
        state.isError = false;
        state.error = "";
      })
      .addCase(registers.rejected, (state, action) => {
        state.isLoading = false;
        state.user = "";
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.role = "";
        state.isLoading = true;
      });
  },
});

export default authSlice.reducer;
