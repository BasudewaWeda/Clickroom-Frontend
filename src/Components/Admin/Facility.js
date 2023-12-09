import { useState } from "react"

export default function Facility(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [facilityUpdateData, setFacilityUpdateData] = useState({
        facilityName: props.facilityData.facilityName,
        facilityAmount: props.facilityData.facilityAmount,
        room: {
            id: props.roomDetails.id,
            roomCapacity: props.roomDetails.roomCapacity,
            roomLocation: props.roomDetails.roomLocation,
            roomName: props.roomDetails.roomName
        }
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFacilityUpdateData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function toggleEditing() {
        setIsEditing(prevState => !prevState)
        setFacilityUpdateData(prevState => ({...prevState, facilityName: props.facilityData.facilityName, facilityAmount: props.facilityData.facilityAmount}))
    }

    async function deleteButtonClicked() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/facility/admin/${props.facilityData.id}`, {
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
            alert("Facility successfully deleted!")
            props.modifyFacilityFunc(prevState => prevState.filter(prevState => prevState.id !== props.facilityData.id))
        }
        catch (error) {
            alert(error)
        }
    }

    async function updateFacility(event) {
        event.preventDefault()
        if(facilityUpdateData.facilityAmount === '' || facilityUpdateData.facilityName === '') {
            alert('Please fill all fields')
            return
        }

        if(!(/^\d+$/.test(facilityUpdateData.facilityAmount))) {
            alert("Amount must be a number")
            return
        }

        try {
            let response = await fetch(`http://localhost:8080/api/v1/facility/admin/${props.facilityData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(facilityUpdateData)
            })
            if(!response.ok) {
                alert("Something went wrong")
                return
            }
            alert("Facility successfully updated!")
            toggleEditing()
            props.modifyFacilityFunc(prevState => prevState.map(state => state.id !== props.facilityData.id ? state : {...state, facilityName: facilityUpdateData.facilityName, facilityAmount: facilityUpdateData.facilityAmount}))
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <>
            {
                isEditing ? 
                    <form onSubmit={updateFacility} className="grid grid-cols-8 gap-2 text-xl font-normal">
                        <div className="col-span-6 grid grid-cols-3 bg-sky-500 p-2 mb-3 rounded-lg text-sky-500">
                            <input
                                type="text"
                                placeholder="Name"
                                name="facilityName"
                                onChange={handleChange}
                                value={facilityUpdateData.facilityName}
                                className="px-1 rounded-lg"
                            />
                            <h1 className="text-zinc-50"> : </h1>
                            <input
                                type="text"
                                placeholder="Amount"
                                name="facilityAmount"
                                onChange={handleChange}
                                value={facilityUpdateData.facilityAmount}
                                className="px-1 rounded-lg"
                            />
                        </div>
                        <button className="bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">V</button>
                        <button
                            type="button"
                            onClick={toggleEditing}
                            className="bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75"
                        >
                            X
                        </button>
                    </form>
                :
                    <div onClick={toggleEditing} className="grid grid-cols-8 gap-2 text-xl font-normal">
                        <div className="col-span-7 grid grid-cols-3 bg-sky-500 p-2 mb-3 rounded-lg hover:bg-zinc-50 hover:text-sky-500 hover:cursor-pointer transition-all ease-in duration-75">
                            <h1>{props.facilityData.facilityName}</h1>
                            <h1> : </h1>
                            <h1>{props.facilityData.facilityAmount}</h1>
                        </div>
                        <button onClick={deleteButtonClicked} className="bg-sky-500 p-2 mb-3 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">X</button>
                    </div>
            }
        </>
    )
}