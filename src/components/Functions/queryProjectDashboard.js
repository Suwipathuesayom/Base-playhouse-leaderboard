import { db } from "../../config/firebase";

async function queryProjectDashboard(
  setProjectDashboard,
  orderBy = "createdAt",
  order = "desc"
) {
  let tempProjectDashboard = [];
  try {
    await db
      .collection("users")
      .doc("Qc0cyqw24Tf25rivG1ayoJi2XCF3")
      .collection("projectDashboard")
      .orderBy(orderBy, order)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          tempProjectDashboard.push(doc.data());
        });
        setProjectDashboard(tempProjectDashboard);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}

export default queryProjectDashboard;
