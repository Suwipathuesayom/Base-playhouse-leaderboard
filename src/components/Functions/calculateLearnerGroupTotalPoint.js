function calculateLearnerGroupTotalPoint(group) {
  let tempTotalPoint = 0;
  group.points
    .filter((point) => !point.isHidden)
    .forEach((point) => {
      tempTotalPoint += point.taskPoint;
    });
  return tempTotalPoint;
}

export default calculateLearnerGroupTotalPoint;
