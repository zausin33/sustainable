import {createAsyncThunk} from "@reduxjs/toolkit";
import {coreClient} from "../apiClient";

export const usersGetById = createAsyncThunk(
    'users/getUsers',
    async () => {
        const response = await coreClient.get(`/v1/users/`);
        return response.data;
    },
);