import getSubCategoryApi from '@/services/api/Master/get-sub-category-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSubCategoryData: any = createAsyncThunk(
  'getSubCategory/subCategory',
  async (params: any) => {
    const SubCategory: any = await getSubCategoryApi(params);
    return SubCategory;
  }
);
interface RepoSubCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoSubCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetSubCategoryScreen = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getSubCategoryData.fulfilled, (state, action) => {
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
    builder.addCase(getSubCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_sub_category_data = (state: RootState) =>
  state.GetSubCategoryScreen;

export default GetSubCategoryScreen.reducer;
