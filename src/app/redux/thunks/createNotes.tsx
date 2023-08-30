import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async () => {
        const token = localStorage.getItem('token') as string;
        const decodedToken = jwtDecode(token) as Record<string, unknown>;
        const email = decodedToken.email as string;
        const response = await fetch('http://localhost:3000/notes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                email
            })
        })
        if (response.status === 401){
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:5173/login'
        }
        const result = await response.json()
        return result.note
    }
)