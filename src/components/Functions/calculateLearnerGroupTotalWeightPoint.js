function calculateLearnerGroupTotalWeightPoint(project, groupIndex) {
  let tempTotalWeightPoint = 0.0;
  project.learnerGroups[groupIndex].points
    .filter((point) => !point.isHidden)
    .forEach((point) => {
      tempTotalWeightPoint += parseFloat(point.taskWeightPoint);
    });
  return parseFloat(tempTotalWeightPoint.toFixed(2));
}

export default calculateLearnerGroupTotalWeightPoint;
