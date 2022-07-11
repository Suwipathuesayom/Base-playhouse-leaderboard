import { db } from "../../config/firebase";

function queryProjectFromProjectName(projectName, setProject) {
  try {
    db.collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
      .collection("project")
      .where("projectName", "==", projectName)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setProject(doc.data());
        });
      });
  } catch (error) {
    console.log(error);
    setProject({});
  }
}

export default queryProjectFromProjectName;
