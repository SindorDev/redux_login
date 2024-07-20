import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/index"));
const Register = lazy(() => import("./auth/register/Register"));
const Login = lazy(() => import("./auth/login/Login"));
import { SuspenseElement as Suspense } from "../utils/index";

const RouteController = () => {
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
      element: (
        <Suspense>
          <Auth />
        </Suspense>
      ),
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
  ]);
};

export default RouteController;
