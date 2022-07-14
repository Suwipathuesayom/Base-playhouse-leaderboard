function calculateLearnerGroupTaskWeightPoint(project, groupIndex, taskIndex) {
  let tempTaskWeightPoint = 0;
  project.learnerGroups[groupIndex].points[taskIndex].subTasks.forEach(
    (subTask, subTaskIndex) => {
      if (!subTask.isHidden)
        tempTaskWeightPoint +=
          (subTask.subTaskPoint *
            project.tasks[taskIndex].subTasks[subTaskIndex].weight) /
          100.0;
    }
  );
  return tempTaskWeightPoint.toFixed(2);
}

export default calculateLearnerGroupTaskWeightPoint;
