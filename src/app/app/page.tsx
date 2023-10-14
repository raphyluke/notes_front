'use client'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    
  }, []);

  return (
    <main className="h-full w-9/12 ml-72">
      <div className="flex ml-16 w-full items-center mt-2">
        <FontAwesomeIcon icon={faHome} className="m-3" width={24} color='grey' />
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        <p className="m-3">Coucou</p>
        <FontAwesomeIcon icon={faChevronRight} className="m-3" width={10} color='grey' />
        <p className="m-3">Coucou</p>
      </div>
    </main>
  )
}
