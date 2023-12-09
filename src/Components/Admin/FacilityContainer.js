import Facility from './Facility'

export default function FacilityContainer(props) {
    let facilityItems = props.facilities.map(facility => <Facility roomDetails={props.roomDetails} facilityData={facility} key={facility.id} userManager={props.userManager} modifyFacilityFunc={props.modifyFacilityFunc}/>)

    return (
        <div className="text-center bg-sky-700 rounded-lg p-5">
            <h1 className="pb-5">Facility</h1>
            <div className="overflow-y-auto h-60">
                <div>
                    {props.facilities.length === 0 ? 
                        <div className="text-xl font-normal bg-sky-500 p-2 mb-3 rounded-lg">
                            <h1>No Facilities</h1>
                        </div>
                    :
                        facilityItems
                    }
                </div>
            </div>
        </div>
    )
}