import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getAllSubnotes } from "../redux/thunks/getAllSubnotes";

export default function SubnoteSidebar({subnote} : any){
    const [selected, setSelected] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch<any>()

    function handleDelete(note: any) {
        const token = localStorage.getItem('token');
        if (!token) {
        // handle the case where the token is null
        return;
        }
        const email = jwtDecode<any>(token).email;
        fetch("http://localhost:3000/subnotes/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "Bearer " + token,
        },
        body: JSON.stringify({
            id: note._id,
            email: email,
        })
        })
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
            if (res.status === 401) {
                localStorage.removeItem('token')
                window.location.href = 'http://localhost:5173/login'
            }
        })
        .then(async result => {
            if (result.statusCode === 200) {
            await dispatch(getAllSubnotes())
            // check the actual route (without pathname)
            if (window.location.pathname === '/app/subnotes/' + note._id) {
                router.push('/app')
            }
            }
        })
    }

    return  <div className="relative flex justify-between">
        <li className="mb-1.5" key={subnote._id}><Link href={"/app/subnotes/" + subnote._id}>{subnote.title}</Link></li>
        <FontAwesomeIcon 
            icon={faEllipsis} 
            className="hover:cursor-pointer" 
            onClick={() => setSelected(selected === subnote._id ? null : subnote._id)} 
        />
        {selected === subnote._id && (
            <div className="bg-slate-200 w-24 absolute right-6">
                <div 
                onClick={() => handleDelete(subnote)} 
                className="flex text-red-600 items-center gap-3 pl-2 pt-1.5 pb-1.5 w-full"
                >
                <FontAwesomeIcon icon={faTrash} />
                <p className="text-sm hover:cursor-pointer">Delete</p>
                </div>
            </div>
        )}
    </div>
}