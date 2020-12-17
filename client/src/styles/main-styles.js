import background from "../images/bg-img.png";

const mainStyles = {
  backgroundImg: {
    height: "100%",
    background: `url(${background})`,
    backgroundSize: "cover",
  },
  colorOverlay: {
    height: "100%",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    opacity: "85%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};

export default mainStyles;
