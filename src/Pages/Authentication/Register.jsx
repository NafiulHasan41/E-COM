import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Auth_Skeleton from "../Skeleton/Auth_Skeleton";
import Auth_slider from "../../Components/Auth_slider";

const Register = () => {
  const [pass, setPass] = useState(false);
  const [pass2, setPass2] = useState(false);

  const navigate = useNavigate();
  const { createUser, logOut, setLoading, loading } = useAuth();

  // Success and error messages
  const onSuccess = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Created Successfully. Please Login",
      showConfirmButton: false,
      timer: 1000,
    });
    setLoading(false);
  };

  const onError = (err) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: err,
      showConfirmButton: false,
      timer: 1500,
    });
    setLoading(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirm_password = form.get("confirm_password");

    if (password.length < 8) {
      onError("Password must be at least 8 characters");
      return;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/.test(
        password
      )
    ) {
      onError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    } else if (password !== confirm_password) {
      onError("Passwords do not match, please check again");
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
        })
          .then(() => {
            onSuccess();
            logOut()
              .then(() => {
                setLoading(false);
                navigate("/login");
              })
              .catch((error) => {
                onError(error?.message);
              });
          })
          .catch((error) => {
            onError(error?.message);
          });
      })
      .catch((error) => {
        onError(error?.message);
      });
  };

  const customRegisterForm = (
    <div className="w-full max-w-xs md:max-w-md">
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[#152A16] font-medium">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="@username"
            className="input input-bordered w-full"
            required
          />
        </div>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[#152A16] font-medium">Confirm Password</span>
          </label>
          <div className="relative">
            <input
              type={pass2 ? "text" : "password"}
              name="confirm_password"
              placeholder="Re-type password"
              className="input input-bordered w-full"
              required
            />
            <span
              onClick={() => setPass2(!pass2)}
              className="absolute top-3 right-3 text-2xl cursor-pointer"
            >
              {pass2 ? <IoEye /> : <IoEyeOff />}
            </span>
          </div>
        </div>
        <div className="form-control">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="checkbox" />
            <p className="text-[#5C635A] text-sm">Remember me</p>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="w-full h-12 md:h-14 rounded-md bg-[#4285F3] text-white font-semibold">
            Sign up
          </button>
        </div>
      </form>
      <div className="text-center mt-6">
        <p className="text-sm">
          Already Have an Account?{" "}
          <Link to="/login" className="text-[#156BCA] font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );

  if (loading) {
    return <Auth_Skeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>E-COM : Create Account</title>
      </Helmet>
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center w-full lg:w-3/4">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
          <img
            className="w-28 mb-8"
            src="/e-com-removebg-preview.png"
            alt="websiteLogo"
          />
          <h1 className="text-[#152A16] text-2xl font-semibold mb-4">
            Sign In To Your Account
          </h1>
          <p className="text-[#5C635A] text-center text-sm mb-8">
            Welcome Back! By clicking the sign up button, you&apos;re agreeing to E-COM&apos;S
            Terms and Services and acknowledge the{" "}
            <Link className="text-[#156BCA] font-medium">
              Privacy and Policy
            </Link>
          </p>
          {customRegisterForm}
        </div>
        <div className="w-full lg:w-1/2 relative hidden lg:flex items-center justify-center">
          <Auth_slider />
          <div className="absolute top-[50%] transform -translate-y-1/2 right-16 bg-[#152A16]/50 py-8 px-10 rounded-lg text-center">
            <h1 className="text-white text-xl font-semibold">
              <span className="text-[#156BCA]">Create Account</span> to get started
            </h1>
            <h1 className="text-white text-xl font-semibold">with our services</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
