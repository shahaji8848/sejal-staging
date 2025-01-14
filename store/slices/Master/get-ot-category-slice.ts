import getOtCategoryApi from '@/services/api/Master/get-ot-category-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getOtCategoryData: any = createAsyncThunk(
  'getOtCategory/otCategory',
  async (params: any) => {
    const otCategory: any = await getOtCategoryApi(params);
    return otCategory;
  }
);
interface RepoOtCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoOtCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetOtCategoryScreen = createSlice({
  name: 'otCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOtCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getOtCategoryData.fulfilled, (state, action) => {
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
    builder.addCase(getOtCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_ot_category_data = (state: RootState) =>
  state.GetOtCategoryScreen;

export default GetOtCategoryScreen.reducer;
