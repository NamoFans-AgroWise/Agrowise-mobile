import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Field, Crop } from '../types';

interface FieldsState {
  fields: Field[];
  selectedFieldId: string | null;
  isLoading: boolean;
}

const initialState: FieldsState = {
  fields: [
    {
      id: '1',
      name: 'North Field',
      crop: {
        id: 'wheat',
        name: 'Wheat',
        nameHindi: 'गेहूँ',
        variety: 'HD-2967',
        sowingDate: '2025-11-15',
        expectedHarvestDate: '2026-04-15',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
      },
      area: 5,
      soilType: 'Black Cotton',
      devices: ['1', '3'],
    },
    {
      id: '2',
      name: 'South Field',
      crop: {
        id: 'paddy',
        name: 'Paddy',
        nameHindi: 'धान',
        variety: 'Basmati',
        sowingDate: '2025-06-20',
        imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400',
      },
      area: 3,
      soilType: 'Alluvial',
      devices: [],
    },
  ],
  selectedFieldId: '1',
  isLoading: false,
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<Field>) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<{ id: string; updates: Partial<Field> }>) => {
      const index = state.fields.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = { ...state.fields[index], ...action.payload.updates };
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    selectField: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },
    setCrop: (state, action: PayloadAction<{ fieldId: string; crop: Crop }>) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field) {
        field.crop = action.payload.crop;
      }
    },
    addDeviceToField: (state, action: PayloadAction<{ fieldId: string; deviceId: string }>) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field && !field.devices.includes(action.payload.deviceId)) {
        field.devices.push(action.payload.deviceId);
      }
    },
  },
});

export const { addField, updateField, removeField, selectField, setCrop, addDeviceToField } =
  fieldsSlice.actions;
export default fieldsSlice.reducer;
