function addLearnerGroupTaskPoint(project, groupIndex) {
  project.tasks.forEach((task, taskIndex) => {
    project.learnerGroups[groupIndex].points.push({
      isChecked: false,
      taskIndex: taskIndex,
      taskPoint: task.point,
    });
  });

  return project;
}

export default addLearnerGroupTaskPoint;
