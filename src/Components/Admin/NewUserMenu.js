import { useState } from "react"

export default function Home(props) {
    const [newUserData, setNewUserData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: ''
    })

    function handleChange(event) {
        const {name, value} = event.target
        setNewUserData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    async function handleRequest(event) {
        event.preventDefault()

        try {
            if(newUserData.username === '' || newUserData.password === '' || newUserData.passwordConfirm === '' || newUserData.email === '') {
                alert("Fill all fields!")
                return
            }

            if(newUserData.password !== newUserData.passwordConfirm) {
                alert('Password and Confirm Password must Match')
                return
            }

            let response = await fetch('http://localhost:8080/api/v1/auth/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                },
                body: JSON.stringify(newUserData)
            })

            if(!response.ok) {
                alert("Something went wrong")
                return
            }

            alert("New User successfully created!")
            setNewUserData({
                username: '',
                password: '',
                passwordConfirm: '',
                email: ''
            })
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <div className="p-5">
            <form className="p-5 bg-sky-500 flex flex-col items-center rounded-lg" onSubmit={handleRequest}>
                <h1 className="text-4xl text-zinc-50 font-bold p-5">Create New User</h1>
                <div className="grid grid-cols-2 text-3xl mb-5">
                    <h1 className="p-2 text-zinc-50 font-bold">Username</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={newUserData.username}
                        className="p-2 text-sky-500 font-bold rounded-lg "
                    />
                </div>
                <div className="grid grid-cols-2 text-3xl mb-5">
                    <h1 className="p-2 text-zinc-50 font-bold">Password</h1>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={newUserData.password}
                        className="p-2 text-sky-500 font-bold rounded-lg "
                    />
                </div>
                <div className="grid grid-cols-2 text-3xl mb-5">
                    <h1 className="p-2 text-zinc-50 font-bold">Confirm Password</h1>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        value={newUserData.passwordConfirm}
                        className="p-2 text-sky-500 font-bold rounded-lg "
                    />
                </div>
                <div className="grid grid-cols-2 text-3xl mb-5">
                    <h1 className="p-2 text-zinc-50 font-bold">Email</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={newUserData.email}
                        className="p-2 text-sky-500 font-bold rounded-lg "
                    />
                </div>
                <div className="grid grid-cols-2 place-items-end">
                    <button className="col-start-2 font-bold text-3xl px-5 py-3 text-sky-500 bg-zinc-50 rounded-lg hover:text-zinc-50 hover:bg-sky-500 transition-all ease-in duration-75">Create User</button>
                </div>
            </form>
        </div>
    )
}