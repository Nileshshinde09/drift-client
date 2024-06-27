// socketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { VITE_SERVER_SOCKET_HOST_URL } from '@/constants';
import Cookies from 'js-cookie';

export const connectSocket = createAsyncThunk(
  'socket/connect',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('accessToken');
      const socket = io(VITE_SERVER_SOCKET_HOST_URL, {
        auth: {
          token: token,
        },
      });
      return socket;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const disconnectSocket = createAsyncThunk(
  'socket/disconnect',
  async (socket, { rejectWithValue }) => {
    try {
      if (socket) {
        socket.disconnect();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
    connected: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
        state.connected = true;
        state.error = null;
      })
      .addCase(connectSocket.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(disconnectSocket.fulfilled, (state) => {
        state.socket = null;
        state.connected = false;
        state.error = null;
      })
      .addCase(disconnectSocket.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default socketSlice.reducer;
