import MyScheduleInRoomDetails from "./MyScheduleInRoomDetails"

export default function MyScheduleInRoomDetailsContainer(props) {
    let ownedSchedules = props.schedules.filter(schedule => schedule.lendee === props.userManager.username)
    let scheduleItems = ownedSchedules.map(schedule => <MyScheduleInRoomDetails roomDetails={props.roomDetails} scheduleData={schedule} key={schedule.id} userManager={props.userManager} modifyScheduleFunc={props.modifyScheduleFunc}/>)
    
    return (
        <div className="col-span-3 text-center bg-sky-700 rounded-lg">
            <h1 className="pb-5">My Schedule</h1>
            <div className="overflow-y-auto h-48">
                <div>
                    {scheduleItems.length === 0 ?
                        <div className="text-xl font-normal bg-sky-500 p-2 mb-3 rounded-lg">
                            <h1>You don't have any schedule in this room</h1>
                        </div>
                    :
                        scheduleItems
                    }
                </div>
            </div>
        </div>
    )
}