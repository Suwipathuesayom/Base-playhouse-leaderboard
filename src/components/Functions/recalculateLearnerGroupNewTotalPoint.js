const recalculateLearnerGroupNewTotalPoint = (project) => {
  project.learnerGroups.forEach((group, groupIndex) => {
    let newTotalPoint = 0;
    group.points.forEach((point) => {
      if (Object.keys(point).length !== 0 && point.isChecked) {
        newTotalPoint += point.taskPoint;
      }
    });
    project.learnerGroups[groupIndex].totalPoint = newTotalPoint;
  });
};

export default recalculateLearnerGroupNewTotalPoint;
