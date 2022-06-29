import { db } from "../../config/firebase";

const queryNoteFromId = async (id, setMentors) => {
  await db
    .collection("messages")
    .where("id", "==", id)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        setMentors(doc.data().mentors);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default queryNoteFromId;
