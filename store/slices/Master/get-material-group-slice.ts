import getMaterialGroupApi from '@/services/api/Master/get-material-group-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMaterialGroupData: any = createAsyncThunk(
  'getMaterialGroup/materialGroup',
  async (params: any) => {
    const MaterialGroup: any = await getMaterialGroupApi(params);
    return MaterialGroup;
  }
);
interface RepoMaterialGroupState {
  data: any;
  docStatus: any;
  error: string;
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoMaterialGroupState = {
  data: '',
  docStatus: '',
  error: '',
  isLoading: 'idle',
};

export const GetMaterialGroupScreen = createSlice({
  name: 'materialGroup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaterialGroupData.pending, (state) => {
      state.isLoading = 'pending';
    });
    builder.addCase(getMaterialGroupData.fulfilled, (state, action) => {
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
    builder.addCase(getMaterialGroupData.rejected, (state) => {
      state.isLoading = 'failed';
      state.error = 'failed to store data';
    });
  },
});

export const get_material_group_data = (state: RootState) =>
  state.GetMaterialGroupScreen;

export default GetMaterialGroupScreen.reducer;
