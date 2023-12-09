import { useState } from 'react';

export default function Login(props) {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    
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
        <div>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button>Login</button>
            </form>
        </div>
    )
}