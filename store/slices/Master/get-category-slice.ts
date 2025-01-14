import getCategoryApi from '@/services/api/Master/get-category-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCategoryData: any = createAsyncThunk(
  'getCategory/category',
  async (params: any) => {
    const Category: any = await getCategoryApi(params);
    return Category;
  }
);
interface RepoCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetCategoryScreen = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      if (
        action?.payload?.status === 200 &&
        action?.payload?.data?.message?.status === 'success'
      ) {
        state.data = action?.payload?.data?.message?.data;
        state.isLoading = 'succeeded';
      } else {
        state.data = '';
        // state.docStatus = '';
        state.isLoading = 'succeeded';
      }
    });
    builder.addCase(getCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_category_data = (state: RootState) =>
  state.GetCategoryScreen;

export default GetCategoryScreen.reducer;
