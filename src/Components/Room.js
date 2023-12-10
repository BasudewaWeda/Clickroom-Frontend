export default function Room(props) {
    function handleClick() {
        props.setRoomDetails(props.roomData)
        props.toggleScreenFunc()
    }

    return (
        <div className="p-5 bg-sky-500 text-zinc-50 rounded-lg hover:cursor-pointer hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75" onClick={handleClick}>
            <h1 className="font-bold text-5xl mb-3">{props.roomData.roomName}</h1>
            <h3 className="text-xl">Location : {props.roomData.roomLocation}</h3>
            <h3 className="text-xl">Capacity : {props.roomData.roomCapacity}</h3>
        </div>
    )
}