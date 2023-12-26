import { useEffect, useState } from "react"
import Room from './Room'
import RoomDetails from './RoomDetails'
import NewRoomForm from "./Admin/NewRoomForm"

import Swal from "sweetalert2"

export default function Home(props) {
    const [roomData, setRoomData] = useState([])
    const [screenIndex, setScreenIndex] = useState(0)
    const [roomDetails, setRoomDetails] = useState({})
    const [searchBarText, setSearchBarText] = useState('')

    useEffect(() => {
        try {
            fetch('http://localhost:8080/api/v1/room', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                }
            })
            .then(response => {
                if(!response.ok) throw new Error('Error')
                return response.json()
            })
            .then(data => {
                setRoomData(data)
            })
        }
        catch (error) {
            Swal.fire({
                title: error,
                icon: "error",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
        }
    }, [screenIndex])

    function toggleScreen() {
        setScreenIndex(prevState => prevState === 0 ? 1 : 0)
    }

    let roomItems = searchBarText === '' ? roomData.map(room => <Room roomData={room} key={room.id} toggleScreenFunc={toggleScreen} setRoomDetails={setRoomDetails}/>)
    : roomData.map(room => room.roomName.toLowerCase().includes(searchBarText.toLowerCase()) || room.roomLocation.toLowerCase().includes(searchBarText.toLowerCase()) ? <Room roomData={room} key={room.id} toggleScreenFunc={toggleScreen} setRoomDetails={setRoomDetails}/> : null)

    return (
        <>
            {
                screenIndex === 0 ? 
                    <>
                        <div className="group flex items-center mt-5 ml-5">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchBarText}
                                onChange={(event) => setSearchBarText(event.target.value)}
                                className="text-xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold placeholder:text-sky-700"
                            />
                            <svg className={searchBarText === '' ? "stroke-zinc-50 w-8 h-8 ml-2 transition-all ease-in duration-75" : "stroke-sky-500 w-10 h-10 ml-2 transition-all ease-in duration-75"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </svg>
                        </div>
                        <div className="p-5 grid grid-cols-5 gap-3">
                            {props.userManager.role === 'ADMIN' &&  <NewRoomForm userManager={props.userManager} modifyRoomFunc={setRoomData}/>}
                            {roomItems}
                        </div> 
                    </>
                    :
                    <div className="p-5">
                        <RoomDetails roomDetails={roomDetails} toggleScreenFunc={toggleScreen} userManager={props.userManager} modifyRoomFunc={setRoomData}/>
                    </div>
            }
        </>
    )
}