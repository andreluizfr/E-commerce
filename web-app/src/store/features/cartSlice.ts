import { createSlice, current } from '@reduxjs/toolkit';
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
            const productIndex = state.value.findIndex(productState =>{
                const productInState = current(productState.product);
                const productToAdd = action.payload;

                if(productInState.hasAttributes && productInState.variation){
                    let equalVariation = true;
                    
                    Object.keys(productInState.variation).forEach(name=>{
                        if(productInState.variation && productInState.variation[name] !== productToAdd.variation[name])
                            equalVariation = false;
                    })

                    return (productInState.id === productToAdd.id) && equalVariation;
                }
                else
                    return (productInState.id === productToAdd.id);
            });

            if(productIndex >= 0)
                state.value[productIndex].quantity += 1;
            else 
                state.value.push({
                    product: action.payload as Product,
                    quantity: 1
                });

            state.empty = false;
        },
        removeProduct(state, action){
            const productIndex = state.value.findIndex(productState => {
                const productInState = current(productState.product);
                const productToRemove = action.payload;
            
                if(productInState.hasAttributes && productInState.variation){
                    let equalVariation = true;
                    
                    Object.keys(productInState.variation).forEach(name=>{
                        if(productInState.variation && productInState.variation[name] !== productToRemove.variation[name])
                            equalVariation = false;
                    })

                    return (productInState.id === productToRemove.id) && equalVariation;
                }
                else
                    return (productInState.id === productToRemove.id);
            });

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