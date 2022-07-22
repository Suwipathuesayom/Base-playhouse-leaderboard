function calculateTaskMaxPointFromSubTaskMaxPoint(project, taskIndex) {
  let tempTaskMaxPoint = 0;
  project.tasks[taskIndex].subTasks.forEach((subTask) => {
    tempTaskMaxPoint += subTask.subTaskMaxPoint;
  });
  //   console.log(tempTaskMaxPoint);
  return tempTaskMaxPoint;
}

export default calculateTaskMaxPointFromSubTaskMaxPoint;
