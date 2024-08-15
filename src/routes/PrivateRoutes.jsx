import PropTypes from 'prop-types';
import { Navigate ,useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import Auth_Skeleton from '../Pages/Skeleton/Auth_Skeleton';




const PrivateRoute = ({children}) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();

    const loginMessage = () => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Please Login First",
            showConfirmButton: false,
            timer: 1500
        });

    }


    if (loading) {
        return (<Auth_Skeleton/>);
    }

    if (user) {

        return children;
    }
 
     
    return <>
      {loginMessage()}
     <Navigate to="/login" state={{ from: location.pathname }} />; 
  
     </>

   
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;