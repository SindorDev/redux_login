import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
const Protected = () => {
  const authData = useSelector(state => state)
  if(!authData.state.token) {
    return  <Navigate to="/auth"/>
  }
  else {
    return <Outlet/>
}
}

export default Protected