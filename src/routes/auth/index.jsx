import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-full shadow-cm">
        <Outlet/>
      </div>
    </div>
  )
}

export default Auth