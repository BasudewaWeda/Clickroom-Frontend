import { useState } from "react"

export default function NewFacilityForm(props) {
    const [facilityData, setFacilityData] = useState({
        facilityName: "",
        facilityAmount: "",
        room: {
            id: props.roomData.id,
            roomCapacity: props.roomData.roomCapacity,
            roomLocation: props.roomData.roomLocation,
            roomName: props.roomData.roomName
        }
    })

    async function handleRequest(event) {
        event.preventDefault()
        if(facilityData.facilityName === '' || facilityData.facilityAmount === '') {
            alert("Fill all fields!")
            return
        }

        if(!(/^\d+$/.test(facilityData.facilityAmount))) {
            alert("Amount must be a number")
            return
        }

        try {
            let response = await fetch('http://localhost:8080/api/v1/facility/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(facilityData)
            })

            if(!response.ok) {
                alert("Something went wrong")
                return
            }

            alert("Facility successfully created!")
            let data = await response.json()
            let newFacility = {
                id: data.split("/")[4],
                facilityName: facilityData.facilityName,
                facilityAmount: facilityData.facilityAmount
            }

            props.modifyFacilityFunc(prevState => (
                [...prevState, newFacility]
            ))

            setFacilityData(prevState => (
                {
                    ...prevState, 
                    facilityName:'', 
                    facilityAmount:''
                }
            ))
        }
        catch (error) {
            alert(error)
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFacilityData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    
    return (
        <div>
            <h1 className="mb-3 text-center">New Facility</h1>
            <form onSubmit={handleRequest} className="text-xl grid grid-cols-1 text-sky-500">
                <input 
                    type="text"
                    placeholder="Name"
                    name="facilityName"
                    onChange={handleChange}
                    value={facilityData.facilityName}
                    className="mb-3 p-1 rounded-lg"
                />
                <input 
                    type="text"
                    placeholder="Amount"
                    name="facilityAmount"
                    onChange={handleChange}
                    value={facilityData.facilityAmount}
                    className="mb-3 p-1 rounded-lg"
                />
                <button className="text-2xl text-zinc-50 bg-sky-500 px-5 py-1 rounded-lg hover:text-sky-500 hover:bg-zinc-50 transition-all ease-in duration-75">Create Facility</button>
            </form>
        </div>
    )
}