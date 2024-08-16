import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/Error/ErrorPage'
import Root from '../Layout/Root'
import Login from '../Pages/Authentication/Login'
import Register from '../Pages/Authentication/Register'
import Home from '../Pages/Home/Home'





const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
       
      ]
      
    
    },
  
   
  ])
  
  export default router
