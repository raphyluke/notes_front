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
  // Redux hooks
  const notes = useSelector((state : any) => state.notes.notes)
  const dispatch = useDispatch<typeof store.dispatch>()
  const loading = useSelector((state : any) => state.notes.getAllLoading)
  const error = useSelector((state : any) => state.notes.getAllError)
  
  // React hooks
  const noteNameRef = useRef<HTMLInputElement>(null)
  const [currentNote, setCurrentNote] = useState<any>(null)
  const [blocks, setBlocks] = useState<any>(null)

  // Get all notes and set the user
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = jwtDecode(localStorage.getItem('token')!)
      dispatch(setUser(token))
    }
    
    dispatch(getAllNotes())
  }, [dispatch])

  // Set the current note
  useEffect(() => {
    if (!loading && !error) {
      const note = notes.find((note: any) => note._id === params.slug)
      if (note) {
        setCurrentNote(note)
        noteNameRef.current!.value = note.title
      }
    }
  }, [loading, notes, params.slug])

  // Set the blocks and note name
  useEffect(() => {
    if (currentNote) {
      setBlocks(currentNote.blocs)
    }
  }, [currentNote])  // Add dependency on 'currentNote'

  // Change the note name
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

  // Drag and drop functionality
  function handleDragStart(e: any, index: number) {
    e.dataTransfer.setData('index', index.toString());
  }

  function handleDragOver(e: any) {
    e.preventDefault();
  }

  function handleDrop(e: any, newIndex: number) {
    const oldIndex = parseInt(e.dataTransfer.getData('index'));
    const newBlocks = [...blocks];
    const [removed] = newBlocks.splice(oldIndex, 1);
    newBlocks.splice(newIndex, 0, removed);
    setBlocks(newBlocks);
  }

  return (
    <main className="h-full w-9/12 ml-80">
      <div className="fixed top-0 bg-white z-10 flex ml-16 w-full items-center pt-2">
        <FontAwesomeIcon icon={faHome} className="m-3" width={24} color='grey' />
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        {blocks && <p className="m-3">{noteNameRef.current?.value}</p>}
      </div>
      <input ref={noteNameRef} onChange={(e) => onChangeName(e)} className='pt-14 w-full focus:outline-none ml-20 mt-6 font-semibold text-xl mb-6 z-20' />
      {blocks && blocks.map((block: any, index : any) => (<div key={block.id}><Block data={block} index={index} /></div>))}
      <div className='h-10'></div>
    </main>
  )
}
