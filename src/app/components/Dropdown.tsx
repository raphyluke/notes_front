'use client'
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllNotes } from "../redux/thunks/getAllNotes"
import jwtDecode from "jwt-decode"
import {useRouter } from "next/navigation"
import NoteSidebar from "./NoteSidebar"

export default function Dropdown(){
    // React hooks
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(false)

    // Redux hooks
    const notes = useSelector((state: any) => state.notes.notes)
    const dispatch = useDispatch<any>()
    
    // Get all notes
    useEffect(() => {
      setData(notes)
      console.log(notes)
    }, [notes])

    const router = useRouter()

    // Handle the click on the delete button
    function handleDelete(note: any) {
      const token = localStorage.getItem('token');
      if (!token) {
        // handle the case where the token is null
        return;
      }
      const email = jwtDecode<any>(token).email;
      fetch("http://localhost:3000/notes/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          id: note._id,
          email: email,
        })
      })
        .then(res => {
          if (res.status === 200) {
            return res.json()
          }
          if (res.status === 401) {
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:5173/login'
          }
        })
        .then(async result => {
          if (result.statusCode === 200) {
            await dispatch(getAllNotes())
            // check the actual route (without pathname)
            if (window.location.pathname === '/app/notes/' + note._id) {
              router.push('/app')
            }
          }
        })
    }

    return (
      <div className='m-5 relative'>
        <div className='flex justify-between flex-col'>
          {data.map((note: any) => (
            <NoteSidebar note={note} />
          ))}
        </div>
      </div>
    );
};