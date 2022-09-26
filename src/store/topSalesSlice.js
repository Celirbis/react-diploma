import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopSales = createAsyncThunk(
    'topSales/fetchTopSales',
    async function () {

        const response = await fetch('http://localhost:7070/api/top-sales');
        const data = await response.json();
        return data;
    }
);

const topSalesSlice = createSlice({
    name: 'topSales',
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [fetchTopSales.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTopSales.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        }
    }
});

export default topSalesSlice.reducer;