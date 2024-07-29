/* eslint-disable no-unused-vars */
import { useFetch } from "../../hooks/useFetch";
import { Fragment, useState, } from "react";
import CardComponent from "../../components/card/Card";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { AutoComplete, Avatar, Badge } from "antd";
import CategoryList from "../../components/categoryList/CategoryList";
import Navbar from "../../components/nav/Navbar";
import Message from "../../components/message/Message"
const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const [{ payload }] = useFetch("/product/most-popular", trigger);
  const { username } = useSelector((state) => state.user) || "";
  

  return (
   <>
    <div className="min-h-screen bg-gray-100">
      <Navbar/>      
      <Message/>
      <CategoryList/>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-4 mx-auto gap-5">

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
   </>
  );
};

export default Home;
