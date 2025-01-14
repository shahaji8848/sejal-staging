import getKunCategoryApi from '@/services/api/Master/get-kun-category-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getKunCategoryData: any = createAsyncThunk(
  'getKunCategory/KunCategory',
  async (params: any) => {
    const KunCategory: any = await getKunCategoryApi(params);
    return KunCategory;
  }
);
interface RepoKunCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoKunCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetKunCategoryScreen = createSlice({
  name: 'KunCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKunCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getKunCategoryData.fulfilled, (state, action) => {
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
    builder.addCase(getKunCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_kun_category_data = (state: RootState) =>
  state.GetKunCategoryScreen;

export default GetKunCategoryScreen.reducer;
