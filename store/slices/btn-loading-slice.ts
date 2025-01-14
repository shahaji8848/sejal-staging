import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

interface ButtonState {
  isButtonDisabled: boolean;
  loading: boolean;
}

const initialState: ButtonState = {
  isButtonDisabled: false,
  loading: false,
};

export const buttonLoadingSlice = createSlice({
  name: 'buttonLoading',
  initialState,
  reducers: {
    btnLoadingStart: (state) => {
      state.loading = true;
    },
    btnLoadingStop: (state) => {
      state.loading = false;
    },
  },
});

export const { btnLoadingStart, btnLoadingStop }: any =
  buttonLoadingSlice.actions;

export const buttonLoadingState = (state: RootState) =>
  state.buttonLoadingScreen;

export default buttonLoadingSlice.reducer;
