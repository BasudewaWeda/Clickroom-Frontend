import { useState } from "react"

export default function NewRequestForm(props) {
    const [newRequestData, setNewRequestData] = useState({
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

    function handleChange(event) {
        const {name, value} = event.target
        setNewRequestData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleRequest(event) {
        event.preventDefault()
        if(newRequestData.borrowDate === '' || newRequestData.startTime === '' || newRequestData.endTime === '' || newRequestData.borrowDetail === '') {
            alert("Please fill all fields")
            return
        }

        if(newRequestData.startTime > newRequestData.endTime) {
            alert("Start time cannot be later than end time")
            return
        }

        try {
            let response = await fetch('http://localhost:8080/api/v1/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(newRequestData)
            })

            if(response.status === 400) {
                alert("New request collides with existing schedule")
                return
            }

            if(!response.ok) {
                alert("Something went wrong")
                return
            }

            alert("Request successfully created!")

            setNewRequestData(prevState => (
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
            alert(error)
        }
    }
    
    return (
        <div>
            <h1 className="mb-3">Create Request</h1>
            <form onSubmit={handleRequest} className="text-sky-500 text-xl grid grid-cols-1 gap-3">
                <input
                    type="text"
                    placeholder="Borrow Detail"
                    name="borrowDetail"
                    onChange={handleChange}
                    value={newRequestData.borrowDetail}
                    className="p-1 rounded-lg"
                />
                <div className="flex justify-evenly">
                    <div className="flex items-center mr-3">
                        <h1 className="text-zinc-50 mr-2">Date</h1>
                        <input
                            type="date"
                            placeholder="Borrow Date"
                            name="borrowDate"
                            onChange={handleChange}
                            value={newRequestData.borrowDate}
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
                            value={newRequestData.startTime}
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
                            value={newRequestData.endTime}
                            className="p-1 rounded-lg"
                        />
                    </div>
                </div>
                <button className="text-2xl text-zinc-50 bg-sky-500 px-5 py-1 rounded-lg hover:text-sky-500 hover:bg-zinc-50 transition-all ease-in duration-75">Create Request</button>
            </form>
        </div>
    )
}