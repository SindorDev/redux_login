import { Carousel } from "antd";
import CarouselItem from "./carousel-item";


const index = ({ setCurrentIndex, carousel, payload }) => {
  return (
    <div className="md:w-1/2">
      <Carousel
        speed={300}
        afterChange={(current) => setCurrentIndex(current)}
        autoplay
        arrows
        infinite={true}
        ref={carousel}
      >
        {payload?.product_images.map((image) => (
          <CarouselItem image={image} key={image}/>          
        ))}
      </Carousel>
    </div>
  );
};

export default index;
