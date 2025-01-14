import getCsCategoryApi from '@/services/api/Master/get-cs-category-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCsCategoryData: any = createAsyncThunk(
  'getCsCategory/CsCategory',
  async (params: any) => {
    const csCategory: any = await getCsCategoryApi(params);
    return csCategory;
  }
);
interface RepoCsCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoCsCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetCsCategoryScreen = createSlice({
  name: 'CsCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCsCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getCsCategoryData.fulfilled, (state, action) => {
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
    builder.addCase(getCsCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_cs_category_data = (state: RootState) =>
  state.GetCsCategoryScreen;

export default GetCsCategoryScreen.reducer;
