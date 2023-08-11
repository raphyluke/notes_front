'use client'
import Image from 'next/image'
import Dropdown from './components/Dropdown'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight, faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Block from './components/Block'
import jwtDecode from 'jwt-decode'

export default function Home() {
  const [data , setData] = useState<any>(null)
  useEffect(() => {
    // Get the data params from the url
    const url = window.location.href;
    const params = new URL(url).searchParams;
    // Get the token
    const token = params.get('data');
    // Decode the token to JSON
    const tokenJSON = JSON.parse(token as any);
    if (token){
      localStorage.setItem('token', tokenJSON.token)
    }
    if (localStorage.getItem('token')){
      console.log(jwtDecode(localStorage.getItem('token') as any))
      // redirect to ./app
      window.location.href = 'http://localhost:5173/app'
    }
    if (!localStorage.getItem('token')){
      // redirect to ./app
      window.location.href = 'http://localhost:5173/login'
    }
    
  }, []);
  return (
    <main className="h-full w-9/12">
      
    </main>
  )
}
