function calculateLearnerGroupTaskWeightPoint(project, groupIndex, taskIndex) {
  let tempTaskWeightPoint = 0;
  project.learnerGroups[groupIndex].points[taskIndex].subTasks
    .filter((subTask) => !subTask.isHidden)
    .forEach((subTask) => {
      tempTaskWeightPoint += subTask.subTaskPoint;
    });
  return parseFloat(
    ((tempTaskWeightPoint * project.tasks[taskIndex].weight) / 100.0).toFixed(2)
  );
}

export default calculateLearnerGroupTaskWeightPoint;
