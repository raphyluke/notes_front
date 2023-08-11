import Image from 'next/image'
// import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight, faPlus, faGripVertical } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <main className="h-full w-9/12">
      <a href="http://localhost:3000/users/google"><button>Google</button></a>
    </main>
  )
}
