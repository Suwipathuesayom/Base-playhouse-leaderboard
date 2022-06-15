import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
// import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
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

export default function CustomizedTables() {
  const [dummyData, setDummyData] = React.useState({
    createdAt: new Date(),
    imageUrl:
      "https://i.pinimg.com/originals/7d/bf/df/7dbfdf56a94c044e0684aba891816a37.jpg",
    projectName: "Marvel",
    mentors: [
      {
        index: 1,
        fullName: "Stan Lee",
      },
      {
        index: 2,
        fullName: "Thanat Raktham",
      },
    ],
    theme: {
      top3: "#ff00ff",
      hilight: "#ffffff",
    },
    learnerGroups: [
      {
        groupIndex: 0,
        groupName: "Avengers",
        avatar: "string",
        totalPoint: -1,
        points: [],
      },
      {
        groupIndex: 1,
        groupName: "Inhumans",
        avatar: "string",
        totalPoint: -1,
        points: [],
      },
    ],
    tasks: [
      {
        taskName: "สู้ Alien บุกโลก",
        subTasks: [
          {
            subTaskName: "ยืนล้อมวงเท่",
            point: 2,
            isHidden: false,
          },
          {
            subTaskName: "จับ Loki",
            point: 7,
            isHidden: false,
          },
        ],
        showSubTasks: false,
        point: 9,
        weight: 10,
        isHidden: false,
      },
      {
        taskName: "เอาชนะ Ultron",
        subTasks: [
          {
            subTaskName: "ยกเมืองขึ้นฟ้า",
            point: 1,
            isHidden: false,
          },
          {
            subTaskName: "เอาเมืองไปไว้ที่เดิม",
            point: 1,
            isHidden: true,
          },
        ],
        showSubTasks: false,
        point: 2,
        weight: 20,
        isHidden: false,
      },
    ],
  });
  const [learnerGroups, setLearnerGroups] = React.useState(
    dummyData.learnerGroups
  );

  const calculateNewTotalPoint = (arr, index) => {
    let sum = 0;
    arr[index].points.forEach((point) => {
      if (point.isChecked) {
        sum = sum + point.taskPoint;
      }
    });
    return sum;
  };

  const handleCheckTaskByIndex = (index, subIndex) => {
    // handle UI State
    const tempLearnerGroups = dummyData.learnerGroups;
    console.log([...tempLearnerGroups]);
    let foundTaskIndex = false;
    tempLearnerGroups[index].points.forEach((point) => {
      if (!foundTaskIndex && (point.taskIndex = subIndex)) {
        point.isChecked = !point.isChecked;
        foundTaskIndex = true;
      }
    });
    if (!foundTaskIndex) {
      tempLearnerGroups[index].points.push({
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      });
    }
    tempLearnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempLearnerGroups,
      index
    );
    setLearnerGroups([...tempLearnerGroups]);
    console.log([...tempLearnerGroups]);

    // handle Data State
    const tempDummyData = dummyData;
    foundTaskIndex = false;
    tempDummyData.learnerGroups[index].points.forEach((point) => {
      if (!foundTaskIndex && (point.taskIndex = subIndex)) {
        point.isChecked = !point.isChecked;
        foundTaskIndex = true;
      }
    });
    if (!foundTaskIndex) {
      tempDummyData.learnerGroups[index].points.push({
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      });
    }
    if (tempDummyData.learnerGroups[index].points[subIndex]) {
      tempDummyData.learnerGroups[index].points[subIndex].isChecked =
        tempLearnerGroups[index].points[subIndex].isChecked;
    } else {
      tempDummyData.learnerGroups[index].points.push({
        isChecked: true,
        taskIndex: subIndex,
        taskPoint: dummyData.tasks[subIndex].point,
      });
    }
    tempDummyData.learnerGroups[index].totalPoint = calculateNewTotalPoint(
      tempDummyData.learnerGroups,
      index
    );
    setDummyData(tempDummyData);
    // console.log(tempDummyData);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, marginTop: 0, borderRadius: 20, minHeight: 650 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>ลำดับกลุ่ม </StyledTableCell>
              <StyledTableCell>ชื่อกลุ่ม</StyledTableCell>
              <StyledTableCell>เกณฑ์&nbsp;(1)</StyledTableCell>
              <StyledTableCell>เกณฑ์&nbsp;(2)</StyledTableCell>
              <StyledTableCell>เกณฑ์&nbsp;(3)</StyledTableCell>
              <StyledTableCell>เกณฑ์&nbsp;(4)</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {learnerGroups.map((group, index) => {
              console.log(learnerGroups);
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {group.groupIndex + 1}
                  </StyledTableCell>
                  <StyledTableCell>{group.groupName}</StyledTableCell>
                  {dummyData?.tasks.map((task, subIndex) => {
                    return (
                      <StyledTableCell key={subIndex}>
                        <Checkbox
                          checked={
                            group.points[subIndex]
                              ? group.points[subIndex].isChecked
                              : false
                          }
                          onChange={() =>
                            handleCheckTaskByIndex(index, subIndex)
                          }
                        />
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell>
                    {group.totalPoint < 0 ? 0 : group.totalPoint}
                  </StyledTableCell>
                  {/* <StyledTableCell>{row.A4}</StyledTableCell>
                <StyledTableCell>{row.Total}</StyledTableCell> */}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <div>
      <Checkbox  />
      <Checkbox  />
      <Checkbox {...label} disabled />
      <Checkbox {...label} disabled checked />
    </div> */}
    </>
  );
}
