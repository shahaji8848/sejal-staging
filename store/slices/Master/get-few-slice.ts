import getFewApi from '@/services/api/Master/few/get-few-api';
import { RootState } from '@/store/root-reducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getFewData: any = createAsyncThunk(
    'getFewData/FewData',
    async (params: any) => {
        const fewData: any = await getFewApi(params);
        return fewData;
    }
);
interface RepoFewState {
    data: any;
    docStatus: any;
    error: string;
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: RepoFewState = {
    data: '',
    docStatus: '',
    error: '',
    isLoading: 'idle',
};

export const GetFewScreen = createSlice({
    name: 'fewData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFewData.pending, (state) => {
            state.isLoading = 'pending';
        });
        builder.addCase(getFewData.fulfilled, (state, action) => {
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
        builder.addCase(getFewData.rejected, (state) => {
            state.isLoading = 'failed';
            state.error = 'failed to store data';
        });
    },
});

export const get_few_data = (state: RootState) =>
    state.GetFewScreen;

export default GetFewScreen.reducer;
