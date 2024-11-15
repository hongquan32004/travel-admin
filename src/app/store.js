import {
  configureStore
} from '@reduxjs/toolkit'
import permissionsReducer from "../slice/permissionSlice";

export default configureStore({
  reducer: {
    permissions: permissionsReducer,
  }
})