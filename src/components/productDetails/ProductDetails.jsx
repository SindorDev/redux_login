import { BiCartAlt } from "react-icons/bi"; 
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { Avatar, Carousel, Badge, Button } from "antd";
import { MinusOutlined, PlusOutlined,} from '@ant-design/icons';

const ButtonGroup = Button.Group;



const contentStyle = {
  margin: 0,
  width: '100%',
  height: '500px',
  objectFit: "contain",
  textAlign: 'center',
  background: '#364d79',
};
const ProductDetails = () => {
  const  {id}  = useParams();
  const carusel = useRef()
  const caruselPagination = useRef()
  const [currentIndex, setCurrentIndex] = useState(null)
  const [{payload}] = useFetch("product/" + id);
  const [count, setCount] = useState(5);

  const increase = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if(currentIndex >= 5) {
    caruselPagination.current.scrollTo(0, currentIndex * 200)
    } 
    else {
      caruselPagination.current.scrollTo(0,0)
    }
  }, [currentIndex])

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
      <div className="max-w-[1200px]  mx-auto">
      <div className="flex items-center justify-between">
      <Link to={"/"}>
          <Button className="bg-slate-400 text-white">
            Home
          </Button>
      </Link>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">Product Details</h1>
        </div>
        <Link to={"/dashboard"}>
          <Button className="bg-slate-400 text-white">
            Dashboard
          </Button>
      </Link>
      
      <Link to={"/dashboard"} className="ml-[10px]">
        <Badge count={count}>
          <Avatar shape="square" size="normal">
            <BiCartAlt size={20} />
          </Avatar>
        </Badge>
      </Link>
      
      </div>
      </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6 sm:px-20">
              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                <div ref={caruselPagination} className="w-[100px] p-[5px] flex gap-2 overflow-y-auto max-h-[480px] flex-col">
                {
            payload?.product_images.map((image, index) => (
            <>
              <div key={index} className={currentIndex === index ? "rounded-lg w-[100%] h-[80px] object-contain border-4 border-teal-600" : "rounded-lg w-[100%] h-[80px] object-contain border-4 border-transparent"} onClick={() => carusel.current.goTo(index)}>
                <img
                className="rounded-lg w-[100%] h-[70px] object-contain "
                  src={image}
                  alt="image"
                />
              </div>
            </>
            ))
          }
                </div>
                <div className="md:w-1/2">
                 
        <Carousel speed={300} afterChange={(current) => setCurrentIndex(current)} autoplay arrows infinite={true} ref={carusel}>
          {
            payload?.product_images.map((image) => (
            <>
              <div key={image}>
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
                </div>

                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {payload?.product_name}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {payload?.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold text-gray-900">
                      ${payload?.sale_price}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${payload?.original_price}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Category: {payload?.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {payload?.product_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      In Stock: {payload?.number_in_stock}
                    </p>
                    <p className="text-sm text-gray-600">
                      Likes: {payload?.likes}
                    </p>
                    
        <ButtonGroup className="mt-[10px]">
          <Button onClick={decline} icon={<MinusOutlined />} />
            <Button>{count}</Button>
          <Button onClick={increase} icon={<PlusOutlined />} />
        </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;