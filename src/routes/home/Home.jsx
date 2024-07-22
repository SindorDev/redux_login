import { useNavigate } from "react-router-dom"
const Home = () => {

  const navigate = useNavigate()

  return (
    <div>{navigate("auth")}</div>
  )
}

export default Home