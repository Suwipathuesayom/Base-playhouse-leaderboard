function calculateTotalWeight(project) {
  let tempTotalWeight = 0;
  project.tasks
    .filter((task) => !task.isHidden)
    .forEach((task) => {
      tempTotalWeight += task.weight;
    });
  return tempTotalWeight;
}

export default calculateTotalWeight;
