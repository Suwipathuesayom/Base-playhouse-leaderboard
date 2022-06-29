const getRankColor = (rankIndex, top3) => {
  if (rankIndex === 0) {
    return top3 !== "#000000" ? top3 + "99" : "#FF5B4A99";
  } else if (rankIndex === 1) {
    return top3 !== "#000000" ? top3 + "77" : "#FF5B4A77";
  } else if (rankIndex === 2) {
    return top3 !== "#000000" ? top3 + "55" : "#FF5B4A55";
  } else {
    return "#88838355";
  }
};

export default getRankColor;
