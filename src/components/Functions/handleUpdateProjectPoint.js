import { db } from "../../config/firebase";

const handleUpdateProjectPoint = async (project) => {
  try {
    let userRef = db.collection("users").doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3");

    await userRef
      .collection("project")
      .doc(project.id)
      .update(project)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export default handleUpdateProjectPoint;
