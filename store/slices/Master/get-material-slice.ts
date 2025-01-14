import materialApi from '@/services/api/PurchaseReceipt/get-material-list-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMaterialData: any = createAsyncThunk(
  'getMaterial/material',
  async (params: any) => {
    const Material: any = await materialApi(params);
    return Material;
  }
);
interface RepoMaterialState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoMaterialState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetMaterialScreen = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaterialData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getMaterialData.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;
        state.isLoading = 'succeeded';
      } else {
        state.data = '';
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(getMaterialData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_material_data = (state: RootState) =>
  state.GetMaterialScreen;

export default GetMaterialScreen.reducer;
