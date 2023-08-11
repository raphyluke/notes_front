'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNotes } from "../../../redux/slices/notesSlices"
import { setUser } from "../../../redux/slices/userSlices"
import jwtDecode from 'jwt-decode'

export default function Loading(){
    const user = useSelector((state: any) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')){
            const token = localStorage.getItem('token') as string
            dispatch(setUser(jwtDecode(token as string)))
            fetch('http://localhost:3000/notes/get?email=' + jwtDecode(token).email, {
              // put the token as a header
              headers: {
                Authentication : `Bearer ${token}`
              },
            }).then(res => res.json())
            .then(data => dispatch(addNotes(data)))
        }
        else {
          window.location.href = 'http://localhost:5173/login'
        }

    }, [])
    return <p>Loading</p>
}