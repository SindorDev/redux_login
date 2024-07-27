import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useFetch } from "../../hooks/useFetch";
import { CgDetailsMore } from "react-icons/cg";
const { Meta } = Card;

const Home = () => {
  const [{ payload }] = useFetch("/product/most-popular");

  return (
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-4xl font-serif my-[20px] text-center">Most Popular</h1>
        <div className="grid grid-cols-3 mx-auto gap-5">
      {payload?.map((product) => (
        <>
        
        <Card
        style={{padding: "10px"}}
          hoverable
          cover={<img alt={product.product_name} style={{height: "300px", objectFit: "contain", borderRadius: "10px"}} src={product.product_images[0]} />}
        >
          <Meta style={{minHeight: "120px"}} title={product.product_name} description={product.description} />
          <div style={{ marginTop: 16 }}>
            <h3>${product.original_price}</h3>
            <div className="w-full flex justify-between mt-5">
              
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              Add to Cart
            </Button>
            <Button type="primary" icon={<CgDetailsMore/>}>
              More Details
            </Button>
            
            </div>
          </div>
        </Card>
        </>
      ))}
    </div>

      </div>
  );
};

export default Home;
