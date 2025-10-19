import NavBar from "../../component/NavBarcomponent/navbar.jsx"
import Banner from "../../component/homecomponent/homenews/News.jsx"
import Background from "../../component/homecomponent/homebg/Homebg.jsx"
import Footer from "../../component/footer/Footer.jsx"
import Video from "../../component/homecomponent/homevideo/Video.jsx"

const home =() =>{

    return(
    <>
    <NavBar />
    <Background/>
    <Banner />
    <Footer/>
    <Video/>
    </>

    )

}

export default home