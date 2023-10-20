// create the store
import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './slices/notesSlices'
import userReducer from './slices/userSlices'
import subnotesReducer from './slices/subnotesSlices'

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        user : userReducer,
        subnotes : subnotesReducer
    },
})
