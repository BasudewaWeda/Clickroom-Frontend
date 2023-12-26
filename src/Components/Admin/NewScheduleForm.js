import { useState } from "react"

import Swal from "sweetalert2"

export default function NewRoomForm(props) {
    const [newScheduleData, setNewScheduleData] = useState({
        borrowDate: "",
        startTime: "",
        endTime: "",
        borrowDetail: "",
        room: {
            id: props.roomData.id,
            roomCapacity: props.roomData.roomCapacity,
            roomLocation: props.roomData.roomLocation,
            roomName: props.roomData.roomName
        }
    })

    async function handleRequest(event) {
        event.preventDefault()
        if(newScheduleData.borrowDate === '' || newScheduleData.startTime === '' || newScheduleData.endTime === '' || newScheduleData.borrowDetail === '') {
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

        if(newScheduleData.startTime > newScheduleData.endTime) {
            Swal.fire({
                title: "Start time cannot be later than end time.",
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
            let response = await fetch('http://localhost:8080/api/v1/schedule/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(newScheduleData)
            })

            if(response.status === 400) {
                Swal.fire({
                    title: "New schedule collides with another schedule.",
                    icon: "error",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                return
            }

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
                title: "Schedule successfully created!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            let data = await response.json()
            let newSchedule = {
                id: data.split("/")[4],
                borrowDate: newScheduleData.borrowDate,
                startTime: newScheduleData.startTime,
                endTime: newScheduleData.endTime,
                borrowDetail: newScheduleData.borrowDetail,
                lendee: props.userManager.username,
                lender: props.userManager.username
            }

            props.modifyScheduleFunc(prevState => (
                [...prevState, newSchedule]
            ))

            setNewScheduleData(prevState => (
                {
                    ...prevState, 
                    borrowDate: "",
                    startTime: "",
                    endTime: "",
                    borrowDetail: ""
                }
            ))
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
        setNewScheduleData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <div>
            <h1 className="mb-3">New Schedule</h1>
            <form onSubmit={handleRequest} className="text-sky-500 text-xl grid grid-cols-1 gap-3">
                <input
                    type="text"
                    placeholder="Borrow Detail"
                    name="borrowDetail"
                    onChange={handleChange}
                    value={newScheduleData.borrowDetail}
                    className="p-1 rounded-lg flex"
                />
                <div className="flex justify-evenly">
                    <div className="flex items-center mr-3">
                        <h1 className="text-zinc-50 mr-2">Date</h1>
                        <input
                            type="date"
                            placeholder="Borrow Date"
                            name="borrowDate"
                            onChange={handleChange}
                            value={newScheduleData.borrowDate}
                            className="p-1 rounded-lg"
                        />
                    </div>
                    <div className="flex items-center mr-3">
                        <h1 className="text-zinc-50 mr-2">Start</h1>
                        <input
                            type="time"
                            step={1}
                            placeholder="Start Time"
                            name="startTime"
                            onChange={handleChange}
                            value={newScheduleData.startTime}
                            className="p-1 rounded-lg"
                        />
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-zinc-50 mr-2">End</h1>
                        <input
                            type="time"
                            step={1}
                            placeholder="End Time"
                            name="endTime"
                            onChange={handleChange}
                            value={newScheduleData.endTime}
                            className="p-1 rounded-lg"
                        />
                    </div>
                </div>
                {/* <div className="grid grid-cols-3 gap-2">
                    <h1 className="text-zinc-50 mr-2 flex items-center justify-right">Date</h1>
                    <input
                        type="date"
                        placeholder="Borrow Date"
                        name="borrowDate"
                        onChange={handleChange}
                        value={newScheduleData.borrowDate}
                        className="p-1 rounded-lg col-span-2"
                    />
                    <h1 className="text-zinc-50 mr-2 flex items-center">Start</h1>
                    <input
                        type="time"
                        step={1}
                        placeholder="Start Time"
                        name="startTime"
                        onChange={handleChange}
                        value={newScheduleData.startTime}
                        className="p-1 rounded-lg col-span-2"
                    />
                    <h1 className="text-zinc-50 mr-2 flex items-center">End</h1>
                    <input
                        type="time"
                        step={1}
                        placeholder="End Time"
                        name="endTime"
                        onChange={handleChange}
                        value={newScheduleData.endTime}
                        className="p-1 rounded-lg col-span-2"
                    />
                </div> */}
                <button className="text-2xl text-zinc-50 bg-sky-500 px-5 py-1 rounded-lg hover:text-sky-500 hover:bg-zinc-50 transition-all ease-in duration-75">Create Schedule</button>
            </form>
        </div>
    )
}