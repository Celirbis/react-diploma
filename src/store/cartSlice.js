import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrder = createAsyncThunk(
    'cart/sendOrder',
    async function (ownerData, { rejectWithValue, getState }) {
        const items = getState().cart.products.map(o => ({ id: o.id, price: o.price, count: o.amount }));
        const owner = { phone: ownerData.phone, address: ownerData.address };

        try {
            const response = await fetch('http://localhost:7070/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ owner, items }),
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.text();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        productsInCart: 0,
        orderComplited: false,
    },
    reducers: {
        addToCart(state, { payload: newProduct }) {
            state.orderComplited = false;
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
        [sendOrder.fulfilled]: (state) => {
            state.orderComplited = true;
            state.products = [];
            state.productsInCart = 0;
        },
        [sendOrder.rejected]: (state, action) => {
            console.log(`Failed to order. Error: ${action.payload}`);
        },
    }
});

export const { addToCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;