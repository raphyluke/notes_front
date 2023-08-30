'use client'
import { useState } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getAllNotes } from "../redux/thunks/getAllNotes"
import jwtDecode from "jwt-decode"
import {useRouter } from "next/navigation"

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
            <div key={note._id} className="flex justify-between items-center pb-2">
              <Link href={"/app/notes/" + note._id}>{note.title}</Link>
              <FontAwesomeIcon 
                icon={faEllipsis} 
                className="hover:cursor-pointer" 
                onClick={() => setSelected(selected === note._id ? null : note._id)} 
              />
              {selected === note._id && (
                <div className="bg-slate-200 w-24 absolute right-0 top-6">
                  <div 
                    onClick={() => handleDelete(note)} 
                    className="flex text-red-600 items-center gap-3 pl-2 pt-1.5 pb-1.5 w-full"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <p className="text-sm hover:cursor-pointer">Delete</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};