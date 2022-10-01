import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalogCategories = createAsyncThunk(
    'catalog/fetchCatalogCategories',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('http://localhost:7070/api/categories');

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCatalog = createAsyncThunk(
    'catalog/fetchCatalog',
    async function (_, { rejectWithValue, getState }) {
        try {
            const { itemsLoaded, categoryChosen, searchQuery } = getState().catalog;

            const response = await fetch(`http://localhost:7070/api/items?categoryId=${categoryChosen}&offset=${itemsLoaded}&q=${searchQuery}`);

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        products: [],
        categories: [],
        loading: false,
        itemsLoaded: 0,
        moreItemsAvailable: true,
        categoryChosen: 0,
        searchQuery: "",
        error: null
    },
    reducers: {
        changeCategory(state, action) {
            state.categoryChosen = action.payload;
            state.products = [];
            state.itemsLoaded = 0;
            state.moreItemsAvailable = true;
        },
        changeQuery(state, action) {
            state.searchQuery = action.payload;
            state.products = [];
            state.itemsLoaded = 0;
            state.moreItemsAvailable = true;
        },

    },
    extraReducers: {
        [fetchCatalog.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchCatalog.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = [...state.products, ...action.payload];
            state.itemsLoaded = state.products.length;
            if (action.payload.length < 6) state.moreItemsAvailable = false;
        },
        [fetchCatalog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [fetchCatalogCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
        [fetchCatalogCategories.rejected]: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { changeCategory, changeQuery } = catalogSlice.actions;
export default catalogSlice.reducer;