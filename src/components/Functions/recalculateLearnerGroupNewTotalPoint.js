const recalculateLearnerGroupNewTotalPoint = (project) => {
  project.learnerGroups.forEach((group, groupIndex) => {
    let newTotalPoint = 0;
    group.points.forEach((point) => {
      if (!!Object.keys(point).length) {
        if (!!point.subTasks.length) {
          point.subTasks.forEach((subTask) => {
            if (!subTask.isHidden && subTask.isChecked)
              newTotalPoint += subTask.subTaskPoint;
            console.log(newTotalPoint);
          });
        } else if (!point.isHidden && point.isChecked) {
          newTotalPoint += point.taskPoint;
          console.log(newTotalPoint);
        }
      }
    });
    project.learnerGroups[groupIndex].totalPoint = newTotalPoint;
  });
};

export default recalculateLearnerGroupNewTotalPoint;
