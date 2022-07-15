import { db, firebase } from "../../config/firebase";
import checkIfProjectExisted from "./checkIfProjectExisted";

async function handleAddNewProject(
  project,
  setProject,
  showAlert,
  setShowAlert,
  setProjectStatus,
  setProjectAlertText
) {
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
  let createdDateTime = new Date();
  let tempProject = project;
  tempProject.createdAt =
    firebase.firestore.Timestamp.fromDate(createdDateTime);
  setProject(tempProject);
  setProjectStatus("info");
  try {
    let projectRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

    let newProjectRef = await projectRef.collection("project").add(tempProject);

    tempProject.id = newProjectRef.id;

    await projectRef
      .collection("project")
      .doc(newProjectRef.id)
      .update(tempProject);

    await projectRef
      .collection("projectDashboard")
      .doc(newProjectRef.id)
      .set({
        createdAt: firebase.firestore.Timestamp.fromDate(createdDateTime),
        projectName: tempProject.projectName,
      })
      .then(() => {
        setProjectStatus("success");
        setTimeout(() => {
          setShowAlert(false);
          setProject({});
          window.open(`/project/${project.projectName}`);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setProjectStatus("error");
      });
  } catch (error) {
    console.log(error);
  }
}

export default handleAddNewProject;
