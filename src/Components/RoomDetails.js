import NewFacilityForm from "./Admin/NewFacilityForm"
import NewScheduleForm from "./Admin/NewScheduleForm"
import UpdateRoomForm from "./Admin/UpdateRoomForm"
import ScheduleContainer from "./ScheduleContainer"
import FacilityContainer from "./FacilityContainer"
import NewRequestForm from "./User/NewRequestForm"
import MyScheduleInRoomDetailsContainer from "./User/MyScheduleInRoomDetailsContainer"

import Swal from "sweetalert2"

import { useState } from 'react'

export default function RoomDetails(props) {
    const [facilities, setFacilities] = useState(props.roomDetails.facilities)
    const [schedules, setSchedules] = useState(props.roomDetails.schedules)
    const [roomData, setRoomData] = useState({
        roomName: props.roomDetails.roomName,
        roomCapacity: props.roomDetails.roomCapacity,
        roomLocation: props.roomDetails.roomLocation
    })

    function deleteButtonClicked() {
        Swal.fire({
            title: "Are you sure you want to delete this room?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            customClass: {
                popup: 'bg-sky-500',
                title: 'text-zinc-50',
                confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                cancelButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
            }
        }).then((result) => handleDelete(result))
    }

    async function handleDelete(result) {
        if(result.isConfirmed) {
            try {
                let response = await fetch(`http://localhost:8080/api/v1/room/admin/${props.roomDetails.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '.concat(props.userManager.token)
                    },
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
                props.modifyRoomFunc(prevState => prevState.filter(state => state.id !== props.roomDetails.id))
                Swal.fire({
                    title: "Room successfully deleted!",
                    icon: "success",
                    iconColor: "#fafafa",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                props.toggleScreenFunc()
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
    }

    return (
        <div>
            <div className="bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
                <div className="p-5 pb-7 bg-zinc-50 text-sky-500 flex items-center justify-between rounded-t-lg">
                    <h1 className="text-7xl">{roomData.roomName}</h1>
                    <div>
                        <div className="flex items-center">
                            <svg className="mr-1 stroke-sky-500" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24000000000000005"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                                </g>
                            </svg>
                            <h2>{roomData.roomLocation}</h2>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-1 stroke-sky-500" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00024000000000000003">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24000000000000005"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM2 17.25C2 14.92 6.66 13.75 9 13.75C11.34 13.75 16 14.92 16 17.25V19H2V17.25ZM9 15.75C7.21 15.75 5.18 16.42 4.34 17H13.66C12.82 16.42 10.79 15.75 9 15.75ZM10.5 8.5C10.5 7.67 9.83 7 9 7C8.17 7 7.5 7.67 7.5 8.5C7.5 9.33 8.17 10 9 10C9.83 10 10.5 9.33 10.5 8.5ZM16.04 13.81C17.2 14.65 18 15.77 18 17.25V19H22V17.25C22 15.23 18.5 14.08 16.04 13.81ZM18.5 8.5C18.5 10.43 16.93 12 15 12C14.46 12 13.96 11.87 13.5 11.65C14.13 10.76 14.5 9.67 14.5 8.5C14.5 7.33 14.13 6.24 13.5 5.35C13.96 5.13 14.46 5 15 5C16.93 5 18.5 6.57 18.5 8.5Z" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> 
                                </g>
                            </svg>
                            <h2>{roomData.roomCapacity}</h2>  
                        </div>
                    </div>
                </div>
                <div className="p-5 text-3xl grid grid-cols-4 gap-5">
                    <ScheduleContainer roomDetails={props.roomDetails} schedules={schedules} modifyScheduleFunc={setSchedules} userManager={props.userManager}/>
                    <FacilityContainer roomDetails={props.roomDetails} facilities={facilities} modifyFacilityFunc={setFacilities} userManager={props.userManager}/>
                    <div className="col-span-2 text-center bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                        {props.userManager.role === 'ADMIN' ? <NewScheduleForm userManager={props.userManager} roomData={props.roomDetails} modifyScheduleFunc={setSchedules}/> : 
                        <NewRequestForm userManager={props.userManager} roomData={props.roomDetails}/>}
                    </div>
                    {
                        props.userManager.role === 'ADMIN' ? 
                            <div className="bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                                <NewFacilityForm userManager={props.userManager} roomData={props.roomDetails} modifyFacilityFunc={setFacilities}/>
                            </div>
                        :
                            <div className="col-span-2 bg-sky-700 p-5 rounded-lg">
                                <MyScheduleInRoomDetailsContainer userManager={props.userManager} roomDetails={props.roomDetails} schedules={schedules} modifyScheduleFunc={setSchedules}/>
                            </div>
                    }
                    {props.userManager.role === 'ADMIN' && <div className="bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                        <UpdateRoomForm userManager={props.userManager} roomData={props.roomDetails} modifyRoomFunc={props.modifyRoomFunc} modifyRoomDataFunc={setRoomData}/>
                    </div>}
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                {props.userManager.role === 'ADMIN' && <button onClick={deleteButtonClicked} className="text-xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">Delete Room</button>}
                <button onClick={props.toggleScreenFunc} className="text-xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">Back</button>
            </div>
        </div>
    )
}