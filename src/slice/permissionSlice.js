import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      state.list = action.payload;
    },
    clearPermissions: (state) => {
      state.list = [];
    },
  },
});

export const {
  setPermissions,
  clearPermissions
} = permissionsSlice.actions;

export default permissionsSlice.reducer;