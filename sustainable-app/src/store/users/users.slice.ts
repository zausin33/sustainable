import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {coreClient} from "../apiClient";
import {UsersState} from "./users.types";
import {showErrorMsg, showInfoMsg, showSuccessMsg} from "../../utils/toast";

const initialState: UsersState = {
    current: undefined,

}

export const signIn = createAsyncThunk(
    'users/signIn',
    async ({username, password}: {username: string, password: string}) => {
        const response = await coreClient.post(`users/signin`, {username, password});
        return response.data;
    },
);

export const signUp = createAsyncThunk(
    'users/signUp',
    async ({username, email, password}: {username: string, email: string, password: string}) => {
        const response = await coreClient.post(`users/signup`, {username, emailAddress: email, password});
        return response.data;
    },
);

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // signIn
            .addCase(signIn.fulfilled, (state, {payload}) => {
                state.current = payload.user
                state.current!.token = payload.token
            })
        // signUp
            .addCase(signUp.fulfilled, (state, {payload}) => {
                state.current = payload.user
                state.current!.token = payload.token
                showSuccessMsg("Successfully created account")
            })
    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer

