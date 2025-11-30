// store/slices/alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Alert {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'message';
  title: string;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AlertState {
  alerts: Alert[];
  isVisible: boolean;
  currentAlert: Alert | null;
}

const initialState: AlertState = {
  alerts: [],
  isVisible: false,
  currentAlert: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<Alert, 'id'>>) => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        duration: 5000,
        position: 'top',
        ...action.payload,
      };
      
      state.alerts.push(newAlert);
      state.currentAlert = newAlert;
      state.isVisible = true;
    },
    showChatAlert: (state, action: PayloadAction<{
      title: string;
      message: string;
      type?: Alert['type'];
      action?: Alert['action'];
    }>) => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: 'message',
        duration: 6000,
        position: 'top',
        ...action.payload,
      };
      
      state.alerts.push(newAlert);
      state.currentAlert = newAlert;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.currentAlert = null;
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      if (state.currentAlert?.id === action.payload) {
        state.currentAlert = state.alerts[0] || null;
        state.isVisible = !!state.currentAlert;
      }
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
      state.isVisible = false;
      state.currentAlert = null;
    },
  },
});

export const {
  showAlert,
  showChatAlert,
  hideAlert,
  removeAlert,
  clearAllAlerts,
} = alertSlice.actions;

export default alertSlice.reducer;