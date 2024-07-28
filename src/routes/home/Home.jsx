/* eslint-disable no-unused-vars */
import { useFetch } from "../../hooks/useFetch";
import { Fragment, useState } from "react";
import CardComponent from "../../components/card/Card";
import { useSelector } from "react-redux";
import { BiCartAlt } from "react-icons/bi"; 
import { NavLink } from "react-router-dom";
import { Avatar, Badge } from "antd";

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const [{ payload }] = useFetch("/product/all", trigger);
  const { username } = useSelector((state) => state.user) || "";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white min-h-[80px] rounded-xl mb-[50px] shadow">

        <div className="max-w-[1200px] h-[100%] py-[15px] mx-auto">
          <div className="flex items-center h-full justify-between">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              Home
            </h1>

            <ul className="flex items-center gap-5">
              <li>
                <NavLink className="px-5 py-1 bg-teal-600 text-white rounded-lg" to={"/auth"}>Login In</NavLink>
              </li>
              
              <li>
                <NavLink className="px-5 py-1 bg-teal-600 text-white rounded-lg" to={"/Dashboard"}>Dashboard</NavLink>
              </li>
              
              <li>
                <NavLink className="px-5 py-1 bg-teal-600 text-white rounded-lg" to={"/Dashboard/profile"}>Profile</NavLink>
              </li>
              <li>
                
      <NavLink to={"/Dashboard/productCart"} className="ml-[10px]">
        <Badge>
          <Avatar shape="square" size="normal">
            <BiCartAlt size={20} />
          </Avatar>
        </Badge>
      </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-3 mx-auto gap-5">

          {payload?.map((product) => (
            <Fragment key={product._id}>
              <CardComponent
                product={product}
                trigger={trigger}
                setTrigger={setTrigger}
                username={username}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
