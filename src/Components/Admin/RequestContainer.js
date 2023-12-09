import { useEffect, useState } from "react"
import Request from "./Request"

export default function RequestContainer(props) {
    const [requestData, setRequestData] = useState([])

    useEffect(() => {
        try {
            fetch('http://localhost:8080/api/v1/request/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '.concat(props.userManager.token)
                }
            })
            .then(response => {
                if(!response.ok) throw new Error('Error')
                return response.json()
            })
            .then(data => {
                setRequestData(data.requestList)
            })
        }
        catch (error) {
            alert(error)
        }
    }, [])
    
    return (
        <div className="p-5 grid grid-cols-1 gap-2">
            {requestData.map(request => <Request requestData={request} modifyRequestFunc={setRequestData} userManager={props.userManager}/>)}  
        </div>
    )
}