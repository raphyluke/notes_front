'use client'
import Image from 'next/image'
import Dropdown from '../components/Dropdown'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight, faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Block from '../components/Block'
import jwtDecode from 'jwt-decode'

export default function Home() {
  const [data , setData] = useState<any>(null)
  useEffect(() => {
    if (!localStorage.getItem('token')){
      window.location.href = 'http://localhost:5173/login'
    }
  }, []);
  return (
    <main className="h-full w-9/12">
      <div className="flex ml-16 w-full items-center mt-2">
        <FontAwesomeIcon icon={faHome} className="m-3" width={24} color='grey' />
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        <p className="m-3">Coucou</p>
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        <p className="m-3">Coucou</p>
      </div>
      <i className='ml-20 mt-6 font-semibold text-xl mb-8'/>
      <Block data="Test" />
      {data ? <img className='ml-20 rounded-full' src={data.picture} /> : <div></div>}
    </main>
  )
}
