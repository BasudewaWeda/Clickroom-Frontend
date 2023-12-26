import { useState } from "react"
import Swal from "sweetalert2"

export default function NewRoomForm(props) {
    const [newRoomData, setNewRoomData] = useState({
        roomName: "",
        roomCapacity: "",
        roomLocation: ""
    })

    async function handleRequest(event) {
        event.preventDefault()
        if(newRoomData.roomCapacity === '' || newRoomData.roomLocation === '' || newRoomData.roomName === '') {
            Swal.fire({
                title: "Fill all fields!",
                icon: "warning",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            return
        }

        if(!(/^\d+$/.test(newRoomData.roomCapacity))) {
            Swal.fire({
                title: "Amount must be a number.",
                icon: "warning",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            return
        }

        try {
            let response = await fetch('http://localhost:8080/api/v1/room/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(newRoomData)
            })

            if(!response.ok) {
                Swal.fire({
                    title: "Something went wrong.",
                    icon: "error",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                return
            }

            Swal.fire({
                title: "Room successfully created!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            let data = await response.json()
            let newRoom = {
                id: data.split("/")[4],
                roomName: newRoomData.roomName,
                roomCapacity: newRoomData.roomCapacity,
                roomLocation: newRoomData.roomLocation,
                schedules: [],
                facilities: []
            }

            props.modifyRoomFunc(prevState => (
                [...prevState, newRoom]
            ))

            setNewRoomData({
                roomName: "",
                roomCapacity: "",
                roomLocation: ""
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
    }

    function handleChange(event) {
        const {name, value} = event.target
        setNewRoomData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <div className="p-5 bg-sky-500 text-zinc-50 rounded-lg">
            <form onSubmit={handleRequest} className="font-bold text-sky-500 grid grid-cols-1">
                <input
                    type="text"
                    placeholder="Room Name"
                    name="roomName"
                    onChange={handleChange}
                    value={newRoomData.roomName}
                    className="mb-3 p-1 rounded-lg text-lg"
                />
                <div className="flex">
                    <div>
                        <input
                            type="text"
                            placeholder="Capacity"
                            name="roomCapacity"
                            onChange={handleChange}
                            value={newRoomData.roomCapacity}
                            className="mb-3 p-1 rounded-lg w-3/4"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            name="roomLocation"
                            onChange={handleChange}
                            value={newRoomData.roomLocation}
                            className="p-1 rounded-lg w-3/4"
                        />
                    </div>
                    <button className="p-5 text-xl text-sky-500 bg-zinc-50 rounded-lg hover:text-zinc-50 hover:bg-sky-500 transition-all ease-in duration-75">Create</button>
                </div>
            </form>
        </div>
    )
}