const calculateLearnerGroupNewTotalPoint = (learnerGroup, groupIndex) => {
  let sum = 0;
  learnerGroup[groupIndex]?.points.forEach((point) => {
    if (!!Object.keys(point).length) {
      if (!point.isHidden) {
        sum += point.taskPoint;
      }
    }
  });
  return isNaN(sum) ? 0 : sum;
};

export default calculateLearnerGroupNewTotalPoint;
