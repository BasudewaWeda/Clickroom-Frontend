import Schedule from "./Schedule"

export default function ScheduleContainer(props) {
    let scheduleItems = props.schedules.map(schedule => <Schedule roomDetails={props.roomDetails} scheduleData={schedule} key={schedule.id} userManager={props.userManager} modifyScheduleFunc={props.modifyScheduleFunc} modifyRoomFunc={props.modifyRoomFunc}/>)

    return (
        <div className="col-span-3 text-center bg-sky-700 p-5 rounded-lg">
            <h1 className="pb-5">Schedule</h1>
            <div className="overflow-y-auto h-60">
                <div>
                    {props.schedules.length === 0 ?
                        <div className="text-xl font-normal bg-sky-500 p-2 mb-3 rounded-lg">
                            <h1>No Schedule</h1>
                        </div>
                    :
                        scheduleItems
                    }
                </div>
            </div>
        </div>
    )
}