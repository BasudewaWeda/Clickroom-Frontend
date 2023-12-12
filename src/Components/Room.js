export default function Room(props) {
    function handleClick() {
        props.setRoomDetails(props.roomData)
        props.toggleScreenFunc()
    }

    return (
        <div className="group p-5 bg-sky-500 text-zinc-50 rounded-lg hover:cursor-pointer hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75" onClick={handleClick}>
            <h1 className="font-bold text-5xl mb-3">{props.roomData.roomName}</h1>
            <div className='flex items-center'>
                <svg className="mr-1 stroke-zinc-50 group-hover:stroke-sky-500 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24000000000000005"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                    </g>
                </svg>
                <h3 className="text-xl">{props.roomData.roomLocation}</h3>
            </div>
            <div className='flex items-center'>
                <svg className="mr-1 stroke-zinc-50 group-hover:stroke-sky-500 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00024000000000000003">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24000000000000005"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C10.93 12 12.5 10.43 12.5 8.5C12.5 6.57 10.93 5 9 5C7.07 5 5.5 6.57 5.5 8.5C5.5 10.43 7.07 12 9 12ZM2 17.25C2 14.92 6.66 13.75 9 13.75C11.34 13.75 16 14.92 16 17.25V19H2V17.25ZM9 15.75C7.21 15.75 5.18 16.42 4.34 17H13.66C12.82 16.42 10.79 15.75 9 15.75ZM10.5 8.5C10.5 7.67 9.83 7 9 7C8.17 7 7.5 7.67 7.5 8.5C7.5 9.33 8.17 10 9 10C9.83 10 10.5 9.33 10.5 8.5ZM16.04 13.81C17.2 14.65 18 15.77 18 17.25V19H22V17.25C22 15.23 18.5 14.08 16.04 13.81ZM18.5 8.5C18.5 10.43 16.93 12 15 12C14.46 12 13.96 11.87 13.5 11.65C14.13 10.76 14.5 9.67 14.5 8.5C14.5 7.33 14.13 6.24 13.5 5.35C13.96 5.13 14.46 5 15 5C16.93 5 18.5 6.57 18.5 8.5Z" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> 
                    </g>
                </svg>
                <h3 className="text-xl">{props.roomData.roomCapacity}</h3>
            </div>
        </div>
    )
}