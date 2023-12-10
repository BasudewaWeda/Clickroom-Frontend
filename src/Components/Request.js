import { useState } from "react"

export default function Request(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [requestUpdateData, setRequestUpdateData] = useState({
        borrowDate: props.requestData.borrowDate,
        startTime: props.requestData.startTime,
        endTime: props.requestData.endTime,
        borrowDetail: props.requestData.borrowDetail,
        room: {
            id: props.requestData.roomId,
            roomCapacity: props.requestData.roomCapacity,
            roomLocation: props.requestData.roomLocation,
            roomName: props.requestData.roomName
        }
    })

    async function acceptRequest() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/admin/${props.requestData.id}?status=accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
            })
            if(response.status === 400) {
                alert("Request schedule collides with another schedule")
                return
            }
            if(!response.ok) {
                alert("Something went wrong")
                return
            }
            alert("Request successfully modified!")
            props.modifyRequestFunc(prevState => prevState.map(state => state.id === props.requestData.id ? {...state, requestStatus: 'ACCEPTED'} : state))
        }
        catch (error) {
            alert(error)
        }
    }

    async function declineRequest() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/admin/${props.requestData.id}?status=decline`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
            })
            if(!response.ok) {
                alert("Something went wrong")
                return
            }
            alert("Request successfully modified!")
            props.modifyRequestFunc(prevState => prevState.map(state => state.id === props.requestData.id ? {...state, requestStatus: 'DECLINED'} : state))
        }
        catch (error) {
            alert(error)
        }
    }

    async function DeleteRequest() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/${props.requestData.id}`, {
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
            alert("Request successfully deleted!")
            props.modifyRequestFunc(prevState => prevState.filter(state => state.id !== props.requestData.id))
        }
        catch (error) {
            alert(error)
        }
    }

    async function updateRequest(event) {
        event.preventDefault()
        if(requestUpdateData.borrowDate === '' || requestUpdateData.borrowDetail === '' || requestUpdateData.startTime === '' || requestUpdateData.endTime === '') {
            alert("Plase fill all fields")
            return
        }

        if(requestUpdateData.startTime > requestUpdateData.endTime) {
            alert("Start time cannot be later than end time")
            return
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/${props.requestData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(requestUpdateData)
            })

            if(response.status === 400) {
                alert("Updated request collides with another schedule")
                return
            }

            if(!response.ok) {
                alert("Something went wrong")
                return
            }

            alert("Request successfully updated!")
            toggleEditing()
            props.modifyRequestFunc(prevState => prevState.map(state => state.id !== props.requestData.id ? state : {...state, borrowDate: requestUpdateData.borrowDate, startTime: requestUpdateData.startTime, endTime: requestUpdateData.endTime, borrowDetail: requestUpdateData.borrowDetail}))
        }
        catch (error) {
            alert(error)
        }
    }

    function toggleEditing() {
        if(props.userManager.role === 'USER' && props.requestData.requestStatus === 'PENDING') {
            setIsEditing(prevState => !prevState)
            setRequestUpdateData(prevState => ({...prevState, borrowDate: props.requestData.borrowDate, startTime: props.requestData.startTime, endTime: props.requestData.endTime, borrowDetail: props.requestData.borrowDetail}))
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setRequestUpdateData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <>
            {
                isEditing ? 
                    <form onSubmit={updateRequest} className="grid grid-cols-12 gap-2 text-zinc-50">
                        <div className="col-span-10 bg-sky-500 p-2 rounded-lg flex items-center justify-between">
                            <div className="grid grid-cols-1 gap-1 text-sky-500 font-bold">
                                <input
                                    type="text"
                                    placeholder="Borrow Details"
                                    name="borrowDetail"
                                    onChange={handleChange}
                                    value={requestUpdateData.borrowDetail}
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
                                            value={requestUpdateData.borrowDate}
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
                                            value={requestUpdateData.startTime}
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
                                            value={requestUpdateData.endTime}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="font-normal text-xl flex flex-col items-center">
                                <div className="grid grid-cols-3">
                                    <h1>Lendee</h1>
                                    <h1> : </h1>
                                    <h1>{props.requestData.lendee}</h1>
                                </div>
                                <div className="grid grid-cols-3">
                                    <h1>Status</h1>
                                    <h1> : </h1>
                                    <h1 className="font-bold">{props.requestData.requestStatus}</h1>
                                </div>
                            </div>
                        </div>
                        <button className="text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">V</button>
                        <button 
                            type="button"
                            onClick={toggleEditing}
                            className="text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75"
                        >
                            X
                        </button>
                    </form>
                :
                    <div className="grid grid-cols-12 gap-2">
                        <div onClick={toggleEditing} className={props.userManager.role === 'ADMIN' ?
                                props.requestData.requestStatus === 'PENDING' ? 'col-span-10 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg' : 'col-span-12 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg'
                            :
                                props.requestData.requestStatus === 'PENDING' ? 'col-span-11 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg hover:bg-zinc-50 hover:text-sky-500 hover:cursor-pointer transition-all ease-in duration-75' : 'col-span-11 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg'
                        }>
                            <div className="text-left">
                                <h1 className="text-2xl">{props.requestData.borrowDetail}</h1>
                                <h1 className="text-xl font-normal">{props.requestData.borrowDate} | {props.requestData.startTime} - {props.requestData.endTime} | {props.requestData.roomName}</h1>
                            </div>
                            <div className="font-normal text-xl flex flex-col items-center">
                                <div className="grid grid-cols-3">
                                    <h1>Lendee</h1>
                                    <h1> : </h1>
                                    <h1>{props.requestData.lendee}</h1>
                                </div>
                                <div className="grid grid-cols-3">
                                    <h1>Status</h1>
                                    <h1> : </h1>
                                    <h1 className="font-bold">{props.requestData.requestStatus}</h1>
                                </div>
                            </div>
                        </div>
                        {props.userManager.role === 'ADMIN' && props.requestData.requestStatus === 'PENDING' && <button onClick={acceptRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">ACC</button>}
                        {props.userManager.role === 'ADMIN' && props.requestData.requestStatus === 'PENDING' && <button onClick={declineRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">DEC</button>}
                        {props.userManager.role === 'USER' && <button onClick={DeleteRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">X</button>}
                    </div>
            }
        </>
    )
}