import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {coreClient} from "../apiClient";
import {ChallengeState} from "./challenges.types";

const initialState: ChallengeState = {
    globalChallenges: []
}

export const getGlobalChallenges = createAsyncThunk(
    'challenges/getGlobalChallenges',
    async () => {
        const response = await coreClient.get(`global-challenges`);
        return response.data;
    },
);

export const challengesSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // getGlobalChallenges
            .addCase(getGlobalChallenges.fulfilled, (state, {payload}) => {
                state.globalChallenges = payload;
            })
    }
})

export const { } = challengesSlice.actions

export default challengesSlice.reducer

