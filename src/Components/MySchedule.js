import Swal from "sweetalert2"

export default function MySchedule(props) {
    async function deleteSchedule() {
        Swal.fire({
            title: "Are you sure you want to delete this schedule?",
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
                let response = await fetch(`http://localhost:8080/api/v1/schedule/${props.scheduleData.id}`, {
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
                Swal.fire({
                    title: "Schedule successfully deleted!",
                    icon: "success",
                    iconColor: "#fafafa",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                props.modifyScheduleFunc(prevState => prevState.filter(state => state.id !== props.scheduleData.id))
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
            <button onClick={deleteSchedule} className="group flex justify-center items-center text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">
                <svg className="w-8 h-8 group-hover:w-9 fill-zinc-50 group-hover:fill-sky-500 transition-all ease-in duration-75" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                            <g id="Icon-Set" transform="translate(-467.000000, -1039.000000)">
                                <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross"> </path> 
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    )
}