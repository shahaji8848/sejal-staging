import getSalesGroupApi from '@/services/api/Master/sales-group/get-sales-group-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSalesGroupData: any = createAsyncThunk(
    'getSalesGroupData/salesGroupData',
    async (params: any) => {
        const salesGroupData: any = await getSalesGroupApi(params);
        return salesGroupData;
    }
);
interface RepoSalesGroupDataState {
    data: any;
    docStatus: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoSalesGroupDataState = {
    data: '',
    docStatus: '',
    error: '',
    isLoading: 'idle',
};

export const GetSalesGroupDataScreen = createSlice({
    name: 'salesGroupData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSalesGroupData.pending, (state) => {
            state.isLoading = 'pending';
        });
        builder.addCase(getSalesGroupData.fulfilled, (state, action) => {
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
        builder.addCase(getSalesGroupData.rejected, (state) => {
            state.isLoading = 'failed';
            state.error = 'failed to store data';
        });
    },
});

export const get_sales_group_data = (state: RootState) =>
    state.GetSalesGroupDataScreen;

export default GetSalesGroupDataScreen.reducer;
