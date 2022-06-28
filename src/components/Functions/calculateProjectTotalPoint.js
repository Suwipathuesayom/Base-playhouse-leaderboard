function calculateProjectTotalPoint(project) {
  let totalPoint = 0;
  project.tasks.forEach((task) => {
    totalPoint += task.point;
  });
  return totalPoint;
}

export default calculateProjectTotalPoint;
