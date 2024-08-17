import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";



const Root = () => {
    return (
      <div> 
        <Navbar/>
        <div className=" min-h-screen md:h-[2000px] lg:h-[1200px] overflow-y-auto  ">
        <Outlet/>
        </div>
        <div className=" ">
        <Footer />    
        </div>
    
        

      </div>
    );
};

export default Root;