'use client'
import { use, useState } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEllipsis, faListDots, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getAllNotes } from "../redux/thunks/getAllNotes"
import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import {useRouter } from "next/navigation"
export default function Dropdown(){
    const [open, setOpen] = useState(true)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(false)
    const notes = useSelector((state: any) => state.notes.notes)
    const dispatch = useDispatch<any>()
    
    useEffect(() => {
      setData(notes)
    }, [notes])
    
    function handleClick(){
      setOpen(!open)
    }

    const router = useRouter()

    function handleDelete(note : any){
      fetch("http://localhost:3000/notes/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id : note._id,
          email : jwtDecode<any>(localStorage.getItem('token')).email
        })
      })
      .then(res => res.json())
      .then(async result => {
        if(result.statusCode === 200){
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
            <div key={note._id} className="flex justify-between items-center">
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
                    <p className="text-sm">Delete</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};