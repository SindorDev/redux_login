import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import feautes from "./feautes";
const ButtonGroup = Button.Group;

const index = ({payload,}) => {
  const {increase, decline, count} = feautes()
  return (
     
     <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
     <h2 className="text-2xl font-bold text-gray-900">
       {payload?.product_name}
     </h2>
     <p className="mt-2 text-gray-600">{payload?.description}</p>
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
  )
}

export default index