// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { fetchUsersApi } from "../../api/usersApi";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Async thunk for GET
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetchUsersApi();
  return res.data; // array of users[web:2][web:8]
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(user) {
        return {
          payload: {
            ...user,
            id: nanoid(), // local ID for new rows
          },
        };
      },
    },
    userUpdated(state, action) {
      const { id, changes } = action.payload;
      const index = state.list.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...changes };
      }
    },
    userDeleted(state, action) {
      const id = action.payload;
      state.list = state.list.filter((u) => u.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;
export default usersSlice.reducer;
