import { db, firebase } from "../../config/firebase";
import checkIfProjectExisted from "./checkIfProjectExisted";

async function handleUpdateProject(
  project,
  setProject,
  setShowAlert,
  setProjectStatus,
  setProjectAlertText
) {
  let updatedDateTime = new Date();
  let tempProject = project;
  tempProject.createdAt =
    firebase.firestore.Timestamp.fromDate(updatedDateTime);
  setProject(tempProject);

  setShowAlert(true);
  setProjectStatus("info");
  setProjectAlertText("");
  if (!project.projectName) {
    setProjectStatus("warning");
    setProjectAlertText("กรุณาใส่ชื่อโปรเจค");
    return;
  }
  if (await checkIfProjectExisted(project)) {
    setShowAlert(true);
    setProjectStatus("warning");
    setProjectAlertText(`มีโปรเจคชื่อ ${project.projectName} อยู่แล้ว`);
    return;
  }
  try {
    let userRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

    await userRef
      .collection("project")
      .doc(tempProject.id)
      .update(tempProject)
      .catch((error) => {
        setProjectStatus("error");
      });

    await userRef
      .collection("projectDashboard")
      .doc(tempProject.id)
      .update({
        createdAt: firebase.firestore.Timestamp.fromDate(updatedDateTime),
        projectName: tempProject.projectName,
      })
      .then(() => {
        setProjectStatus("success");
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((error) => {
        setProjectStatus("error");
      });
  } catch (error) {
    console.log(error);
  }
}

export default handleUpdateProject;
