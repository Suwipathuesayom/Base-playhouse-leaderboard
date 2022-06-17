import * as React from "react";
import { db } from "../config/firebase";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import color from "../constant/color";
import { Box, Stack, Typography } from "@mui/material";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // width: 200,
    backgroundColor: color.primaryOrange,
    color: theme.palette.common.white,
    borderBottomWidth: 0,
    fontSize: 20,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.white,
    borderBottomWidth: 0,
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: color.secondaryBlack,
  },
  "&:nth-of-type(even)": {
    backgroundColor: color.primaryBlack,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// function totalIt() {
//   var input = document.getElementsByName("product");
//   var total = 0;
//   for (var i = 0; i < input; i++) {
//     if (input[i].checked) {
//       total += parseFloat(input[i].value);
//     }
//   }
//   document.getElementById("total").value = "$" + total.toFixed(2);
// }

// console.log("product", "total");

// function createData(name, calories, product, carbs, protein, A4, Total) {
//   return { name, calories, product, carbs, protein, A4, Total };
// }

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };
// }

// const rows = [
//   createData(
//     "กลุ่มที่1",
//     "แตงโมง",
//     <Checkbox
//       input
//       name="product"
//       value="5.50"
//       type="checkbox"
//       onclick="totalIt()"
//     />,
//     <input value="$0.00" readonly="readonly" type="text" id="total" />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่2",
//     "ไก่ย่าง",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่3",
//     "กลัวยหอม",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่4",
//     "ว๊าวซ่า",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่5",
//     "แอปเปิ้ล",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่6",
//     "แมส",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
//   createData(
//     "กลุ่มที่7",
//     "สายไฟ",
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     <Checkbox />,
//     5
//   ),
// ];

export default function MentorTable({ dummyData, setDummyData }) {
  // const [dummyData, setDummyData] = React.useState({
  //   createdAt: new Date(),
  //   imageUrl:
  //     "https://i.pinimg.com/originals/7d/bf/df/7dbfdf56a94c044e0684aba891816a37.jpg",
  //   projectName: "Marvel",
  //   mentors: [
  //     {
  //       index: 1,
  //       fullName: "Stan Lee",
  //     },
  //     {
  //       index: 2,
  //       fullName: "Thanat Raktham",
  //     },
  //   ],
  //   theme: {
  //     top3: "#ff00ff",
  //     hilight: "#ffffff",
  //   },
  //   learnerGroups: [
  //     {
  //       groupIndex: 0,
  //       groupName: "Avengers",
  //       avatar: "string",
  //       totalPoint: -1,
  //       points: [],
  //     },
  //     {
  //       groupIndex: 1,
  //       groupName: "Inhumans",
  //       avatar: "string",
  //       totalPoint: -1,
  //       points: [],
  //     },
  //     {
  //       groupIndex: 1,
  //       groupName: "X-men",
  //       avatar: "string",
  //       totalPoint: -1,
  //       points: [],
  //     },
  //   ],
  //   tasks: [
  //     {
  //       taskName: "สู้ Alien บุกโลก",
  //       subTasks: [
  //         {
  //           subTaskName: "ยืนล้อมวงเท่",
  //           point: 2,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "จับ Loki",
  //           point: 7,
  //           isHidden: false,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 9,
  //       weight: 10,
  //       isHidden: false,
  //     },
  //     {
  //       taskName: "เอาชนะ Ultron",
  //       subTasks: [
  //         {
  //           subTaskName: "ยกเมืองขึ้นฟ้า",
  //           point: 1,
  //           isHidden: false,
  //         },
  //         {
  //           subTaskName: "เอาเมืองไปไว้ที่เดิม",
  //           point: 1,
  //           isHidden: true,
  //         },
  //       ],
  //       showSubTasks: false,
  //       point: 2,
  //       weight: 20,
  //       isHidden: false,
  //     },
  //   ],
  // });
  const [learnerGroups, setLearnerGroups] = React.useState(
    dummyData?.learnerGroups
  );

  const handleUpdateProject = async (tempProject) => {
    try {
      let userRef = db.collection("users").doc("Nh6Zpe910nV0Osc2cBAEMP9CsjJ2");

      await userRef
        .collection("project")
        .doc(tempProject.id)
        .update(tempProject)
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckTaskByIndex = (index, subIndex) => {
    // handle UI State
    const tempLearnerGroups = dummyData.learnerGroups;
    if (tempLearnerGroups[index].points.length === 0) {
      for (let i = 0; i < dummyData.tasks.length; i++) {
        tempLearnerGroups[index].points.push({});
      }
    }
    if (Object.keys(tempLearnerGroups[index].points[subIndex]).length === 0) {
      tempLearnerGroups[index].points[subIndex] = {
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      };
    } else {
      tempLearnerGroups[index].points[subIndex].isChecked =
        !tempLearnerGroups[index].points[subIndex].isChecked;
    }
    tempLearnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempLearnerGroups,
      index
    );
    setLearnerGroups([...tempLearnerGroups]);

    // handle Data State
    const tempDummyData = dummyData;
    if (tempDummyData.learnerGroups[index].points.length === 0) {
      for (let i = 0; i < dummyData.tasks.length; i++) {
        tempDummyData.learnerGroups[index].points.push({});
      }
    }
    if (
      Object.keys(tempDummyData.learnerGroups[index].points[subIndex])
        .length === 0
    ) {
      tempDummyData.learnerGroups[index].points[subIndex] = {
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      };
    } else {
      tempDummyData.learnerGroups[index].points[subIndex].isChecked =
        tempLearnerGroups[index].points[subIndex].isChecked;
    }
    tempDummyData.learnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempDummyData.learnerGroups,
      index
    );
    setDummyData(tempDummyData);
    handleUpdateProject(tempDummyData);
  };

  const calculateNewTotalPoint = (arr, index) => {
    let sum = 0;
    arr[index].points.forEach((point) => {
      if (point.isChecked) {
        sum = sum + point.taskPoint;
      }
    });
    return sum;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, marginTop: 0, borderRadius: 20, minHeight: 650 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>GROUP</StyledTableCell>
            <StyledTableCell>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontWeight={600} fontSize={20}>
                  NAME
                </Typography>
                <Box
                  sx={{
                    width: "2px",
                    height: "50px",
                    backgroundColor: "white",
                  }}
                />
              </Stack>
            </StyledTableCell>
            {dummyData?.tasks.map((task, subIndex) => {
              if (!task.isHidden) {
                return (
                  <StyledTableCell key={subIndex}>
                    {task.taskName}
                  </StyledTableCell>
                );
              }
              return <div></div>;
              // ** DO NOT DELETE !!! Later for handling subTask

              // if (!!!task.subTasks.length) {
              //   return (
              //     <StyledTableCell key={subIndex}>
              //       {task.taskName}
              //     </StyledTableCell>
              //   );
              // } else {
              //   return task.subTasks.map((subTask, subTaskIndex) => (
              //     <StyledTableCell key={subIndex}>
              //       {subTask.subTaskName}
              //     </StyledTableCell>
              //   ));
              // }
            })}
            <StyledTableCell>TOTAL</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learnerGroups.map((group, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {group.groupIndex}
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" justifyContent={"space-between"}>
                    {group.groupName}
                    <Box
                      sx={{
                        width: "2px",
                        height: "50px",
                        backgroundColor: "white",
                      }}
                    />
                  </Stack>
                </StyledTableCell>
                {dummyData?.tasks.map((task, subIndex) => {
                  if (!task.isHidden) {
                    return (
                      <StyledTableCell key={subIndex}>
                        <Checkbox
                          icon={<RadioButtonUnchecked />}
                          checkedIcon={<RadioButtonChecked />}
                          checked={
                            group.points[subIndex]
                              ? group.points[subIndex]?.isChecked
                                ? group.points[subIndex].isChecked
                                : false
                              : false
                          }
                          onChange={() =>
                            handleCheckTaskByIndex(index, subIndex)
                          }
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: color.primaryOrange,
                            },
                          }}
                        />
                      </StyledTableCell>
                    );
                  }
                  return <div></div>;
                  // ** DO NOT DELETE !!! Later for handling subTask

                  // if (!!!task.subTasks.length) {
                  //   return (
                  //     <StyledTableCell key={subIndex}>
                  //       <Checkbox
                  //         checked={
                  //           group.points[subIndex]
                  //             ? group.points[subIndex]?.isChecked
                  //               ? group.points[subIndex].isChecked
                  //               : false
                  //             : false
                  //         }
                  //         onChange={() =>
                  //           handleCheckTaskByIndex(index, subIndex)
                  //         }
                  //       />
                  //     </StyledTableCell>
                  //   );
                  // } else {
                  //   return task.subTasks.map((subTask, subTaksIndex) => (
                  //     <StyledTableCell key={subIndex}>
                  //       <Checkbox
                  //         checked={
                  //           group.points[subIndex]
                  //             ? group.points[subIndex]?.isChecked
                  //               ? group.points[subIndex].isChecked
                  //               : false
                  //             : false
                  //         }
                  //         onChange={() =>
                  //           handleCheckTaskByIndex(index, subIndex)
                  //         }
                  //       />
                  //     </StyledTableCell>
                  //   ));
                  // }
                })}
                <StyledTableCell>
                  {group.totalPoint < 0 ? 0 : group.totalPoint}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
