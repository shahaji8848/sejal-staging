import getClientApi from '@/services/api/Master/get-client-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getClientNameData: any = createAsyncThunk(
  'getClientName/clientName',
  async (params: any) => {
    const ClientName: any = await getClientApi(params);
    return ClientName;
  }
);
interface RepoClientNameState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoClientNameState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetClientNameScreen = createSlice({
  name: 'clientName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientNameData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getClientNameData.fulfilled, (state, action) => {
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
    builder.addCase(getClientNameData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_client_name_data = (state: RootState) =>
  state.GetClientNameScreen;

export default GetClientNameScreen.reducer;
