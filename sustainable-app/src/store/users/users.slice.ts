import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    username: string
    email: string
    challenges: string[]
}

const initialState: UserState = {
    username: "",
    email: "",
    challenges: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ username: string; email: string }>) {
            const {username, email} = action.payload;
            state.username = username;
            state.email = email;
        },
        logout() {
            return initialState;
        },
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

