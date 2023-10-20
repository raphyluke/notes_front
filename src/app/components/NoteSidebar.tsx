'use client'
import Link from "next/link"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import jwtDecode from "jwt-decode";
import { getAllNotes } from "../redux/thunks/getAllNotes";
import { useRouter } from "next/navigation";

export default function NoteSidebar({note} : any){
    const dispatch = useDispatch<any>()
    const router = useRouter()
    const [selected, setSelected] = useState(false)
    const [open, setOpen] = useState(false)

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

    return <div key={note._id} className="flex justify-between items-center pb-2">
        <Link href={"/app/notes/" + note._id}>{note.title}</Link>
        <div>
        {open ? <FontAwesomeIcon icon={faArrowDown} className="hover:cursor-pointer mr-3" onClick={(e) => setOpen(!open)} /> : <FontAwesomeIcon icon={faArrowRight} className="hover:cursor-pointer mr-3" onClick={(e) => setOpen(!open)} /> }
        <FontAwesomeIcon icon={faPlus} className="hover:cursor-pointer mr-3"  />
        <FontAwesomeIcon 
            icon={faEllipsis} 
            className="hover:cursor-pointer" 
            onClick={() => setSelected(selected === note._id ? null : note._id)} 
        />
        </div>
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
}