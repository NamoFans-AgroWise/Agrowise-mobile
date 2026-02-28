import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Device } from '../types';

interface DevicesState {
  devices: Device[];
  selectedDeviceId: string | null;
  isLoading: boolean;
  isPairing: boolean;
}

const initialState: DevicesState = {
  devices: [
    {
      id: '1',
      name: 'Soil Sensor A1',
      type: 'soil_sensor',
      status: 'online',
      batteryLevel: 85,
      lastSync: new Date().toISOString(),
      fieldId: '1',
    },
    {
      id: '2',
      name: 'Weather Station',
      type: 'weather_station',
      status: 'online',
      batteryLevel: 92,
      lastSync: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Irrigation Controller',
      type: 'irrigation_controller',
      status: 'online',
      batteryLevel: 78,
      lastSync: new Date().toISOString(),
      fieldId: '1',
    },
  ],
  selectedDeviceId: null,
  isLoading: false,
  isPairing: false,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<{ id: string; updates: Partial<Device> }>) => {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = { ...state.devices[index], ...action.payload.updates };
      }
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
    },
    selectDevice: (state, action: PayloadAction<string | null>) => {
      state.selectedDeviceId = action.payload;
    },
    setIsPairing: (state, action: PayloadAction<boolean>) => {
      state.isPairing = action.payload;
    },
  },
});

export const { addDevice, updateDevice, removeDevice, selectDevice, setIsPairing } =
  devicesSlice.actions;
export default devicesSlice.reducer;
