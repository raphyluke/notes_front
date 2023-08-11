import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { addNotes } from "../slices/notesSlices";

export const getAllNotes = createAsyncThunk(
    'notes/getAllNotes',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token') as string;
            const response = await fetch('http://localhost:3000/notes/get?email=' + jwtDecode(token).email, {
                headers: {
                    Authentication : `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);