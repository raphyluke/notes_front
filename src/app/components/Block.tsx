'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addBlock, editBlock, deleteBlock} from '../redux/slices/notesSlices'
import BoxIcons from './BoxIcons'
import { updateNotes } from '../redux/thunks/updateNotes'
// import uuid
import { v4 as uuidv4 } from 'uuid';
import { ThunkDispatch } from '@reduxjs/toolkit'

 
export default function Block({data} : any){
    const inputRef = useRef<HTMLInputElement>(null)
    const [content, setContent] = useState<any>(data.content)
    const [boxIcon , setBoxIcon] = useState<any>(false)
    const [isOver , setIsOver] = useState<any>(false)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const notes = useSelector((state : any) => state.notes.notes.filter((note : any) => note._id === data.note)[0]) as any

    useEffect(() => {
        if (inputRef.current){
            inputRef.current.value = content
        }
    },[data.content])

    useEffect(() => {
      dispatch(updateNotes(notes))
    }, [notes])

    
    function handleKeyDown(e : any){
        if (e.key === "Enter"){
          dispatch(addBlock({
            id : uuidv4(),
            order : data.order + 1,
            note : data.note,
            type : "text",
            url : 'https://via.placeholder.com/150',
            content : "",
            author : data.author,
          }))
        }
        else if (e.key === "Backspace" && e.target.value === ""){
          dispatch(deleteBlock({
            id : data.id,
            order : data.order,
            note : data.note,
            type : data.type,
            url : data.url,
            content : data.content,
            author : data.author,
          }))
        }
    }
    function handleChange(e : any){
        setContent(e.target.value)
        dispatch(editBlock({
          id : data.id,
          order : data.order,
          note : data.note,
          type : data.type,
          url : data.url,
          content : e.target.value,
          author : data.author,
        }))
    }

    if (data.type === "h1"){
      return (
        <div key={data.id} className='flex m-5 w-full items-center relative' onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='bg-transparent w-full focus:outline-none ml-2 text-3xl' placeholder='Add a task...' />
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
        </div>
      )
    }
    if (data.type === "h2"){
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='bg-transparent w-full focus:outline-none ml-2 text-2xl' placeholder='Add a task...' />
        </div>
      )
    }
    if (data.type === "h3"){
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='flex items-center bg-transparent w-full focus:outline-none ml-2 text-xl' placeholder='Add a task...' />
        </div>
      )
    }
    if (data.type === "image"){
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <img src={data.url} alt='image' className='w-1/2' />
        </div>
      )
    }
    if (data.type === "bullet_list"){
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <div className='ml-2 mr-2'>•</div>
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='bg-transparent w-full focus:outline-none ml-2 text-lg' placeholder='Add a task...' />
        </div>
      )
    }
    if (data.type === "number_list"){
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='bg-transparent w-full focus:outline-none ml-2 text-lg' placeholder='Add a task...' />
        </div>
      )
    }
    if (data.type === "text") {
      return (
        <div  key={data.id} className='flex m-5 w-full items-center relative'  onMouseOver={(e) => setIsOver(true)} onMouseOut={(e) => setIsOver(false)}>
          {isOver ? <div className='flex w-14'>
            <FontAwesomeIcon icon={faPlus} className='m-2' width={10} color='grey' />
            <FontAwesomeIcon icon={faGripVertical} className='m-2' width={10} color='grey' onClick={(e) => setBoxIcon(!boxIcon)} />
          </div> : <div className='w-14 flex'></div>}
          {boxIcon ? <div className=' absolute left-0 z-10 flex'><BoxIcons setBoxIcon={setBoxIcon} data={data} /><div className=' bg-white w-5 h-5 flex justify-center items-center' onClick={(e) => setBoxIcon(false)}>x</div></div> : <div></div>}
          <input value={data.content} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} ref={inputRef} className='bg-transparent w-full focus:outline-none ml-2 text-lg' placeholder='Add a task...' />
        </div>
      )
    }
  }