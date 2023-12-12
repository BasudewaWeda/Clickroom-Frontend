import Analytics from "./Analytics"
import Cards from "./Cards"

export default function HomeContainer(props) {
    return (
        <div>
            <Analytics/>
            <Cards/>
            <button onClick={props.modifyScreenIndexFunc}>LogIn</button>
        </div>
    )
}