const contentStyle = {
  margin: 0,
  width: "100%",
  height: "500px",
  objectFit: "contain",
  textAlign: "center",
  background: "#364d79",
};

const CarouselItem = ({ image }) => {
  return (
    <div>
      <img
        style={contentStyle}
        className="rounded-lg"
        src={image}
        alt="image"
      />
    </div>
  );
};

export default CarouselItem;
