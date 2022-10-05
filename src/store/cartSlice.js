import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*export const fetchCatalogCategories = createAsyncThunk(
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
);*/

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        productsInCart: 0,
        error: null
    },
    reducers: {
        addToCart(state, { payload: newProduct }) {
            const oldProduct = state.products.find(o => (o.id === newProduct.id && o.size === newProduct.size));
            if (!oldProduct) {
                state.products = [...state.products, newProduct];
                state.productsInCart++;
            }
            else {
                const sum = oldProduct.amount + newProduct.amount;
                state.products = state.products.map(o => (o.id === newProduct.id && o.size === newProduct.size) ? { ...o, amount: sum } : o);
            }
        },
        deleteProduct(state, action) {
            state.products.splice(action.payload, 1);
            state.productsInCart--;
        },

    },
    extraReducers: {
        /*[fetchCatalog.pending]: (state) => {
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
        },*/
    }
});

export const { addToCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;