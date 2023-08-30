import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Sidebar'
import AppProvider from '../redux/AppProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Note App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen"}>
        <AppProvider>
          <div className='flex h-full'>
            <Sidebar />
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
