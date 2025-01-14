import kundanKarigarApi from '@/services/api/PurchaseReceipt/get-kundan-karigar-list-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getKunKarigarNameData: any = createAsyncThunk(
  'getKunKarigarName/kunKarigarName',
  async (params: any) => {
    const KunKarigarName: any = await kundanKarigarApi(params);
    return KunKarigarName;
  }
);
interface RepoKunKarigarNameState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoKunKarigarNameState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetKunKarigarNameScreen = createSlice({
  name: 'kunKarigarName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKunKarigarNameData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getKunKarigarNameData.fulfilled, (state, action) => {
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
    builder.addCase(getKunKarigarNameData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_kun_karigar_name_data = (state: RootState) =>
  state.GetKunKarigarNameScreen;

export default GetKunKarigarNameScreen.reducer;
