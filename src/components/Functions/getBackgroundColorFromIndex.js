import color from "../../constant/color";

const getBackgroundColorFromIndex = (index) => {
  return !!(index % 2) ? color.secondaryBlack : color.primaryBlack;
};

export default getBackgroundColorFromIndex;
