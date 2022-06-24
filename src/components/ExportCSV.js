import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

function ExportCSV({ selectedProject }) {
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
    selectedProject.learnerGroups.forEach((group) => {
      let tempObject = {
        groupName: group.groupName,
      };
      selectedProject.tasks.forEach((task, taskIndex) => {
        tempObject[task.taskName] = !!group.points.length
          ? !!Object.keys(group.points[taskIndex]).length
            ? group.points[taskIndex].taskPoint
            : 0
          : 0;
      });
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
