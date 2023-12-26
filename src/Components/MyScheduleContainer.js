import { useEffect, useState } from "react"
import MySchedule from "./MySchedule"

import Swal from "sweetalert2"

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
            Swal.fire({
                title: error,
                icon: "error",
                customClass: {
                    popup: 'bg-sky-500',
                    title: 'text-zinc-50',
                    confirmButton: '!bg-zinc-50 !text-sky-500 hover:!bg-sky-500 hover:!text-zinc-50 focus:!ring-0 !transition-all !ease-in !duration-75',
                }
            })
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
                    scheduleData.map(schedule => <MySchedule scheduleData={schedule} key={schedule.id} modifyScheduleFunc={setScheduleData} userManager={props.userManager}/>)
            }  
        </div>
    )
}