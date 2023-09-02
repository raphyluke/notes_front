'use client'
import React, { useEffect } from 'react';
import Dropdown from './Dropdown'
import { useSelector, useDispatch } from 'react-redux';
import { createNotes } from '../redux/thunks/createNotes';
import { getAllNotes } from '../redux/thunks/getAllNotes';
import { store } from '../redux/store';
import jwtDecode from 'jwt-decode';
import { setUser } from '../redux/slices/userSlices';

export default function Sidebar(){
    // Redux hooks
    const user = useSelector((state: any) => state.user.user)
    const notes = useSelector((state: any) => state.notes.notes)
    const dispatch = useDispatch<typeof store.dispatch>()

    // Get all notes and set the user
    useEffect(() => {
      if (localStorage.getItem('token')){
        const token = jwtDecode(localStorage.getItem('token')!)
        dispatch(setUser(token))
        dispatch(getAllNotes())
        /* window.location.href = 'http://localhost:5173/notes/' */
        console.log(notes)
      }
      else {
        window.location.href = 'http://localhost:5173/login'
      }
    }, [])

    // Create a note
    function createNote(){
      dispatch(createNotes())
    }

    return (
        <aside className='flex flex-col w-80 h-full fixed shadow-sm shadow-black'>
          <div className='flex items-center m-5 justify-between'>
            <div className='flex items-center'>
              <img src={user.picture} alt={user.email} className='h-6 w-6 bg-slate-600'/>
              <h1 className='ml-3'>{user.first_name} {user.last_name}</h1>
            </div>
            <div className='h-4 w-4 bg-slate-500 rounded-xl'></div>
          </div>
          <button className='bg-[#5167F6] m-5 h-10 font-bold text-white' onClick={(e) => createNote()}>
            Create
          </button>
          <Dropdown />
        </aside>
    )
}