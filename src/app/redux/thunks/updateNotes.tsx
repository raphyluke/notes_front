import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";

export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async (note : any, thunkAPI) => {
        const data = await fetch(`http://localhost:3000/notes/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(note)
        })
        note = await data.json();
        return note
    }
)