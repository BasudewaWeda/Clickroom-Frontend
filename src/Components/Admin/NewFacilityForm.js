import { useState } from "react"
import Swal from "sweetalert2"

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

        if(!(/^\d+$/.test(facilityData.facilityAmount))) {
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
            let response = await fetch('http://localhost:8080/api/v1/facility/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(facilityData)
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
                title: "Facility successfully created!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
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