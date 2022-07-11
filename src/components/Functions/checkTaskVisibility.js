function checkTaskVisibility(tasks, taskIndex) {
  let visibility = 0;
  tasks[taskIndex].subTasks.forEach((subTask) => {
    visibility += !subTask.isHidden;
  });
  return !!!visibility;
}

export default checkTaskVisibility;
