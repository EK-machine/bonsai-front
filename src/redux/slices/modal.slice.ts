import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
}

const modalSlice = createSlice({
  name: 'modalState',
  initialState: initialState,
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
