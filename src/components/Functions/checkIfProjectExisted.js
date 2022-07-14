import { db } from "../../config/firebase";

async function checkIfProjectExisted(project) {
  let isExisted = false;
  let usersRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");
  if (project.id) {
    let docNameRef = await usersRef
      .collection("project")
      .where("projectName", "==", project.projectName)
      .get();
    docNameRef.forEach((doc) => {
      if (doc.data().id !== project.id) {
        isExisted = true;
      }
    });
  } else {
    let docNameRef = await usersRef
      .collection("projectDashboard")
      .where("projectName", "==", project.projectName)
      .get();
    docNameRef.forEach((doc) => {
      if (doc.data().projectName === project.projectName) {
        isExisted = true;
      }
    });
  }
  return isExisted;
}

export default checkIfProjectExisted;
