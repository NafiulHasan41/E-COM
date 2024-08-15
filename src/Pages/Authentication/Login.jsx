import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Auth_Skeleton from "../Skeleton/Auth_Skeleton";
import Auth_slider from "../../Components/Auth_slider";

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);

  const onSuccess = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Login Successful",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const onError = (err) => {
    const msg = err?.message;
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      // User Login
      await signIn(email, password);
      onSuccess();
      navigate(location?.state ? location.state.from : "/");
    } catch (err) {
      onError(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onSuccess();
      navigate(location?.state ? location.state.from : "/");
    } catch (err) {
      onError(err);
    }
  };

  const customForm = (
    <>
      <div className="w-full max-w-xs md:max-w-md">
        <div className="mb-8">
          <img
            className="w-28 mx-auto"
            src="/e-com-removebg-preview.png"
            alt="websiteLogo"
          />
          <h1 className="text-[#152A16] mt-4 text-center text-2xl md:text-3xl font-semibold">
            Log In To Your Account
          </h1>
          <p className="text-[#5C635A] text-center text-sm md:text-base">
            Welcome back! Select a method to log in:
          </p>
        </div>
        <div className="mb-8">
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 md:h-14 flex justify-center items-center gap-2 rounded-md bg-gradient-to-l from-gray-50 to-black/15 shadow-lg"
          >
            <FcGoogle size={24} />
            <span className="text-[#152A16] text-base">Google</span>
          </button>
        </div>
        <p className="text-[#5C635A] text-center text-sm mb-8">Or Continue with Email</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#152A16] font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#152A16] font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={pass ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <span
                onClick={() => setPass(!pass)}
                className="absolute top-3 right-3 text-2xl cursor-pointer"
              >
                {pass ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="checkbox" />
              <p className="text-[#5C635A] text-sm">Remember me</p>
            </div>
            <Link className="text-[#156BCA] text-sm font-medium" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <button className="w-full h-12 md:h-14 rounded-md bg-[#156BCA] text-white font-semibold">
            Sign in
          </button>
        </form>
        <div className="text-center mt-8">
          <p className="text-sm">
            Don’t Have an Account?{" "}
            <Link to="/register" className="text-[#156BCA] font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );

  if (loading) {
    return <Auth_Skeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>E-COM : Login</title>
      </Helmet>
      <div className="flex flex-col-reverse lg:flex-row items-center w-full lg:w-3/4">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          {customForm}
        </div>
        <div className="w-full lg:w-1/2 relative hidden lg:flex items-center justify-center">
          <Auth_slider />
          <div className="absolute top-[50%] transform -translate-y-1/2 right-16 bg-[#152A16]/50 py-8 px-10 rounded-lg text-center">
            <h1 className="text-white text-xl font-semibold">
              <span className="text-[#156BCA]">Sign In </span> to view all the
            </h1>
            <h1 className="text-white text-xl font-semibold">massage therapists</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
