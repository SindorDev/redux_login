import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Fragment } from "react";
import CardComponent from "../../components/card/Card";
import { useSelector } from "react-redux";
import Navbar from "../../components/nav/Navbar";
import Message from "../../components/message/Message"
import CategoryList from "../../components/categoryList/CategoryList";
const Category = () => {
  const  {categoryName}  = useParams();
  const [trigger, setTrigger] = useState(false);
  const [{ payload }] = useFetch(`/product/by?category=${categoryName}`, trigger);
  const { username } = useSelector((state) => state.user) || "";

  return (
    <>
    <Navbar/>
    <Message/>
    <CategoryList/>
    <div className="max-w-[1400px] mt-[30px] mx-auto">
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
    </>
  )
}

export default Category