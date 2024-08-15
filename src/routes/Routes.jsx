import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/Error/ErrorPage'
import Root from '../Layout/Root'
import Login from '../Pages/Authentication/Login'
import Register from '../Pages/Authentication/Register'





const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children:[
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
