import Navbar from "../../components/nav/Navbar";
import Message from "../../components/message/Message";
import CategoryList from "../../components/categoryList/CategoryList";
import { ProductCard, ProductCarousel, ProductContent } from "./customs";
import useProductDetailsFeatures from "./feautes";

const ProductDetails = () => {
  const { carousel, setCurrentIndex, payload, currentIndex, carouselPagination } = useProductDetailsFeatures();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Message />
      <CategoryList />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6 sm:px-20">
              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                <div
                  ref={carouselPagination}
                  className="w-[100px] p-[5px] flex gap-2 overflow-y-auto max-h-[480px] flex-col"
                >
                  {payload?.product_images.map((image, index) => (
                    <ProductCard
                      key={index}
                      image={image}
                      index={index}
                      currentIndex={currentIndex}
                      carousel={carousel}
                    />
                  ))}
                </div>

                <ProductCarousel
                  setCurrentIndex={setCurrentIndex}
                  carousel={carousel}
                  payload={payload}
                />
                <ProductContent payload={payload} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
