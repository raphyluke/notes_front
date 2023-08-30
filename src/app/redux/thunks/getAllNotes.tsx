import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface Note {
    // Define the properties of a note object here
}

export const getAllNotes = createAsyncThunk<Note[], void, { rejectValue: Error }>(
    'notes/getAllNotes',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token') as string;
            const decodedToken = jwtDecode(token) as Record<string, unknown>;
            const email = decodedToken.email as string;
            const response = await fetch('http://localhost:3000/notes/get/' + email, {
                headers: {
                    "authorization": "Bearer " + token,
                },
            });
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'http://localhost:5173/login';
            }
            const data = await response.json() as Note[];
            return data;
        } catch (error) {
            if (typeof error === 'string') {
                return rejectWithValue(new Error(error));
            }
            throw error;
        }
    }
);