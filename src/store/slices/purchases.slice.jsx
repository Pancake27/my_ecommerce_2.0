import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCartProducts } from './cartProducts.slice';
import { setIsLoading } from './isLoading.slice';

export const myPurchasesSlice = createSlice({
    name: 'myPurchase',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const { setPurchases } = myPurchasesSlice.actions;

export default myPurchasesSlice.reducer;

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const setPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
            dispatch(setCartProducts([]))
        })
        .catch((error) => {
            alert('You need to log first')
        })
        .finally(() => dispatch(setIsLoading(false)));
}