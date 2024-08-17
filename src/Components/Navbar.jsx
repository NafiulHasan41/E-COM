import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Auth_Skeleton from "../Pages/Skeleton/Auth_Skeleton";
import { IoLogInOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";






const Navbar = () => {

    const { user , loading , logOut , setLoading } = useAuth();

      //control navigation 

      const navigate = useNavigate();


      if (loading) {
          return (<Auth_Skeleton/>);
        }
      

        const handleLogOut = () => {
            logOut()
              .then(() => {
                setLoading(false);
                Swal.fire("User Logged out Successfully");
                navigate("/");
                
              })
              .catch((error) => {
                Swal.fire(error?.message);
              });
          };

      

    return (
        <div>
      <div>
          <nav className=" relative  bg-slate-500/30 ">
              <div className=" container  px-3 py-3 mx-auto">
                
                      <div className="flex items-center justify-between">

                          <div className="flex gap-2">
                              <Link to='/'>
                              <img className="w-full h-10 md:h-14 lg:h-16 rounded-lg"
                                  src="/e-com-removebg-preview.png"
                                  alt="website_logo" />
                              </Link>
                          </div>
                         
                          <div className="flex flex-row  lg:items-center mt-4 lg:mt-0 gap-4 my-3">
                              

                          
                              <div>

                                  {user ? (
                                  <button type="button" className="flex items-center focus:outline-none"
                                      aria-label="toggle profile dropdown">
                                      <div title={user?.displayName}
                                          className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                          <img referrerPolicy='no-referrer' src={user?.photoURL} alt={user?.displayName}
                                              className="object-cover w-full h-full" />
                                      </div>

                                  </button>
                                  ) : null}
                              </div>

                              <div>
                                  {user ? (
                                  <button onClick={handleLogOut}
                                      className="flex items-center gap-2 p-1 md:p-2 rounded-[6px] font-semibold text-red-400  hover:bg-cyan-700  lg:text-xl   border-none ">
                                      Logout <TbLogout2 />
                                  </button>
                                  ) : (
                                  <Link to="/login" className=" flex items-center gap-2 p-1 md:p-2 rounded-[6px] font-semibold text-green-500 lg:text-xl  hover:bg-cyan-700  border-none ">
                                  Login <IoLogInOutline />
                                  </Link>
                                  )}
                              </div>

                          </div>

                         
                      </div>

                  
              </div>
          </nav>
      </div>

  </div>
    );
};

export default Navbar;