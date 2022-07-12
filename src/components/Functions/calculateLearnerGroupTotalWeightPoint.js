function calculateLearnerGroupTotalWeightPoint(project, groupIndex) {
  let tempTotalWeightPoint = 0.0;
  project.learnerGroups[groupIndex].points
    .filter((point) => !point.isHidden)
    .forEach((point) => {
      tempTotalWeightPoint += parseFloat(point.taskWeightPoint);
    });
  return parseFloat(tempTotalWeightPoint.toFixed(1));
}

export default calculateLearnerGroupTotalWeightPoint;
