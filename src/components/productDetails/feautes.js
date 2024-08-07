import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
const useProductDetailsFeatures = () => {
  const { id } = useParams();
  const carousel = useRef();
  const carouselPagination = useRef();
  const [currentIndex, setCurrentIndex] = useState(null);
  const [{ payload }] = useFetch("product/single-product/" + id);

  useEffect(() => {
    if (currentIndex >= 5) {
      carouselPagination.current.scrollTo(0, currentIndex * 200);
    } else {
      carouselPagination.current.scrollTo(0, 0);
    }
  }, [currentIndex]);

  return {
    carousel,
    setCurrentIndex,
    payload,
    currentIndex,
    carouselPagination
  };
};

export default useProductDetailsFeatures;
