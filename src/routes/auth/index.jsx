import { Outlet } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-full shadow-cm">
        <GoogleOAuthProvider clientId={import.meta.env.Google_ClientId}>
        <Outlet/>
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}

export default Auth