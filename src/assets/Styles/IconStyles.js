import color from "../../constant/color";

const iconStyle = {
  marginRight: "10px",
  fontSize: 28,
  color: color.primaryOrange,
  ":hover": {
    cursor: "pointer",
  },
};

const arrowIconStyle = (show) => [
  { ...iconStyle },
  {
    transition: "all 0.2s ease",
    transform: `rotate(${show ? "0.5turn" : 0})`,
  },
];

const addCircleIconStyle = (active) => [
  { ...iconStyle },
  {
    color: active ? color.primaryOrange : color.secondaryGrey,
  },
];

export { iconStyle, addCircleIconStyle, arrowIconStyle };
