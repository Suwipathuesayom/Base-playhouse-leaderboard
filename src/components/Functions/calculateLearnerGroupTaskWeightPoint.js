function calculateLearnerGroupTaskWeightPoint(project, groupIndex, taskIndex) {
  let tempTaskWeightPoint = 0;
  project.learnerGroups[groupIndex].points[taskIndex].subTasks.forEach(
    (subTask, subTaskIndex) => {
      if (!subTask.isHidden)
        tempTaskWeightPoint +=
          (subTask.subTaskPoint *
            project.tasks[taskIndex].subTasks[subTaskIndex].weight *
            project.tasks[taskIndex].weight) /
          10000.0;
    }
  );
  return parseFloat(tempTaskWeightPoint.toFixed(2));
}

export default calculateLearnerGroupTaskWeightPoint;
