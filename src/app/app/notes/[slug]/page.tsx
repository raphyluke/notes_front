'use client'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import Block from '../../../components/Block'
import { useSelector, useDispatch } from 'react-redux'
import { changeNoteName } from '@/app/redux/slices/notesSlices'
import { updateNotes } from '@/app/redux/thunks/updateNotes'
import { store } from '@/app/redux/store'
import { getAllNotes } from '@/app/redux/thunks/getAllNotes'
import { setUser } from '@/app/redux/slices/userSlices'
import jwtDecode from 'jwt-decode'

export default function Page({params} : {params : {slug : string}}) {
  const noteNameRef = useRef<HTMLInputElement>(null)
  const notes = useSelector((state : any) => state.notes.notes)
  const dispatch = useDispatch<typeof store.dispatch>()

  const [currentNote, setCurrentNote] = useState<any>(null)
  const loading = useSelector((state : any) => state.notes.getAllLoading)
  const error = useSelector((state : any) => state.notes.getAllError)

  const [blocks, setBlocks] = useState<any>(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = jwtDecode(localStorage.getItem('token')!)
      dispatch(setUser(token))
    }
    dispatch(getAllNotes())
  }, [dispatch])

  useEffect(() => {
    if (!loading && !error) {
      const note = notes.find((note: any) => note._id === params.slug)
      if (note) {
        setCurrentNote(note)
        noteNameRef.current!.value = note.title // Check if current is not null before assigning the value
      }
    }
  }, [loading, notes, params.slug])

  useEffect(() => {
    if (currentNote) {
      setBlocks(currentNote.blocs)
    }
  }, [currentNote])  // Add dependency on 'currentNote'

  function onChangeName(e: any) {
    const updatedNote = {
      ...notes.filter((note: any) => note._id === params.slug)[0],
      title: e.target.value
    }

    dispatch(changeNoteName(updatedNote))
    dispatch(updateNotes(updatedNote))
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <main className="h-full w-9/12">
      <div className="flex ml-16 w-full items-center mt-2">
        <FontAwesomeIcon icon={faHome} className="m-3" width={24} color='grey' />
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        {blocks ? <p className="m-3">{noteNameRef.current?.value}</p> : <p></p>}
      </div>
      <input ref={noteNameRef} onChange={(e) => onChangeName(e)} className='w-full focus:outline-none ml-20 mt-6 font-semibold text-xl mb-8' />
      {blocks ? blocks.map((block: any) => (<div key={block.id}><Block data={block} /></div>)) : <div></div>}
    </main>
  )
}
