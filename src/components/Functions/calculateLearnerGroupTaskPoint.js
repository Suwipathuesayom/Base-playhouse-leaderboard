function calculateLearnerGroupTaskPoint(group, taskIndex) {
  let tempTaskPoint = 0;
  group.points[taskIndex].subTasks.forEach((subTask) => {
    if (!subTask.isHidden) tempTaskPoint += subTask.subTaskPoint;
  });
  return tempTaskPoint;
}

export default calculateLearnerGroupTaskPoint;
