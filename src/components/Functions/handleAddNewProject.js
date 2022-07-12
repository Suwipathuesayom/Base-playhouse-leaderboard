import { db, firebase } from "../../config/firebase";

async function handleAddNewProject(project, setProject, setEditProjectStatus) {
  if (!project.projectName) {
    setEditProjectStatus("error", "กรุณาใส่ชื่อโปรเจค");
    return;
  }
  let createdDateTime = new Date();
  let tempProject = project;
  tempProject.createdAt =
    firebase.firestore.Timestamp.fromDate(createdDateTime);
  setProject(tempProject);
  setEditProjectStatus("info");
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
        setEditProjectStatus("success");
        setTimeout(() => {
          setEditProjectStatus("warning");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setEditProjectStatus("error");
      });
  } catch (error) {
    console.log(error);
  }
}

export default handleAddNewProject;
