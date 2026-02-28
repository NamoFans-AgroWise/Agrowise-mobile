import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isDarkMode: boolean;
  language: 'en' | 'hi';
  notificationsEnabled: boolean;
  voiceEnabled: boolean;
}

const initialState: SettingsState = {
  isDarkMode: false,
  language: 'en',
  notificationsEnabled: true,
  voiceEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'hi'>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleVoice: (state) => {
      state.voiceEnabled = !state.voiceEnabled;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLanguage, toggleNotifications, toggleVoice } =
  settingsSlice.actions;
export default settingsSlice.reducer;
