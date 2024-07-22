import { useNavigate } from "react-router-dom"
const Home = () => {

  const navigate = useNavigate()



  return (
    <div>
      <button onClick={() => navigate("auth")}>Register</button>
    </div>
  )
}

export default Home