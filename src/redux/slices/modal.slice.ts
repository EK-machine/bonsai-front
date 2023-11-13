import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalState',
  initialState: {name: ''},
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    closeModal: (state) => {
      state.name = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
