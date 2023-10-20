'use client'
import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown'
import { useSelector, useDispatch } from 'react-redux';
import { createNotes } from '../redux/thunks/createNotes';
import { getAllNotes } from '../redux/thunks/getAllNotes';
import { store } from '../redux/store';
import jwtDecode from 'jwt-decode';
import { setUser } from '../redux/slices/userSlices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { getAllSubnotes } from '../redux/thunks/getAllSubnotes';

export default function Sidebar(){
    // Redux hooks
    const user = useSelector((state: any) => state.user.user)
    const notes = useSelector((state: any) => state.notes.notes)
    const dispatch = useDispatch<typeof store.dispatch>()
    const [menu, setMenu] = useState(false)

    // Get all notes and set the user
    useEffect(() => {
      if (localStorage.getItem('token')){
        const token = jwtDecode(localStorage.getItem('token')!)
        dispatch(setUser(token))
        dispatch(getAllNotes())
        dispatch(getAllSubnotes())
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

    function disconnect(){
      localStorage.removeItem('token')
      window.location.href = 'http://localhost:5173/login'
    }

    return (
        <aside className='flex flex-col w-80 h-full fixed shadow-sm shadow-black'>
          <div className='flex items-center m-5 justify-between relative'>
            <div className='flex items-center'>
              <img src={user.picture} alt={user.email} className='h-6 w-6 bg-slate-600'/>
              <h1 className='ml-3'>{user.first_name} {user.last_name}</h1>
            </div>
            <div className='h-4 w-4 bg-slate-500 rounded-xl' onClick={(e) => setMenu(!menu)}></div>
            {menu && <div className='w-32 bg-white absolute right-5 top-0 border-slate-400 border rounded-xl shadow-2xl'>
              <ul className='pl-2 flex flex-col'>
                <li className='text-black py-1'><FontAwesomeIcon icon={faCog} /> Settings</li>
                <li className='text-red-500 py-1' onClick={(e) => disconnect()}><FontAwesomeIcon icon={faSignOut} /> Logout</li>
              </ul>
              </div>}
          </div>
          <button className='bg-[#5167F6] m-5 h-10 font-bold text-white' onClick={(e) => createNote()}>
            Create
          </button>
          <Dropdown />
        </aside>
    )
}