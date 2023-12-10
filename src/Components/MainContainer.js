import { useState } from "react"

import RoomContainer from "./RoomContainer"
import NewUserMenu from "./Admin/NewUserMenu"
import RequestContainer from "./RequestContainer"
import MyScheduleContainer from "./MyScheduleContainer"

import clickroomLogo from "../Images/clickroomlogo.png"
import usericon from "../Images/usericon.png"

export default function AdminContainer(props) {
    const [stateManager, setStateManager] = useState(0)

    let selectedButtonStyle = "p-5 text-xl font-bold bg-sky-700 text-sky-500 transition-all ease-in duration-75"
    let nonSelectedButtonStyle = "p-5 text-xl font-normal text-zinc-50 hover:text-sky-500 hover:bg-sky-700 transition-all ease-in duration-75"

    function logOut() {
        props.modifyUserManager({
            token: "",
            username: "",
            role: "",
            loggedIn: false
        })
    }

    return (
        <div className="bg-sky-700">
            <div className="p-2 flex text-2xl font-bold text-zinc-50 bg-sky-500 items-center justify-between fixed top-0 right-0 left-0">
                <div className="flex items-center ml-5">
                    <img src={clickroomLogo} className="w-14 h-14 bg-zinc-50 rounded-full mr-3"></img>
                    <h1>Click Room</h1>
                </div>
                <div className="flex items-center mr-5">
                    <h1 className="text-xl mr-3">{props.userManager.username}</h1>
                    <img src={usericon} className="w-14 h-14 bg-sky-700 rounded-full"></img>
                </div>
            </div>
            <div className="flex pt-16">
                <div className="bg-sky-500 flex flex-col h-[93vh] justify-between">
                    {
                        props.userManager.role === 'ADMIN' ? 
                            <div className="grid grid-cols-1">
                                <button className={stateManager === 0 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(0)}>Rooms</button>
                                <button className={stateManager === 1 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(1)}>Requests</button>
                                <button className={stateManager === 2 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(2)}>My Schedules</button>
                                <button className={stateManager === 3 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(3)}>Make User Account</button>
                            </div>
                        :
                            <div className="grid grid-cols-1">
                                <button className={stateManager === 0 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(0)}>Rooms</button>
                                <button className={stateManager === 1 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(1)}>My Requests</button>
                                <button className={stateManager === 2 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(2)}>My Schedules</button>
                            </div>
                    }
                    <button onClick={logOut} className={nonSelectedButtonStyle}>Log Out</button>
                </div>
                <div className="flex-1 h-[93vh] bg-sky-700 overflow-y-auto">
                    {
                        (stateManager === 0 && <RoomContainer userManager={props.userManager}/>) || 
                        (stateManager === 1 && <RequestContainer userManager={props.userManager}/>) ||
                        (stateManager === 2 && <MyScheduleContainer userManager={props.userManager}/>) ||
                        (stateManager === 3 && props.userManager.role === 'ADMIN' && <NewUserMenu/>)
                    }
                </div>
            </div>
        </div>
    )
}