'use client'
import { use, useState } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export default function Dropdown(){
    const [open, setOpen] = useState(true)
    const [data, setData] = useState([])
    const notes = useSelector((state: any) => state.notes.notes)
    useEffect(() => {
      setData(notes)
    }, [notes])
    return (
      <div className='m-5'>
        <div className='flex justify-between flex-col'>
          {data.map((note: any) => (
            <Link key={note.title} href={"/app/notes/" + note._id}>{note.title}</Link>
          ))}
        </div>
      </div>
    )
}