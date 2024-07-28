import { lazy, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/index"));
const Register = lazy(() => import("./auth/register/Register"));
const Login = lazy(() => import("./auth/login/Login"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"))
const Products = lazy(() => import("./dashboard/products/Products"))
const Users = lazy(() => import("./dashboard/users/Users"))
const Protected = lazy(() => import("./dashboard/protected/Protected"))
const Profile = lazy(() => import("./dashboard/profile/Profile"))
const LikedProducts = lazy(() => import("./dashboard/liked-products/LikedProducts"));
const ProductDetails = lazy(() => import("../components/productDetails/ProductDetails"))
const ProductCart = lazy(() => import("./cart/Cart")) 
import { SuspenseElement as Suspense } from "../utils/index";
import { useSelector } from "react-redux";
const RouteController = () => {
  const authData = useSelector(state => state)
  const [role, setRole] = useState(null)

  useEffect(() => {
    if(authData && authData.token) {
      setRole(JSON.parse(atob(authData?.token.split(".")[1]))?.user.role)
    }
  }, [authData])


  return useRoutes([
    {
      
      path: "",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
    },
    {
      
      path: "auth",
      element:  authData.token ? <Navigate to="/dashboard"/> : <Suspense> <Auth /> </Suspense>, 
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        }
      ]
    },
    {
      path: "dashboard",
      element: <Suspense><Protected/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense> <Dashboard/> </Suspense>,
          children: [
            {
              index: true,
              path: "",
              element: role === "admin" ? <Suspense> <Products/> </Suspense> : <Navigate to="/dashboard/liked-products"/>
            },
            {
              path: "users",
              element: role === "admin" ?  <Suspense> <Users/> </Suspense> : <Navigate to="/dashboard/liked-products"/>
            },
            {
              path: "profile",
              element: <Suspense> <Profile/> </Suspense>
            },
            
            {
              path: "liked-products",
              element: <Suspense> <LikedProducts/> </Suspense>
            },
            {
              path: "productCart",
              element: <Suspense> <ProductCart/> </Suspense>
            }
          ]
        }
      ]
    },
    {
      path: "/productDetails/:id",
      element: <Suspense> <ProductDetails/> </Suspense>
    },
    
    
  ])
}

export default RouteController