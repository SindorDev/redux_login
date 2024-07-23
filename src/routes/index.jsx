import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/index"));
const Register = lazy(() => import("./auth/register/Register"));
const Login = lazy(() => import("./auth/login/Login"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"))
const Products = lazy(() => import("./dashboard/products/Products"))
const Users = lazy(() => import("./dashboard/users/Users"))
const Protected = lazy(() => import("./dashboard/protected/Protected"))
import { SuspenseElement as Suspense } from "../utils/index";
import { useSelector } from "react-redux";
const RouteController = () => {
  const verify = useSelector(state => state)

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
      path: "/auth",
      element:  verify.state.token ? <Navigate to="/dashboard"/> : <Suspense> <Auth /> </Suspense>, 
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
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Suspense><Protected/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense> <Dashboard/> </Suspense>,
          children: [
            {
              index: true,
              path: "",
              element: <Suspense> <Products/> </Suspense>
            },
            {
              path: "users",
              element: <Suspense> <Users/> </Suspense>
            }
          ]
        }
      ]
    }
  ])
};

export default RouteController;
