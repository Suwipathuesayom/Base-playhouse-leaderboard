import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

function ExportCSV({ selectedProject, mentors }) {
  if (selectedProject) {
    let headers = [
      {
        label: "Group Name",
        key: "groupName",
      },
    ];
    let learnerGroups = [];
    selectedProject.tasks.forEach((task) => {
      headers.push({
        label: task.taskName,
        key: task.taskName,
      });
    });
    headers.push(
      { label: "total point", key: "totalPoint" },
      { label: "mentor's note", key: "note" }
    );
    selectedProject.learnerGroups.forEach((group) => {
      let tempObject = {
        groupName: group.groupName,
      };
      selectedProject.tasks.forEach((task, taskIndex) => {
        let tempPoint = 0;
        if (group.points.length !== 0) {
          if (Object.keys(group.points[taskIndex]).length !== 0) {
            if (group.points[taskIndex].subTasks) {
              group.points[taskIndex].subTasks.forEach((subTask) => {
                if (!subTask.isHidden) tempPoint += subTask.subTaskPoint;
              });
            } else {
              if (!group.points[taskIndex].isHidden) {
                tempPoint = group.points[taskIndex].taskPoint;
              } else {
                tempPoint = 0;
              }
            }
          } else {
            tempPoint = 0;
          }
        } else {
          tempPoint = 0;
        }
        tempObject[task.taskName] = tempPoint;
      });
      tempObject["totalPoint"] = group.totalPoint;
      let foundNote = false;
      mentors.forEach((mentor) => {
        if (mentor.groupIndex === group.groupIndex - 1) {
          foundNote = true;
          tempObject["note"] = mentor.note;
        }
      });
      if (!foundNote) tempObject["note"] = "";
      learnerGroups.push(tempObject);
    });
    return (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1d6f42",
        }}
      >
        <CSVLink
          headers={headers}
          data={learnerGroups}
          filename={`${selectedProject.projectName}_points.csv`}
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Download Excel
        </CSVLink>
      </Button>
    );
  } else {
    return (
      <LoadingButton loading variant="contained">
        Download Excel
      </LoadingButton>
    );
  }
}

export default ExportCSV;
