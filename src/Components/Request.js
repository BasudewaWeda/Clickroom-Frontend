import { useState } from "react"

import Swal from "sweetalert2"

export default function Request(props) {
    const [isEditing, setIsEditing] = useState(false)
    const [requestUpdateData, setRequestUpdateData] = useState({
        borrowDate: props.requestData.borrowDate,
        startTime: props.requestData.startTime,
        endTime: props.requestData.endTime,
        borrowDetail: props.requestData.borrowDetail,
        room: {
            id: props.requestData.roomId,
            roomCapacity: props.requestData.roomCapacity,
            roomLocation: props.requestData.roomLocation,
            roomName: props.requestData.roomName
        }
    })

    async function acceptRequest() {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/request/admin/${props.requestData.id}?status=accept`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
            })
            if(response.status === 400) {
                Swal.fire({
                    title: "Requested schedule collides with another schedule.",
                    icon: "warning",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                return
            }
            if(!response.ok) {
                Swal.fire({
                    title: "Something went wrong.",
                    icon: "warning",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                return
            }
            Swal.fire({
                title: "Request successfully modified!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            props.modifyRequestFunc(prevState => prevState.map(state => state.id === props.requestData.id ? {...state, requestStatus: 'ACCEPTED'} : state))
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
                title: "Request successfully modified!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            props.modifyRequestFunc(prevState => prevState.map(state => state.id === props.requestData.id ? {...state, requestStatus: 'DECLINED'} : state))
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

    function DeleteRequest() {
        Swal.fire({
            title: "Are you sure you want to delete this request?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            customClass: {
                popup: 'bg-sky-500',
                title: 'text-zinc-50',
                confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                cancelButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
            }
        }).then((result) => handleDeleteRequest(result))
    }

    async function handleDeleteRequest(result) {
        if(result.isConfirmed) {
            try {
                let response = await fetch(`http://localhost:8080/api/v1/request/${props.requestData.id}`, {
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
                    title: "Request successfully deleted!",
                    icon: "success",
                    iconColor: "#fafafa",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                props.modifyRequestFunc(prevState => prevState.filter(state => state.id !== props.requestData.id))
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

    async function updateRequest(event) {
        event.preventDefault()
        if(requestUpdateData.borrowDate === '' || requestUpdateData.borrowDetail === '' || requestUpdateData.startTime === '' || requestUpdateData.endTime === '') {
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

        if(requestUpdateData.startTime > requestUpdateData.endTime) {
            Swal.fire({
                title: "Start time cannot be later than end time.",
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
            let response = await fetch(`http://localhost:8080/api/v1/request/${props.requestData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(requestUpdateData)
            })

            if(response.status === 400) {
                Swal.fire({
                    title: "Updated request collides with another schedule.",
                    icon: "error",
                    customClass: {
                        popup: 'bg-sky-500',
                        title: 'text-zinc-50',
                        confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                    }
                })
                return
            }

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
                title: "Request successfully updated!",
                icon: "success",
                iconColor: "#fafafa",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
            toggleEditing()
            props.modifyRequestFunc(prevState => prevState.map(state => state.id !== props.requestData.id ? state : {...state, borrowDate: requestUpdateData.borrowDate, startTime: requestUpdateData.startTime, endTime: requestUpdateData.endTime, borrowDetail: requestUpdateData.borrowDetail}))
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

    function toggleEditing() {
        if(props.userManager.role === 'USER' && props.requestData.requestStatus === 'PENDING') {
            setIsEditing(prevState => !prevState)
            setRequestUpdateData(prevState => ({...prevState, borrowDate: props.requestData.borrowDate, startTime: props.requestData.startTime, endTime: props.requestData.endTime, borrowDetail: props.requestData.borrowDetail}))
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setRequestUpdateData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <>
            {
                isEditing ? 
                    <form onSubmit={updateRequest} className="grid grid-cols-12 gap-2 text-zinc-50">
                        <div className="col-span-10 bg-sky-500 p-2 rounded-lg flex items-center justify-between">
                            <div className="grid grid-cols-1 gap-1 text-sky-500 font-bold">
                                <input
                                    type="text"
                                    placeholder="Borrow Details"
                                    name="borrowDetail"
                                    onChange={handleChange}
                                    value={requestUpdateData.borrowDetail}
                                    className="text-2xl px-1 rounded-lg"
                                />
                                <div className="flex justify-between text-xl">
                                    <div className="flex justify-evenly mr-2">
                                        <h1 className="text-zinc-50 mr-1">Date</h1>
                                        <input
                                            type="date"
                                            placeholder="Borrow Date"
                                            name="borrowDate"
                                            onChange={handleChange}
                                            value={requestUpdateData.borrowDate}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-evenly mr-2">
                                        <h1 className="text-zinc-50 mr-1">Start</h1>
                                        <input
                                            type="time"
                                            step={1}
                                            placeholder="Start Time"
                                            name="startTime"
                                            onChange={handleChange}
                                            value={requestUpdateData.startTime}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-evenly">
                                        <h1 className="text-zinc-50 mr-1">End</h1>
                                        <input
                                            type="time"
                                            step={1}
                                            placeholder="End Time"
                                            name="endTime"
                                            onChange={handleChange}
                                            value={requestUpdateData.endTime}
                                            className="px-1 rounded-lg"
                                        />
                                    </div>
                                </div>
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
                        <button className="group flex justify-center items-center text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">
                            <svg className="w-8 h-8 group-hover:w-9 group-hover:h-9 fill-zinc-50 group-hover:fill-sky-500 transition-all ease-in duration-75" viewBox="0 -3 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd"> 
                                        <g id="Icon-Set" transform="translate(-516.000000, -1037.000000)"> 
                                            <path d="M545.34,1042.62 C545.34,1042.62 528.282,1060.01 528.014,1060.29 C527.216,1061.1 525.924,1061.1 525.126,1060.29 C525.126,1060.29 518.588,1053.62 518.568,1053.6 C517.832,1052.78 517.852,1051.51 518.629,1050.71 C519.426,1049.9 520.719,1049.9 521.517,1050.71 L526.569,1055.87 L542.452,1039.67 C543.249,1038.86 544.542,1038.86 545.34,1039.67 C546.137,1040.48 546.137,1041.8 545.34,1042.62 L545.34,1042.62 Z M546.783,1038.2 C545.188,1036.57 542.603,1036.57 541.008,1038.2 L526.569,1052.92 L522.96,1049.24 C521.365,1047.62 518.779,1047.62 517.185,1049.24 C515.59,1050.87 515.59,1053.51 517.185,1055.13 L523.682,1061.76 C525.277,1063.39 527.862,1063.39 529.457,1061.76 L546.783,1044.09 C548.378,1042.46 548.378,1039.82 546.783,1038.2 L546.783,1038.2 Z" id="checkmark"> </path> 
                                        </g>
                                    </g> 
                                </g>
                            </svg>
                        </button>
                        <button 
                            type="button"
                            onClick={toggleEditing}
                            className="group flex justify-center items-center text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75"
                        >
                            <svg className="w-8 h-8 group-hover:w-9 group-hover:h-9 fill-zinc-50 group-hover:fill-sky-500 transition-all ease-in duration-75" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
                    </form>
                :
                    <div className="grid grid-cols-12 gap-2">
                        <div onClick={toggleEditing} className={props.userManager.role === 'ADMIN' ?
                                props.requestData.requestStatus === 'PENDING' ? 'col-span-10 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg' : 'col-span-12 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg'
                            :
                                props.requestData.requestStatus === 'PENDING' ? 'col-span-11 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg hover:bg-zinc-50 hover:text-sky-500 hover:cursor-pointer transition-all ease-in duration-75' : 'col-span-11 text-center flex items-center justify-between p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg'
                        }>
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
                        {props.userManager.role === 'ADMIN' && props.requestData.requestStatus === 'PENDING' && <button onClick={acceptRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">ACC</button>}
                        {props.userManager.role === 'ADMIN' && props.requestData.requestStatus === 'PENDING' && <button onClick={declineRequest} className="text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">DEC</button>}
                        {props.userManager.role === 'USER' && <button onClick={DeleteRequest} className="group flex justify-center items-center text-zinc-50 text-xl bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75">
                            <svg className="w-8 h-8 group-hover:w-9 group-hover:h-9 fill-zinc-50 group-hover:fill-sky-500 transition-all ease-in duration-75" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
                        </button>}
                    </div>
            }
        </>
    )
}