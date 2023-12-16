import { useState } from 'react';
import loginImage from '../Images/LoginImage.png'

export default function Login(props) {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [wrongCredentialToggle, setWrongCredentialToggle] = useState(false)
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleLogin(event) {
        event.preventDefault()
        try {
            let response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            if(response.status === 403) {
                setWrongCredentialToggle(true)
                return
            }
            if(!response.ok) {
                alert("Something went wrong")
                return
            } 
            let data = await response.json()
            props.loginFunc(data.token, data.username, data.role)
        }
        catch (error) {
            alert(error)
        }
    }
    
    return (
        <div className="bg-sky-500 min-h-screen flex items-center justify-center">
            <div className="bg-zinc-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-sky-500">Login</h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            className="p-2 mt-8 rounded-xl border text-sky-500"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                        <input
                            className="p-2 rounded-xl border w-full text-sky-500"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <button className="bg-sky-500 rounded-xl text-zinc-50 py-2 hover:scale-105 duration-75">
                            Login
                        </button>
                        {wrongCredentialToggle && <h1 className="px-1 text-sky-500">Username or password is wrong</h1>}
                    </form>
                </div>
        
                <div className="md:block hidden w-1/2">
                    <img
                        className="rounded-2xl"
                        src={loginImage}
                        alt="Login Graphic"
                    />      
                </div>
            </div>
            <button onClick={() => props.modifyScreenIndexFunc(0)} className="group text-zinc-50 p-3 absolute left-0 bottom-0 flex items-center hover:text-sky-700 transition-all ease-in duration-75">
                <svg className="stroke-zinc-50 w-8 h-8 group-hover:-translate-x-2 group-hover:stroke-sky-700 transition-all ease-in duration-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                    </g>
                </svg>
                Back to landing page
            </button>
        </div>
    )
}