import { useEffect, useState } from "react"
import MySchedule from "./MySchedule"

export default function MyScheduleContainer(props) {
    const [scheduleData, setScheduleData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        try {
            fetch('http://localhost:8080/api/v1/schedule', {
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
                setScheduleData(data.scheduleList)
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
                scheduleData.length === 0 ?
                    <div className="flex justify-center p-2 bg-sky-500 text-zinc-50 text-xl font-bold rounded-lg">
                        <h1>You have no schedule</h1> 
                    </div>
                : 
                    scheduleData.map(schedule => <MySchedule scheduleData={schedule} modifyScheduleFunc={setScheduleData} userManager={props.userManager}/>)
            }  
        </div>
    )
}