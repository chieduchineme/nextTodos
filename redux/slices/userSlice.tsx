// redux/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '@/types/userTypes';

interface UserState {
  user: userType | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
