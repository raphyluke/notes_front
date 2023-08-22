import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async () => {
        const response = await fetch('http://localhost:3000/notes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                email : jwtDecode(localStorage.getItem('token')).email
            })
        })
        if (response.status === 401){
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:5173/login'
        }
        const result = await response.json()
        return result
    }
)