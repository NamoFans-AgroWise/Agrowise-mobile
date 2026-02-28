import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Madhya Pradesh, India',
    preferredLanguage: 'en',
  },
  isAuthenticated: true,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setLanguage: (state, action: PayloadAction<'en' | 'hi'>) => {
      if (state.user) {
        state.user.preferredLanguage = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, setLanguage, logout } = authSlice.actions;
export default authSlice.reducer;
