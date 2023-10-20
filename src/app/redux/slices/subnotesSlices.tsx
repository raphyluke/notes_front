// create redux slice typescript snippet for notes
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, Note } from '../types'
import { createSubnotes } from '../thunks/createSubnotes'
import { updateSubnotes } from '../thunks/updateSubnotes'
import { getAllSubnotes } from '../thunks/getAllSubnotes'
const initialState = {
    notes: [] as Note[],
    createLoading : false,
    createError : false,
    updateLoading : false,
    updateError : false,
    getAllLoading : false,
    getAllError : false,
}

const subnotesSlice = createSlice({
    name: 'subnotes',
    initialState,
    reducers: {
        addNotes: (state, action: PayloadAction<RootState['notes']>) => {
            state.notes = action.payload
        },
        editNote: (state, action: PayloadAction<RootState['notes']>) => {
            state.notes = action.payload
        },
        deleteNote: (state, action: PayloadAction<RootState['notes']>) => {
            state.notes = action.payload
        },
        addOneNote: (state, action: PayloadAction<RootState['note']>) => {
            state.notes.push(action.payload)
        },
        addBlock: (state, action: PayloadAction<RootState['bloc']>) => {
            const noteIndex = state.notes.findIndex((note) => note._id === action.payload.note);
            if (noteIndex !== -1) {
                const blocIndex = action.payload.index as number;
                // delete the index property from the bloc
                delete action.payload.index;
                // I want to add the bloc after the bloc with the index
                state.notes[noteIndex].blocs.splice(blocIndex + 1, 0, action.payload);
            }
        },
        editBlock: (state, action: PayloadAction<RootState['bloc']>) => {
            const noteIndex = state.notes.findIndex((note) => note._id === action.payload.note);
            if (noteIndex !== -1) {
                const blocIndex = state.notes[noteIndex].blocs.findIndex((bloc) => bloc.id === action.payload.id);
                if (blocIndex !== -1) {
                    state.notes[noteIndex].blocs[blocIndex] = action.payload;
                }
            }
            // get the number of blocs in the note
            const length = state.notes[noteIndex].blocs.length;
            console.log(length);
        },
        deleteBlock: (state, action: PayloadAction<RootState['bloc']>) => {
            const noteIndex = state.notes.findIndex((note) => note._id === action.payload.note);
            if (noteIndex !== -1 && state.notes[noteIndex].blocs.length > 1) {
                state.notes[noteIndex].blocs = state.notes[noteIndex].blocs.filter((bloc) => bloc.id !== action.payload.id);
            }
        },
        changeTypeBlock: (state, action: PayloadAction<RootState['bloc']>) => {
            const note = state.notes.find((note) => note._id === action.payload.note);
            if (note) {
                const bloc = note.blocs.find((bloc) => bloc.id === action.payload.id);
                if (bloc) {
                    bloc.type = action.payload.type;
                    bloc.content = action.payload.content;
                }
            }
        },
        changeNoteName : (state, action: PayloadAction<RootState['note']>) => {
            const note = state.notes.find((note) => note._id === action.payload._id);
            if (note) {
                state.notes = [...state.notes.filter((note) => note._id !== action.payload._id), action.payload]
            }
        }
          
    },
    extraReducers: (builder) => {
        builder.addCase(createSubnotes.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createSubnotes.fulfilled, (state, action) => {
            state.createLoading = false;
            state.notes = [...state.notes, action.payload]
        });
        builder.addCase(createSubnotes.rejected, (state) => {
            state.createLoading = false;
            state.createError = true;
        });
        builder.addCase(updateSubnotes.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updateSubnotes.fulfilled, (state, action) => {
            state.updateLoading = false;
        });
        builder.addCase(updateSubnotes.rejected, (state) => {
            state.updateLoading = false;
            state.updateError = true;
        });
        builder.addCase(getAllSubnotes.pending, (state) => {
            state.getAllLoading = true;
        });
        builder.addCase(getAllSubnotes.fulfilled, (state, action) => {
            state.getAllLoading = false;
            state.notes = action.payload as Note[];
        });
        builder.addCase(getAllSubnotes.rejected, (state) => {
            state.getAllLoading = false;
            state.getAllError = true;
        });
    }
})

export const { addNotes, editNote, deleteNote, addBlock, editBlock, deleteBlock, changeTypeBlock, addOneNote, changeNoteName } = subnotesSlice.actions
export default subnotesSlice.reducer