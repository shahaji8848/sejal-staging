import getWarehouseListApi from '@/services/api/PurchaseReceipt/get-warehouse-list';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getWarehouseListData: any = createAsyncThunk(
  'getWarehouseList/WarehouseList',
  async (params: any) => {
    const WarehouseList: any = await getWarehouseListApi(params);
    return WarehouseList;
  }
);
interface RepoWarehouseListState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoWarehouseListState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetWarehouseListScreen = createSlice({
  name: 'WarehouseList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWarehouseListData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getWarehouseListData.fulfilled, (state, action) => {
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
    builder.addCase(getWarehouseListData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_warehouse_list_data = (state: RootState) =>
  state.GetWarehouseListScreen;

export default GetWarehouseListScreen.reducer;
