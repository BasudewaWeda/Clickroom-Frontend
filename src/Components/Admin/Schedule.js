import { useState } from "react"

export default function Schedule(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [scheduleUpdateData, setScheduleUpdateData] = useState({
        borrowDate: props.scheduleData.borrowDate,
        startTime: props.scheduleData.startTime,
        endTime: props.scheduleData.endTime,
        borrowDetail: props.scheduleData.borrowDetail,
        room: {
            id: props.roomDetails.id,
            roomCapacity: props.roomDetails.roomCapacity,
            roomLocation: props.roomDetails.roomLocation,
            roomName: props.roomDetails.roomName
        }
    })

    function handleChange(event) {
        const {name, value} = event.target
        setScheduleUpdateData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function toggleEditing() {
        setIsEditing(prevState => !prevState)
        setScheduleUpdateData(prevState => ({...prevState, borrowDate: props.scheduleData.borrowDate, startTime: props.scheduleData.startTime, endTime: props.scheduleData.endTime, borrowDetail: props.scheduleData.borrowDetail}))
    }

    async function deleteButtonClicked() {
        if(window.confirm("Are you sure you want to delete schedule?")) {
            try {
                let response = await fetch(`http://localhost:8080/api/v1/schedule/admin/${props.scheduleData.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '.concat(props.userManager.token)
                    },
                })
                if(!response.ok) {
                    alert("Something went wrong")
                    return
                }
                alert("Schedule successfully deleted!")
                props.modifyScheduleFunc(prevState => prevState.filter(prevState => prevState.id !== props.scheduleData.id))
            }
            catch (error) {
                alert(error)
            }
        }
    }

    async function updateSchedule(event) {
        event.preventDefault()
        if(scheduleUpdateData.borrowDate === '' || scheduleUpdateData.borrowDetail === '' || scheduleUpdateData.startTime === '' || scheduleUpdateData.endTime ==='') {
            alert("Please fill all fields")
            return
        }

        if(scheduleUpdateData.startTime > scheduleUpdateData.endTime) {
            alert("Start time cannot be later than end time")
            return
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/schedule/admin/${props.scheduleData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(scheduleUpdateData)
            })

            if(response.status === 400) {
                alert("Updated schedule collides with another schedule")
                return
            }

            if(!response.ok) {
                alert("Something went wrong")
                return
            }

            alert("Schedule successfully updated!")
            toggleEditing()
            props.modifyScheduleFunc(prevState => prevState.map(state => state.id !== props.scheduleData.id ? state : {...state, borrowDate: scheduleUpdateData.borrowDate, startTime: scheduleUpdateData.startTime, endTime: scheduleUpdateData.endTime, borrowDetail: scheduleUpdateData.borrowDetail}))
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <>
            {
                isEditing ? 
                    <form onSubmit={updateSchedule} className="grid grid-cols-12 gap-2">
                        <div className="col-span-10 bg-sky-500 p-2 rounded-lg mb-3 flex items-center justify-between">
                            <div className="grid grid-cols-1 gap-1 text-sky-500">
                                <input
                                    type="text"
                                    placeholder="Borrow Details"
                                    name="borrowDetail"
                                    onChange={handleChange}
                                    value={scheduleUpdateData.borrowDetail}
                                    className="text-2xl px-1 rounded-lg"
                                />
                                <div className="flex justify-between text-xl">
                                    <div className="flex justify-evenly mr-2">
                                        <h1 className="text-zinc-50 mr-1">Date</h1>
                                        <input
                                            type="date"
                                            placeholder="Borrow Date"
                                            name="borrowDate"
                                            onChange={handleChange}
                                            value={scheduleUpdateData.borrowDate}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-evenly mr-2">
                                        <h1 className="text-zinc-50 mr-1">Start</h1>
                                        <input
                                            type="time"
                                            step={1}
                                            placeholder="Start Time"
                                            name="startTime"
                                            onChange={handleChange}
                                            value={scheduleUpdateData.startTime}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-evenly">
                                        <h1 className="text-zinc-50 mr-1">End</h1>
                                        <input
                                            type="time"
                                            step={1}
                                            placeholder="End Time"
                                            name="endTime"
                                            onChange={handleChange}
                                            value={scheduleUpdateData.endTime}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="font-normal text-xl flex flex-col items-center">
                                <div className="grid grid-cols-3">
                                    <h1>Lendee</h1>
                                    <h1> : </h1>
                                    <h1>{props.scheduleData.lendee}</h1>
                                </div>
                                <div className="grid grid-cols-3">
                                    <h1>Lender</h1>
                                    <h1> : </h1>
                                    <h1>{props.scheduleData.lender}</h1>
                                </div>
                            </div>
                        </div>
                        <button className="text-xl bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">V</button>
                        <button 
                            type="button"
                            onClick={toggleEditing}
                            className="text-xl bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75"
                        >
                            X
                        </button>
                    </form>
                :
                    <div className="grid grid-cols-12 gap-2">
                        <div onClick={toggleEditing} className="col-span-11 bg-sky-500 p-2 rounded-lg mb-3 flex items-center justify-between hover:bg-zinc-50 hover:text-sky-500 hover:cursor-pointer transition-all ease-in duration-75">
                            <div>
                                <h1 className="text-2xl text-left">{props.scheduleData.borrowDetail}</h1>
                                <h1 className="text-xl font-normal text-left">{props.scheduleData.borrowDate} | {props.scheduleData.startTime} - {props.scheduleData.endTime}</h1>
                            </div>
                            <div className="font-normal text-xl flex flex-col items-center">
                                <div className="grid grid-cols-3">
                                    <h1>Lendee</h1>
                                    <h1> : </h1>
                                    <h1>{props.scheduleData.lendee}</h1>
                                </div>
                                <div className="grid grid-cols-3">
                                    <h1>Lender</h1>
                                    <h1> : </h1>
                                    <h1>{props.scheduleData.lender}</h1>
                                </div>
                            </div>
                        </div>
                        <button onClick={deleteButtonClicked} className="text-xl bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">X</button>
                    </div>
            }
        </>
    )
}