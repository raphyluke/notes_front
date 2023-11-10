import { faAlignJustify, faCheck, faDotCircle, faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { changeTypeBlock } from "../redux/slices/subnotesSlices"
import { useDispatch } from "react-redux"

export default function BoxIcons({data, setBoxIcon} : {data : any, setBoxIcon : any}){

    const dispatch = useDispatch()
    // Change the type of the block
    function changeType(type : any){
        dispatch(changeTypeBlock({
            id : data.id,
            order : data.order,
            note : data.note,
            type : type,
            url : data.url,
            content : data.content,
            checked : data.checked,
            author : data.author,
        }))
        setBoxIcon(false)
    }
    
    return <div className=" grid grid-cols-3 border w-fit bg-white">
        <div className="flex items-center justify-center w-10" onClick={() => changeType("h1")}>
            <p>H1</p>
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("h2")}>
            <p>H2</p>
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("h3")}>
            <p>H3</p>
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("text")}>
            <FontAwesomeIcon icon={faAlignJustify} className='m-2' width={10} color='grey' />
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("image")}>
            <FontAwesomeIcon icon={faImage} className='m-2' width={10} color='grey' />
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("bullet_list")}>
            <FontAwesomeIcon icon={faDotCircle} className='m-2' width={10} color='grey' />
        </div>
        <div className="flex items-center justify-center w-10" onClick={() => changeType("todolist")}>
            <FontAwesomeIcon icon={faCheck} className='m-2' width={10} color='grey' />
        </div>
    </div>
}