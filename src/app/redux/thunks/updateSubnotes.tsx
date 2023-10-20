import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";

export const updateSubnotes = createAsyncThunk(
    'subnotes/updateNotes',
    async (note : any, thunkAPI) => {
        const data = await fetch(`http://localhost:3000/subnotes/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(note)
        })
        if (data.status === 401){
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:5173/login'
        }
        note = await data.json();
        return note
    }
)