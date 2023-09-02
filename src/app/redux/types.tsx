export interface Bloc {
    id: string
    order: number
    note: string
    type: "h1" | "h2" | "h3" | "text" | "image" | "bullet_list" | "number_list" | "todolist"
    url: string
    checked: boolean
    content: string
    author: string
    // index is a number which don't have to be present everytime
    index?: number
}

// create Note type
export interface Note {
    _id: string
    title: string
    author: string
    created_at: string
    edited_at: string
    blocs: Bloc[]
}

export interface RootState {
    notes: Note[],
    bloc : Bloc,
    note : Note,
}