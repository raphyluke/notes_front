'use client'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    if (!localStorage.getItem('token')){
      window.location.href = 'http://localhost:5173/login'
    }
  }, []);

  return (
    <main className="h-full w-9/12 ml-72">
      
    </main>
  )
}
