import { createSlice } from '@reduxjs/toolkit';
import Product from 'types/product';

interface ProductState {
    quantity: number;
    product: Product;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        empty: true,
        value: [] as ProductState[]
    },
    reducers: {
        newCart(state, action){
            state.value = action.payload as ProductState[];
            if(state.value.length > 0)
                state.empty = false;
        },
        addProduct(state, action){
            const productIndex = state.value.findIndex(productState =>
                productState.product.productId === action.payload.productId
            );

            if(productIndex >= 0)
                state.value[productIndex].quantity += 1;
            else 
                state.value.push({
                    product: action.payload,
                    quantity: 1
                });

            state.empty = false;
        },
        removeProduct(state, action){
            const productIndex = state.value.findIndex(productState =>
                productState.product.productId === action.payload
            );

            if(productIndex >= 0){
                if(state.value[productIndex].quantity > 1)
                    state.value[productIndex].quantity -= 1;
                else
                    state.value.splice(productIndex, 1);
            }

            if(state.value.length === 0)
                state.empty = true;
        },
        clearCart(state){
            state.value = [] as ProductState[];
            state.empty = true;
        }
    }
});

export const { newCart, addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;