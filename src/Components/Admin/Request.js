export default function Request(props) {

    async function acceptRequest() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/admin/${props.requestData.id}?status=accept`, {
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

    let pendingStyle = props.requestData.requestStatus === 'PENDING' ? 
        "col-span-10 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg"
        :
        "col-span-12 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg"

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className={pendingStyle}>
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
            {props.requestData.requestStatus === 'PENDING' && <button onClick={acceptRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">ACC</button>}
            {props.requestData.requestStatus === 'PENDING' && <button onClick={declineRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">DEC</button>}
        </div>
    )
}