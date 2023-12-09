import { useState } from "react"

export default function UpdateRoomForm(props) {
    const [roomUpdateData, setRoomUpdateData] = useState({
        roomName: props.roomData.roomName,
        roomCapacity: props.roomData.roomCapacity,
        roomLocation: props.roomData.roomLocation
    })

    async function handleRequest(event) {
        event.preventDefault()
        if(roomUpdateData.roomCapacity === '' || roomUpdateData.roomLocation === '' || roomUpdateData.roomName === '') {
            alert("Fill all fields")
            return
        }

        if(!(/^\d+$/.test(roomUpdateData.roomCapacity))) {
            alert("Room capacity must be a number")
            return
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/room/admin/${props.roomData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(roomUpdateData)
            })
            if(!response.ok) {
                alert("Something went wrong")
                return
            }
            alert("Room successfully updated!")
            props.modifyRoomFunc(prevState => prevState.map(state => state.id !== props.roomData.id ? state : {...state, roomName: roomUpdateData.roomName, roomCapacity: roomUpdateData.roomCapacity, roomLocation: roomUpdateData.roomLocation}))
            props.modifyRoomDataFunc(roomUpdateData)
        }
        catch (error) {
            alert(error)
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setRoomUpdateData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    
    return (
        <div>
            <h1 className="mb-3 text-center">Update Room</h1>
            <form onSubmit={handleRequest} className="text-xl grid grid-cols-1 text-sky-500">
                <input 
                    type="text"
                    placeholder="Room Name"
                    name="roomName"
                    onChange={handleChange}
                    value={roomUpdateData.roomName}
                    className="mb-3 p-1 rounded-lg"
                />
                <input 
                    type="text"
                    placeholder="Room Capacity"
                    name="roomCapacity"
                    onChange={handleChange}
                    value={roomUpdateData.roomCapacity}
                    className="mb-3 p-1 rounded-lg"
                />
                <input 
                    type="text"
                    placeholder="Room Location"
                    name="roomLocation"
                    onChange={handleChange}
                    value={roomUpdateData.roomLocation}
                    className="mb-3 p-1 rounded-lg"
                />
                <button className="text-2xl text-zinc-50 bg-sky-500 px-5 py-1 rounded-lg hover:text-sky-500 hover:bg-zinc-50 transition-all ease-in duration-75">Update Room</button>
            </form>
        </div>
    )
}