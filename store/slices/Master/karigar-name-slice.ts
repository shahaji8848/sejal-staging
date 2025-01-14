import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getKarigarNameData: any = createAsyncThunk(
  'getKarigarName/karigarName',
  async (params: any) => {
    const KarigarName: any = await getKarigarApi(params);
    return KarigarName;
  }
);
interface RepoKarigarNameState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoKarigarNameState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetKarigarNameScreen = createSlice({
  name: 'karigarName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKarigarNameData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getKarigarNameData.fulfilled, (state, action) => {
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
    builder.addCase(getKarigarNameData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_karigar_name_data = (state: RootState) =>
  state.GetKarigarNameScreen;

export default GetKarigarNameScreen.reducer;
