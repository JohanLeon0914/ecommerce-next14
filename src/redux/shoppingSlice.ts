import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface StoreState {
    productData: Product[];
    userInfo: null | string;
    orderData: [];
    search: "";
}

const initialState: StoreState = {
    productData: [],
    userInfo: null,
    orderData: [],
    search: ""
}

export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            );
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },
        increaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            );
            existingProduct && existingProduct.quantity++;
        },
        decreaseQuantity: (state, action) => {
            const existingProduct = state.productData.find(
                (item: Product) => item._id === action.payload._id
            );
            if (existingProduct?.quantity === 1) {
                existingProduct.quantity === 1;
            } else {
                existingProduct && existingProduct.quantity--;
            }
        },
        deleteProduct: (state, action) => {
            state.productData = state.productData.filter(
                (item) => item._id !== action.payload
            );
        },
        resetCart: (state) => {
            state.productData = [];
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        deleteUser: (state) => {
            state.userInfo = null;
        },
        saveOrder: (state, action) => {
            state.orderData = action.payload;
        },
        resetOrder: (state) => {
            state.orderData = [];
        },
        addSearch: (state, action) => {
            state.search = action.payload;
        },
    }
})

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    resetCart,
    addUser,
    deleteUser,
    saveOrder,
    resetOrder,
    addSearch,
  } = shoppingSlice.actions;
export default shoppingSlice.reducer;