import { db, firebase } from "../../config/firebase";

async function handleUpdateProject(project, setProject, setEditProjectStatus) {
  let updatedDateTime = new Date();
  let tempProject = project;
  tempProject.createdAt =
    firebase.firestore.Timestamp.fromDate(updatedDateTime);
  setProject(tempProject);

  setEditProjectStatus("info");
  try {
    let userRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

    await userRef
      .collection("project")
      .doc(tempProject.id)
      .update(tempProject)
      .catch((error) => {
        setEditProjectStatus("error");
      });

    await userRef
      .collection("projectDashboard")
      .doc(tempProject.id)
      .update({
        createdAt: firebase.firestore.Timestamp.fromDate(updatedDateTime),
        projectName: tempProject.projectName,
      })
      .then(() => {
        setEditProjectStatus("success");
        setTimeout(() => {
          setEditProjectStatus("warning");
        }, 2000);
      })
      .catch((error) => {
        setEditProjectStatus("error");
      });
  } catch (error) {
    console.log(error);
  }
}

export default handleUpdateProject;
