'use client'
import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export default function Home() {
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
    
  }, []);
  return (
    <main className="h-full w-9/12">
      
    </main>
  )
}
