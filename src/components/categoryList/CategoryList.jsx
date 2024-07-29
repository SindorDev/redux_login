import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"
import { Spin } from "antd";
const CategoryList = () => {

     const [data, loading] = useFetch("/product/category")

     return (
    <div className="max-w-[1400px] bg-[#e9ecef] p-[10px] flex gap-5 items-center rounded-md mx-auto mb-[5px]">
     {
       loading ? <Spin size="large" /> : data.payload?.map((item, index) => <Link className="text-[18px] border-b-[2px] capitalize border-transparent hover:border-b-[2px] duration-1000 hover:border-black" to={`/category/${item}`} key={index}>{item}</Link>)
     }
    </div>
  )
}

export default CategoryList