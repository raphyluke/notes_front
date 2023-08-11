import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async (note : any, thunkAPI) => {
        fetch(`http://localhost:3000/notes/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        return note
    }
)