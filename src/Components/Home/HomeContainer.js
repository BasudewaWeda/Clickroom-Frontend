import About from "./About"
import Benefit from "./Benefit"
import Hero from "./Hero"
import Navbar from "./Navbar"
import Features from "./Featured"
import Footer from "./Footer"

export default function HomeContainer(props) {
    return (
        <div className="scroll-smooth">
            <Navbar/>
            <Hero modifyScreenIndexFunc={props.modifyScreenIndexFunc}/>
            <About/>
            <Features/>
            <Benefit/>
            <Footer/>
        </div>
    )
}