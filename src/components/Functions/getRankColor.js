const getRankColor = (rankIndex, top3) => {
  if (rankIndex === 0) {
    return top3 + "99";
  } else if (rankIndex === 1) {
    return top3 + "77";
  } else if (rankIndex === 2) {
    return top3 + "55";
  } else {
    return "#88838355";
  }
};

export default getRankColor;
