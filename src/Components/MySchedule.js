export default function MySchedule(props) {
    async function deleteSchedule() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/schedule/${props.scheduleData.id}`, {
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
            props.modifyScheduleFunc(prevState => prevState.filter(state => state.id !== props.scheduleData.id))
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-11 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
            <div className="text-left">
                <h1 className="text-2xl">{props.scheduleData.borrowDetail}</h1>
                <h1 className="text-xl font-normal">{props.scheduleData.borrowDate} | {props.scheduleData.startTime} - {props.scheduleData.endTime} | {props.scheduleData.roomName}</h1>
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
            <button onClick={deleteSchedule} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">X</button>
        </div>
    )
}