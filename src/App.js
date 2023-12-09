import { useState } from "react"
import Login from "./Components/Login"
import MainContainer from "./Components/Admin/MainContainer"

export default function App() {
    const [userManager, setUserManager] = useState({
        token: "",
        username: "",
        role: "",
        loggedIn: false
    })

    function logIn(token, username, role) {
        setUserManager({
            token: token,
            username: username,
            role: role,
            loggedIn: true
        })
    }
    
    return (
        <>
            {!userManager.loggedIn && <Login loginFunc={logIn}/>}
            {userManager.loggedIn && <MainContainer userManager={userManager} modifyUserManager={setUserManager}/>}
        </>
    )
}