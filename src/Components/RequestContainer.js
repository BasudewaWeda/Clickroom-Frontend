import { useEffect, useState } from "react"
import Request from "./Request"

export default function RequestContainer(props) {
    const [requestData, setRequestData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isPendingOnly, setIsPendingOnly] = useState(true)

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

    let requestItems = isPendingOnly ? requestData.map(request => request.requestStatus === 'PENDING' ? <Request requestData={request} modifyRequestFunc={setRequestData} key={request.id} userManager={props.userManager}/> : null)
    : requestData.map(request => <Request requestData={request} modifyRequestFunc={setRequestData} key={request.id} userManager={props.userManager}/>)
    
    return (
        <>
            {requestData.length !== 0 && <button className="mt-5 ml-5 text-2xl text-zinc-50 bg-sky-500 p-2 rounded-lg font-bold hover:bg-zinc-50 hover:text-sky-500 transition-all ease-in duration-75" onClick={() => setIsPendingOnly(prevState => !prevState)}>{isPendingOnly ? "Pending Only" : "All Request"}</button>}
            <div className="p-5 grid grid-cols-1 gap-2">
                {
                    requestData.length === 0 ?
                        <div className="flex justify-center p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
                            <h1>You have no request</h1> 
                        </div>
                    :
                        requestItems
                }
            </div>
        </>
    )
}