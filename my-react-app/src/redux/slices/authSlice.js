import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosAuth from "../../utils/axiosConfig";
import axios from "axios";

const currentuser = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: currentuser ? currentuser : null,
  isAuthenticated: currentuser ? true : false,
  loading: false,
};

export const localLogin = createAsyncThunk(
  "user/localLogin",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/local",
        data,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error.response });
    }
  }
);
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/google",
        { token: data.access_token },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error.response });
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosAuth.post(
        "http://localhost:3001/api/auth/logout"
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/signup`,
        data,
        { timeout: 5000 }
      );
      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error.response });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(localLogin.pending, state => {
        state.loading = true;
      })
      .addCase(localLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(localLogin.rejected, state => {
        state.loading = false;
      })
      .addCase(googleLogin.pending, state => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, state => {
        state.loading = false;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
      })
      .addCase(logout.rejected, state => {
        state.loading = false;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, state => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signup.rejected, state => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
