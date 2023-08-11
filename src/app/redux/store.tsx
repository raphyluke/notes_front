// create the store
import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './slices/notesSlices'
import userReducer from './slices/userSlices'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        user : userReducer
    },
})
