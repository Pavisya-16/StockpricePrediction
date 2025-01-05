import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: !!localStorage.getItem("accessToken"), // Boolean based on token presence
    token: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
