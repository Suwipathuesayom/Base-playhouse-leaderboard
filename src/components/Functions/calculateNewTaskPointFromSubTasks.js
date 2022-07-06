const calculateNewTaskPointFromSubTasks = (task, taskIndex) => {
  let sum = 0;
  task[taskIndex].subTasks.forEach((subTask) => {
    if (!subTask.isHidden) sum += subTask.subTaskPoint;
  });
  return sum;
};

export default calculateNewTaskPointFromSubTasks;
