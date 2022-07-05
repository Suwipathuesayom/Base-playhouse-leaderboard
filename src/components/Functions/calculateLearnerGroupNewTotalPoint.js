const calculateLearnerGroupNewTotalPoint = (learnerGroup, groupIndex) => {
  let sum = 0;
  learnerGroup[groupIndex]?.points.forEach((point) => {
    if (!!Object.keys(point).length) {
      if (!point.isHidden) {
        if (!!point.subTasks.length) {
          point.subTasks.forEach((subTask) => {
            if (!subTask.isHidden) sum += subTask.subTaskPoint;
          });
        } else {
          sum += point.taskPoint;
        }
      }
    }
  });
  // console.log(sum);
  return sum;
};

export default calculateLearnerGroupNewTotalPoint;
