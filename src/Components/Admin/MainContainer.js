import { useState } from "react"

import RoomContainer from "./RoomContainer"
import NewUserMenu from "./NewUserMenu"
import RequestContainer from "./RequestContainer"

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
        <div className="flex">
            <div className="p-2 bg-sky-500 flex flex-col h-screen justify-between">
                <div className="grid grid-cols-1">
                    <button className={stateManager === 0 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(0)}>Home</button>
                    <button className={stateManager === 1 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(1)}>Requests</button>
                    <button className={stateManager === 2 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(2)}>Make User Account</button>
                </div>
                <button onClick={logOut} className={nonSelectedButtonStyle}>Log Out</button>
            </div>
            <div className="flex-1 h-screen bg-sky-700 overflow-y-auto">
                {stateManager === 0 && <RoomContainer userManager={props.userManager}/>}
                {stateManager === 1 && <RequestContainer userManager={props.userManager}/>}
                {stateManager === 2 && <NewUserMenu/>}
            </div>
        </div>
    )
}