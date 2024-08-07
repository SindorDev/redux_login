const ProductCard = ({image, index, carousel, currentIndex}) => {
  return (
    <div
      className={
        currentIndex === index
          ? "rounded-lg w-[100%] h-[80px] object-contain border-4 border-teal-600"
          : "rounded-lg w-[100%] h-[80px] object-contain border-4 border-transparent"
      }
      onClick={() => carousel.current.goTo(index)}
    >
      <img
        className="rounded-lg w-[100%] h-[70px] object-contain "
        src={image}
        alt="image"
      />
    </div>
  );
};

export default ProductCard;
