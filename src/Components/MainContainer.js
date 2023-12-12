import { useState } from "react"

import RoomContainer from "./RoomContainer"
import NewUserMenu from "./Admin/NewUserMenu"
import RequestContainer from "./RequestContainer"
import MyScheduleContainer from "./MyScheduleContainer"

import clickroomLogo from "../Images/clickroomlogo.png"
import usericon from "../Images/usericon.png"

export default function AdminContainer(props) {
    const [stateManager, setStateManager] = useState(0)

    let selectedButtonStyle = "group flex items-center fill-sky-500 p-5 text-xl font-bold bg-sky-700 text-sky-500 transition-all ease-in duration-75"
    let nonSelectedButtonStyle = "group flex items-center fill-zinc-50 p-5 text-xl font-normal text-zinc-50 hover:text-sky-500 hover:bg-sky-700 transition-all ease-in duration-75"

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
            <div className="p-2 flex text-2xl font-bold text-zinc-50 bg-sky-500 items-center justify-between fixed top-0 right-0 left-0 border-b-2 border-zinc-50">
                <div className="flex items-center ml-5">
                    <img src={clickroomLogo} className="w-12 h-12 bg-zinc-50 rounded-full mr-3" alt="Click Room Logo"></img>
                    <h1>Click Room</h1>
                </div>
                <div className="flex items-center mr-5">
                    <h1 className="text-xl mr-3">{props.userManager.username}</h1>
                    <img src={usericon} className="w-12 h-12 bg-sky-700 rounded-full" alt="User Icon"></img>
                </div>
            </div>
            <div className="flex pt-16">
                <div className="bg-sky-500 flex flex-col h-[93vh] justify-between">
                    {
                        props.userManager.role === 'ADMIN' ? 
                            <div className="grid grid-cols-1">
                                <button className={stateManager === 0 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(0)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 group-hover:mr-2 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 512.00 512.00" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00512">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="34.816"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path> 
                                        </g>
                                    </svg>
                                    Rooms
                                </button>
                                <button className={stateManager === 1 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(1)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 group-hover:mr-2 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 16.00 16.00" id="request-16px" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fafafaCCCCCC" stroke-width="1.888"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path id="Path_49" data-name="Path 49" d="M30.5,16a.489.489,0,0,1-.191-.038A.5.5,0,0,1,30,15.5V13h-.5A2.5,2.5,0,0,1,27,10.5v-8A2.5,2.5,0,0,1,29.5,0h11A2.5,2.5,0,0,1,43,2.5v8A2.5,2.5,0,0,1,40.5,13H33.707l-2.853,2.854A.5.5,0,0,1,30.5,16Zm-1-15A1.5,1.5,0,0,0,28,2.5v8A1.5,1.5,0,0,0,29.5,12h1a.5.5,0,0,1,.5.5v1.793l2.146-2.147A.5.5,0,0,1,33.5,12h7A1.5,1.5,0,0,0,42,10.5v-8A1.5,1.5,0,0,0,40.5,1ZM36,9a1,1,0,1,0-1,1A1,1,0,0,0,36,9Zm1-4a2,2,0,0,0-4,0,.5.5,0,0,0,1,0,1,1,0,1,1,1,1,.5.5,0,0,0,0,1A2,2,0,0,0,37,5Z" transform="translate(-27)"></path> 
                                        </g>
                                    </svg>    
                                    Requests
                                </button>
                                <button className={stateManager === 2 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(2)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 group-hover:mr-2 transition-all ease-in duration-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.00 512.00" width="32px" height="32px" stroke-width="0.00512">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fafafaCCCCCC" stroke-width="5.12"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <g> 
                                                <rect x="119.256" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="341.863" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="119.256" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="193.46" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="341.863" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="193.46" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <path class="st0" d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025 c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424 c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246 c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4 C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144 c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z"></path> 
                                                <path class="st0" d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459 c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z"></path> 
                                                <path class="st0" d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16 c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z"></path> 
                                            </g> 
                                        </g>
                                    </svg>
                                    My Schedules
                                </button>
                                <button className={stateManager === 3 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(3)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 group-hover:mr-2 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM14 8C14 6.9 13.1 6 12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8ZM18 18C17.8 17.29 14.7 16 12 16C9.31 16 6.23 17.28 6 18H18ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V20H4V18Z"></path> 
                                        </g>
                                    </svg>
                                    Create User
                                </button>
                            </div>
                        :
                            <div className="grid grid-cols-1">
                                <button className={stateManager === 0 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(0)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 512.00 512.00" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00512">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="34.816"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path> 
                                        </g>
                                    </svg>
                                    Rooms
                                </button>
                                <button className={stateManager === 1 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(1)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 16.00 16.00" id="request-16px" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00016">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fafafaCCCCCC" stroke-width="1.888"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <path id="Path_49" data-name="Path 49" d="M30.5,16a.489.489,0,0,1-.191-.038A.5.5,0,0,1,30,15.5V13h-.5A2.5,2.5,0,0,1,27,10.5v-8A2.5,2.5,0,0,1,29.5,0h11A2.5,2.5,0,0,1,43,2.5v8A2.5,2.5,0,0,1,40.5,13H33.707l-2.853,2.854A.5.5,0,0,1,30.5,16Zm-1-15A1.5,1.5,0,0,0,28,2.5v8A1.5,1.5,0,0,0,29.5,12h1a.5.5,0,0,1,.5.5v1.793l2.146-2.147A.5.5,0,0,1,33.5,12h7A1.5,1.5,0,0,0,42,10.5v-8A1.5,1.5,0,0,0,40.5,1ZM36,9a1,1,0,1,0-1,1A1,1,0,0,0,36,9Zm1-4a2,2,0,0,0-4,0,.5.5,0,0,0,1,0,1,1,0,1,1,1,1,.5.5,0,0,0,0,1A2,2,0,0,0,37,5Z" transform="translate(-27)"></path> 
                                        </g>
                                    </svg> 
                                    My Requests
                                </button>
                                <button className={stateManager === 2 ? selectedButtonStyle : nonSelectedButtonStyle} onClick={() => setStateManager(2)}>
                                    <svg className="mr-1 group-hover:fill-sky-500 transition-all ease-in duration-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.00 512.00" width="32px" height="32px" stroke-width="0.00512">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fafafaCCCCCC" stroke-width="5.12"></g>
                                        <g id="SVGRepo_iconCarrier"> 
                                            <g> 
                                                <rect x="119.256" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="341.863" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="222.607" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="119.256" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="193.46" y="302.11" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="341.863" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="267.662" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <rect x="193.46" y="381.612" class="st0" width="50.881" height="50.885"></rect> 
                                                <path class="st0" d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025 c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424 c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246 c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4 C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144 c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z"></path> 
                                                <path class="st0" d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459 c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z"></path> 
                                                <path class="st0" d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16 c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z"></path> 
                                            </g> 
                                        </g>
                                    </svg>    
                                    My Schedules
                                </button>
                            </div>
                    }
                    <button onClick={logOut} className={nonSelectedButtonStyle}>
                    <svg className="mr-1 group-hover:fill-sky-500 group-hover:mr-2 transition-all ease-in duration-75" width="32px" height="32px" viewBox="0 0 512.00 512.00" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00512">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#fafafaCCCCCC" stroke-width="36.864"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M228.576 26.213v207.32h54.848V26.214h-54.848zm-28.518 45.744C108.44 96.58 41 180.215 41 279.605c0 118.74 96.258 215 215 215 118.74 0 215-96.26 215-215 0-99.39-67.44-183.025-159.057-207.647v50.47c64.6 22.994 110.85 84.684 110.85 157.177 0 92.117-74.676 166.794-166.793 166.794-92.118 0-166.794-74.678-166.794-166.795 0-72.494 46.25-134.183 110.852-157.178v-50.47z"></path>
                        </g>
                        </svg>
                        Log Out
                    </button>
                </div>
                <div className="flex-1 h-[93vh] bg-sky-700 overflow-y-auto">
                    {
                        (stateManager === 0 && <RoomContainer userManager={props.userManager}/>) || 
                        (stateManager === 1 && <RequestContainer userManager={props.userManager}/>) ||
                        (stateManager === 2 && <MyScheduleContainer userManager={props.userManager}/>) ||
                        (stateManager === 3 && props.userManager.role === 'ADMIN' && <NewUserMenu userManager={props.userManager}/>)
                    }
                </div>
            </div>
        </div>
    )
}