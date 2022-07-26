function calculateLearnerGroupTaskWeightPoint(project, groupIndex, taskIndex) {
  let tempTaskWeightPoint = 0;
  project.learnerGroups[groupIndex].points[taskIndex].subTasks
    .filter((subTask) => !subTask.isHidden)
    .forEach((subTask) => {
      tempTaskWeightPoint += subTask.subTaskWeightPoint;
    });
  return parseFloat(tempTaskWeightPoint.toFixed(2));
}

export default calculateLearnerGroupTaskWeightPoint;
