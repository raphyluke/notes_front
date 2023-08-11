import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async () => {
        const response = await fetch('http://localhost:3000/notes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : jwtDecode(localStorage.getItem('token')).email
            })
        })
        const result = await response.json()
        return result
    }
)