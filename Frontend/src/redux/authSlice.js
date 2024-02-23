import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUserAndToken: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;

        },
        clearUserAndToken: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const {setUserAndToken, clearUserAndToken} = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;