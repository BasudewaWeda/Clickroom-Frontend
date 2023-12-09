import NewFacilityForm from "./NewFacilityForm"
import NewScheduleForm from "./NewScheduleForm"
import UpdateRoomForm from "./UpdateRoomForm"
import ScheduleContainer from "./ScheduleContainer"
import FacilityContainer from "./FacilityContainer"

import { useState } from 'react'

export default function RoomDetails(props) {
    const [facilities, setFacilities] = useState(props.roomDetails.facilities)
    const [schedules, setSchedules] = useState(props.roomDetails.schedules)
    const [roomData, setRoomData] = useState({
        roomName: props.roomDetails.roomName,
        roomCapacity: props.roomDetails.roomCapacity,
        roomLocation: props.roomDetails.roomLocation
    })

    async function deleteButtonClicked() {
        if(window.confirm("Are you sure you want to delete this room?")) {
            try {
                let response = await fetch(`http://localhost:8080/api/v1/room/admin/${props.roomDetails.id}`, {
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
                alert("Room successfully deleted!")
                props.toggleScreenFunc()
            }
            catch (error) {
                alert(error)
            }
        }
    }

    return (
        <div>
            <div className="bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
                <div className="p-5 pb-7 bg-zinc-50 text-sky-500 flex items-center justify-between rounded-lg">
                    <h1 className="text-7xl">{roomData.roomName}</h1>
                    <div>
                        <h2>Location : {roomData.roomLocation}</h2>
                        <h2>Capacity : {roomData.roomCapacity}</h2>  
                    </div>
                </div>
                <div className="p-5 text-3xl grid grid-cols-4 gap-5">
                    <ScheduleContainer roomDetails={props.roomDetails} schedules={schedules} modifyScheduleFunc={setSchedules} userManager={props.userManager}/>
                    <FacilityContainer roomDetails={props.roomDetails} facilities={facilities} modifyFacilityFunc={setFacilities} userManager={props.userManager}/>
                    <div className="col-span-2 text-center bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                        <NewScheduleForm userManager={props.userManager} roomData={props.roomDetails} modifyScheduleFunc={setSchedules}/>
                    </div>
                    <div className="bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                        <NewFacilityForm userManager={props.userManager} roomData={props.roomDetails} modifyFacilityFunc={setFacilities}/>
                    </div>
                    <div className="bg-sky-700 p-5 rounded-lg flex items-center justify-center">
                        <UpdateRoomForm userManager={props.userManager} roomData={props.roomDetails} modifyRoomFunc={props.modifyRoomFunc} modifyRoomDataFunc={setRoomData}/>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                <button onClick={deleteButtonClicked} className="text-xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">Delete Room</button>
                <button onClick={props.toggleScreenFunc} className="text-xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">Back</button>
            </div>
        </div>
    )
}