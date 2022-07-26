function calculateTotalTaskWeight(project) {
  let tempTotalWeight = 0;
  project.tasks.forEach((task) => {
    tempTotalWeight += task.weight;
  });
  //   console.log(tempTotalWeight);
  return tempTotalWeight;
}

export default calculateTotalTaskWeight;
