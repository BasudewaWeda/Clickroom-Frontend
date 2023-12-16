import { useState } from "react"
import Login from "./Components/Login"
import MainContainer from "./Components/MainContainer"
import HomeContainer from "./Components/Home/HomeContainer"

export default function App() {
    const [screenIndex, setScreenIndex] = useState(0)
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
            {
                screenIndex === 0 ? 
                    <HomeContainer modifyScreenIndexFunc={setScreenIndex}/> 
                : 
                    (!userManager.loggedIn && <Login loginFunc={logIn} modifyScreenIndexFunc={setScreenIndex}/>) || 
                    (userManager.loggedIn && <MainContainer userManager={userManager} modifyUserManager={setUserManager}/>)
            }
        </>
    )
}