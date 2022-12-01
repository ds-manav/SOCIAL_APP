import Feed from "../component/Feed/Feed.comonent";
import Login from "../component/Login/Login.component.";
import NavBar from "../component/NavBar/NavBar.component";
import SlideBar from "../component/SideBar/SlideBar.component";
import "./HomePages.style.css"



const HomePage = ()=>{
    const data =JSON.parse(localStorage.getItem("users"));
    
    return (
        <>
            {
                data ? 
                <div>
                <NavBar/>
                <div className="home__content">
                <SlideBar/>
                <Feed />
                </div>
                </div>
                :
                <div>
                <Login/>
                </div>
                
            }
        </>
    )
}

export default HomePage;