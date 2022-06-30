const recalculateLearnerGroupNewTotalPoint = (project) => {
  project.learnerGroups.forEach((group, groupIndex) => {
    let newTotalPoint = 0;
    group.points.forEach((point) => {
      if (!!Object.keys(point).length) {
        if (!!point.subTasks.length) {
          point.subTasks.forEach((subTask) => {
            if (subTask.isChecked) newTotalPoint += subTask.subTaskPoint;
          });
        } else if (point.isChecked) {
          newTotalPoint += point.taskPoint;
        }
      }
    });
    project.learnerGroups[groupIndex].totalPoint = newTotalPoint;
  });
};

export default recalculateLearnerGroupNewTotalPoint;
