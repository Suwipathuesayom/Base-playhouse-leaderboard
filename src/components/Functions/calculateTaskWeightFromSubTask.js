function calculateTaskWeightFromSubTask(project, taskIndex) {
  let tempTaskWeight = 0;
  project.tasks[taskIndex].subTasks
    .filter((subTask) => !subTask.isHidden)
    .forEach((subTask) => {
      tempTaskWeight += subTask.weight ? subTask.weight : 0;
    });
  // console.log(tempTaskWeight);
  return tempTaskWeight;
}

export default calculateTaskWeightFromSubTask;
