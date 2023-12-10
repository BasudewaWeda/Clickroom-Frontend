import { useEffect, useState } from "react"
import Request from "./Request"

export default function RequestContainer(props) {
    const [requestData, setRequestData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const URI = props.userManager.role === 'ADMIN' ? 'http://localhost:8080/api/v1/request/admin' : 'http://localhost:8080/api/v1/request'
            fetch(URI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                }
            })
            .then(response => {
                if(response.status === 404) return null
                if(!response.ok) throw new Error('Something went wrong')
                return response.json()
            })
            .then(data => {if(data !== null) {
                setRequestData(data.requestList)
                setIsLoading(false) 
            }})
        }
        catch (error) {
            alert(error)
            setIsLoading(false)
        }
    }, [])
    
    return (
        <div className="p-5 grid grid-cols-1 gap-2">
            {
                requestData.length === 0 ?
                <div className="flex justify-center p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
                    <h1>You have no request</h1> 
                </div>
                :
                    requestData.map(request => <Request requestData={request} modifyRequestFunc={setRequestData} key={request.id} userManager={props.userManager}/>)  
            }
        </div>
    )
}