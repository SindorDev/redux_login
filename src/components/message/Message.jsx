import {  Skeleton, Carousel } from 'antd';
import { useFetch } from "../../hooks/useFetch"


const Message = () => {

  const [{payload}, loading] = useFetch("notifications/all")

  return (
    <div className='max-w-[1440px] bg-[#edf2f4] mx-auto py-[5px] rounded-lg my-[10px]'>
      
     <Carousel speed={400} dots={false} autoplay>
      {
        loading ?  <Skeleton
        avatar
        paragraph={{
          rows: 0,
        }}
      />
      :
      payload?.map((item) => (
        <div key={item._id} className='text-center'>
          <h3>{item.message}</h3>
        </div>
      ))
      }
   </Carousel>
    </div>
)
}

export default Message