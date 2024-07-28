/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Carousel, Card, Button, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CgDetailsMore } from "react-icons/cg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../api/data";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const contentStyle = {
  margin: 0,
  width: '100%',
  height: '300px',
  objectFit: "contain",
  textAlign: 'center',
  background: '#364d79',
};
const CardComponent = ({product, setTrigger, trigger, username}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
     const [loading, setLoading] = useState(false)


     const handleLiked = async (product) => {
          try {
            setLoading(true)
            const response = await axios.patch(
              `/product/${product._id}/${
                product.likedby.includes(username) ? "unlike" : "like"
              }`
            );
            setTrigger(!trigger);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
      };

      const handleAddCart = (product) => {
        dispatch({type: "ADD_TO_CART", product: product})
      }


     return (

     <Card
       style={{ padding: "10px" }}
       hoverable
       cover={
        <Carousel arrows autoplay infinite={true}>
          {
            product.product_images.map((image) => (
            <>
              <div>
                <img
                style={contentStyle}
                className="rounded-lg"
                  src={image}
                  alt="image"
                />
              </div>
            </>
            ))
          }
      </Carousel>
       }
     >
       <Meta
         style={{ minHeight: "100px" }}
         title={product.product_name}
         description={product.description.slice(0, 100)+"..."}
       />
       <div style={{ marginTop: 16 }}>
         <h3>${product.original_price}</h3>
         <div className="w-full flex justify-between mt-5">
           <Button onClick={() => handleAddCart(product)} type="primary" icon={<ShoppingCartOutlined />}>
             Add to Cart
           </Button>
           <Button onClick={() => navigate(`/productDetails/${product._id}`)} type="primary" icon={<CgDetailsMore />}>
             More Details
           </Button>
         </div>
       </div>
       <Button
         disabled={loading}
         className="absolute w-[40px] h-[40px] bg-white rounded-full border-none shadow-cm grid place-content-center top-3 right-3"
         onClick={() => handleLiked(product)}
       >
         {loading ? (
             <Spin size="small" />
        
         ) : (
           <>
               {product.likedby.includes(username) ? <AiFillHeart size={26} className="text-red-600" /> :  <AiOutlineHeart size={26} />}
           </>
         )}
       </Button>
     </Card>
  )
}

export default CardComponent