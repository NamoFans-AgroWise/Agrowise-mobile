import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Alert } from '../types';

interface AlertsState {
  alerts: Alert[];
  unreadCount: number;
}

const initialState: AlertsState = {
  alerts: [
    {
      id: '1',
      type: 'irrigation',
      severity: 'warning',
      title: 'Irrigation Needed',
      message: 'North Field soil moisture is at 28%. Recommended irrigation: 15-20 liters per plant.',
      timestamp: new Date().toISOString(),
      isRead: false,
      fieldId: '1',
    },
    {
      id: '2',
      type: 'disease',
      severity: 'critical',
      title: 'Yellow Rust Detected',
      message: 'Early signs of yellow rust detected in wheat crop. Immediate action recommended.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: false,
      fieldId: '1',
    },
    {
      id: '3',
      type: 'weather',
      severity: 'info',
      title: 'Rain Expected',
      message: 'Light rain expected tomorrow. Consider postponing irrigation.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      isRead: true,
    },
    {
      id: '4',
      type: 'advisory',
      severity: 'warning',
      title: 'Fertilizer Reminder',
      message: 'Time for second dose of nitrogen fertilizer for optimal crop growth.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
      fieldId: '1',
    },
  ],
  unreadCount: 2,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount++;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert && !alert.isRead) {
        alert.isRead = true;
        state.unreadCount--;
      }
    },
    markAllAsRead: (state) => {
      state.alerts.forEach((alert) => {
        alert.isRead = true;
      });
      state.unreadCount = 0;
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert && !alert.isRead) {
        state.unreadCount--;
      }
      state.alerts = state.alerts.filter((a) => a.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
      state.unreadCount = 0;
    },
  },
});

export const { addAlert, markAsRead, markAllAsRead, removeAlert, clearAlerts } =
  alertsSlice.actions;
export default alertsSlice.reducer;
