import { useEffect, useState } from "react"
import Room from './Room'
import RoomDetails from './RoomDetails'
import NewRoomForm from "./Admin/NewRoomForm"

export default function Home(props) {
    const [roomData, setRoomData] = useState([])
    const [screenIndex, setScreenIndex] = useState(0)
    const [roomDetails, setRoomDetails] = useState({})

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
            alert(error)
        }
    }, [])

    function toggleScreen() {
        setScreenIndex(prevState => prevState === 0 ? 1 : 0)
    }

    return (
        <>
            {
                screenIndex === 0 ? 
                    <div className="p-5 grid grid-cols-4 gap-5">
                        {roomData.map(room => <Room roomData={room} key={room.id} toggleScreenFunc={toggleScreen} setRoomDetails={setRoomDetails}/>)}
                        {props.userManager.role === 'ADMIN' &&  <NewRoomForm userManager={props.userManager} modifyRoomFunc={setRoomData}/>}
                    </div> 
                    :
                    <div className="p-5">
                        <RoomDetails roomDetails = {roomDetails} toggleScreenFunc={toggleScreen} userManager={props.userManager} modifyRoomFunc={setRoomData}/>
                    </div>
            }
        </>
    )
}