import getBBCategoryApi from '@/services/api/Master/get-bbCategory-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getBBCategoryData: any = createAsyncThunk(
  'getBBCategory/bbCategory',
  async (params: any) => {
    const BBCategory: any = await getBBCategoryApi(params);
    return BBCategory;
  }
);
interface RepoBBCategoryState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoBBCategoryState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetBBCategoryScreen = createSlice({
  name: 'bbCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBBCategoryData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getBBCategoryData.fulfilled, (state, action) => {
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
    builder.addCase(getBBCategoryData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_bb_category_data = (state: RootState) =>
  state.GetBBCategoryScreen;

export default GetBBCategoryScreen.reducer;
