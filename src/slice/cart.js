import { createSlice } from '@reduxjs/toolkit'

//get index of duplicate item so we can increase qauntity
const getItemIndex = (state, idToFind) => {
    const ids = state.cart.map(item => item.id);
    return ids.indexOf(idToFind);
}

const slice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cart: [],
    currency: {currency:"USD"},
    loading:false,
    error:false
  },
  reducers: {
    addToCartSuccess: (state, action) => {
        //check if item is already in cart & increment qauntity
        
        const itemIndex = getItemIndex(state, action.payload.id);
            if (itemIndex && itemIndex < 0)
                state.cart.push(action.payload);
            else
                state.cart[itemIndex].quantity += action.payload.quantity;
        
    },
    removeFromCart(state, action) {
        // state.cart.filter( item => item.id !== action.payload.id );
        const itemIndex = getItemIndex(state, action.payload.id);
        state.cart.splice(itemIndex, 1); // 2nd parameter means remove one item only
    },
    incrementQuantity(state, action) {
        const itemIndex = getItemIndex(state, action.payload.id);
        state.cart[itemIndex].quantity += 1;
    },
    decrementQuantity(state, action) {
        const itemIndex = getItemIndex(state, action.payload.id);

        if (state.cart[itemIndex].quantity > 1)
            state.cart[itemIndex].quantity -= 1;
        else
       
        state.cart.splice(itemIndex, 1); // 2nd parameter means remove one item only
   
    },
    changeCurrency(state, action) {
         state.currency = action.payload.currency
    },
  },
});

export default slice.reducer

// Actions

export const { addToCartSuccess,addToCartLoading,addToCartFailed,removeFromCart,incrementQuantity,decrementQuantity,changeCurrency } = slice.actions

export const addToCart = () => async dispatch => {
 
}
