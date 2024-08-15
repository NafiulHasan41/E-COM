import { Link , useLocation , useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {  useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoEye ,IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Auth_Skeleton from "../Skeleton/Auth_Skeleton";
import Auth_slider from "../../Components/Auth_slider";



const Login = () => {


    const {  signIn , signInWithGoogle ,loading , setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const onSuccess = ()=> {

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000
    })
  }

    const onError = (err) => { 
      const msg = err?.message;
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500
    });
    setLoading(false);
       
    }
    

    const handleLogin = async e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
      
        try {
            //User Login
            await signIn(email, password)         
          
            onSuccess();
        

            if( location.state === "/login")
                {
                  navigate("/")
                }
                else
                {
                  navigate(location?.state ? location.state.from : "/");
                }


          } catch (err) {
            // console.log(err)
            onError(err);
          }
    }

    const handleGoogleLogin = async () => {
        try {
            
          await signInWithGoogle()
           
            onSuccess();
            
            if( location.state === "/login")
              {
                navigate("/")
              }
              else
              {
                navigate(location?.state ? location.state.from : "/");
              }

          } catch (err) {
            // console.log(err)
            onError(err);
          }
    }

 


     const [ pass , setPass] = useState(false);


    const customForm = (
      <>
       <div className=" max-w-[430px] w-full  md:max-w-[450px]">
        <div>
          {/* logo */}
          <img className=" hidden md:block w-[110px] " src="/e-com-removebg-preview.png" alt="websiteLogo" />
          <h1 className=" text-[#152A16] md:mt-[35px] mb-[18px]  md:my-[25px] md:text-[30px] font-semibold h-[24px]">Log In To Your Account</h1>
          <p className=" text-[#5C635A] text-[14px] md:text-[16px] font-normal mb-[40px]">Welcome back! Select a method to log in:</p>
          {/* social login */}
          <div className=" flex justify-center mb-[32px] ">
                    <button onClick={handleGoogleLogin} className="w-[146px] h-[45px] md:w-[178px] md:h-[55px]  border-none rounded-[6px] text-[20px] md:text-2xl bg-gradient-to-l from-gray-50 to-black/15 shadow-xl shadow-black/35 "> <p className="flex gap-2 justify-center"><FcGoogle/> <span className=" text-[#152A16] text-center text-[16px] font-normal ">Google</span></p>  </button>
                    
           </div>
        </div>
        <div>
          <p className=" divider text-[#5C635A] text-[14px] font-normal mb-[32px]">Or Continue with Email</p>
        </div>
       <form onSubmit={handleLogin} className="">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[16px] text-[#152A16] font-medium ">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-[28px]">
                        <label className="label">
                            <span className="label-text text-[16px] text-[#152A16] font-medium ">Password</span>
                            
                        </label>
                       <div className=" relative"> 

                       <input type={ pass? "text" : "password"} name="password" placeholder="Enter your password " className="input input-bordered w-full" required />
                        <span  onClick={() => setPass(!pass)} className=" text-2xl absolute top-3 right-3">{ pass ? <IoEye/> : <IoEyeOff/> }</span>

                       </div>            
                    </div>
                    <div className=" flex justify-between mt-[16px]">
                          <div className=" flex gap-2">
                          <input type="checkbox"  className="checkbox text-[#5C635A] " />
                          <p className=" text-[#5C635A] font-normal text-[14px]">Remember me</p>
                          </div>
                          <div>
                            <Link  className=" link  text-[#156BCA] text-[14px] font-medium">Forgot Password?</Link>
                          </div>
                       </div>
                    <div className="form-control mt-5 md:mt-[65px] w-[270px] h-[55px] mx-auto rounded-[10px] ">
                        <button className="rounded-[10px]  py-[16px] px-[40px] text-[#FFFFFF] text-[16px] font-semibold bg-[#156BCA] border-none text-xs md:text-xl ">Sign in</button>
                    </div>

                </form>

              

                <label className="label text-center  justify-center text-[15px] font-medium mb-[60px] md:mb-0 md:mt-[16px]">
                        <p className=" mx-1 text-[#142D3A] font-bold">Don’t Have an Account?</p><Link to="/register"  className="link  text-[#156BCA]">Create Account</Link>
                 </label>
       </div>

      </>
    );

    if(loading){
      return(
          <Auth_Skeleton/>
      );
  }


  // it was confusing figma file, it took much time to understand the design of mobile login page but in the end I got it right, I think.

    return (
        <div className=" w-full">

          <Helmet>
            <title>E-COM : Login</title>
        </Helmet>
       <div className="hero gap-1 md:min-h-[500px] p-0 ">
        <div className=" md:hero-content  md:w-full md:mx-auto md:flex-col lg:flex-row-reverse">
            <div className=" sticky md:static top-0 -z-50 flex-1 text-center lg:text-left">
              <div className=" relative">
              <Auth_slider/>
               <div className=" absolute top-[346px] right-[65px] md:top-[332px] md:right-[153px]  z-20 bg-[#152A16]/35 py-[30px] px-[35px] rounded-[10px] max-h-[143px] max-w-[341px] ">
                 <h1 className=" text-center text-[#fff] text-[22px] font-medium h-[35px]" ><span className=" text-center text-[#156BCA] text-[22px] font-semibold h-[35px]">Sign In </span>to view all the</h1>
                 <h1 className=" text-center text-[#fff] text-[22px] font-medium h-[35px]">massage therapists</h1>
                
               </div>
               <div className="md:hidden absolute top-[64px] left-[170px]  z-20">
                <img className="  w-[110px] " src="https://i.ibb.co/hDtnRkH/Therapy-Nest-Logo-removebg.png" alt="websiteLogo" />
              </div>
              </div>

              
                
            </div>
            <div className="  md:bg-none z-50 md:z-0 md:flex-1  md:shrink-0  mx-auto  max-w-[430px]   md:p-0 w-full  md:max-w-full  ">
              <div className=" md:hidden mb-[20px]">
              <h1 className=" text-center text-[#fff] text-[18px] font-medium h-[35px]" ><span className=" text-center text-[#FFF] text-[18px] font-semibold h-[35px]">Sign In </span>to view all the</h1>
              <h1 className=" text-center text-[#fff] text-[18px] font-medium h-[35px]">massage therapists</h1>
              </div>
              <div className="bg-white w-full  p-8 rounded-t-[40px]">
                 {customForm}
              </div>
               
            </div>
        </div>
    </div>
  
</div>
    );
};


export default Login;