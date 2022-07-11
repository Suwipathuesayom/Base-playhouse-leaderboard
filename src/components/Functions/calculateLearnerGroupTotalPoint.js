function calculateLearnerGroupTotalPoint(group) {
  let tempTotalPoint = 0;
  group.points.forEach((point) => {
    if (!point.isHidden) tempTotalPoint += point.taskPoint;
  });
  return tempTotalPoint;
}

export default calculateLearnerGroupTotalPoint;
