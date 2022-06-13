import React from "react";
import "../assets/styles/SpeakerScreen.css";
import marvel from "../assets/image/marvel.png";
// import crown from "../assets/image/crown1.png";
// import avatar from "../assets/image/avatar1.png";
// import avatar2 from "../assets/image/avatar2.png";
// import avatar3 from "../assets/image/avatar3.png";
import { Box } from "@mui/material";

function SpeakerScreen() {
  // const [data] = useState({
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
  //     top3: "#ff0000",
  //     hilight: "#ffffff",
  //   },
  //   learnerGroups: [
  //     {
  //       groupName: "Avengers",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "Inhumans",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "X-men",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "Avengers",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "Inhumans",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
  //     },
  //     {
  //       groupName: "X-men",
  //       avatar: "string",
  //       points: {
  //         taskIndex: 0,
  //         taskPoint: 0,
  //       },
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

  return (
    <div className="header">
      <h1>LEADERBOARD</h1>
      <div className="marvel-image">
        <img src={marvel} alt="marvel" className="marvel" />
        <div className="bg-project"></div>
        <div className="title">
          <h2>PROJECT AVENGERS</h2>
        </div>
        <div className="bg-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">RANK</th>
                <th scope="col">GROUP</th>
                <th scope="col">NAME</th>
                <th scope="col">TOTAL</th>
              </tr>
            </thead>
          </table>
          <div className="bg-tables">
            {/* {data.learnerGroups.map((group, index) => {
              console.log(group.groupName);
              return (
                <div className={`col-table${index + 1}`}>
                  <h2>{index + 1}</h2>
                  <div className={`avatar${index + 1}-image`}>
                    <img
                      src={require(`../assets/image/avatar${
                        ((index + 1) % 3) + 1
                      }.png`)}
                      alt={`avatar${index + 1}`}
                      className={`avatar${index + 1}`}
                    />
                  </div>
                  <h2>{group.groupName}</h2>
                </div>
              );
            })} */}
            <Box
              sx={{
                width: "100%",
                height: 38,
                borderRadius: 17,
                backgroundColor: "yellow",
              }}
            >
              {5555}
            </Box>
            {/* <div className="col-table1">
              <h2>1</h2>
              <div className="crown1-image">
                <img src={crown} alt="crown1" className="crown1" />
              </div>
              <div className="avatar1-image">
                <img src={avatar} alt="avatar1" className="avatar1" />
              </div>
              <div className="col-table2">
                <h2>2</h2>
                <div className="avatar2-image">
                  <img src={avatar2} alt="avatar2" className="avatar2" />
                </div>
              </div>
              <div className="col-table3">
                <h2>3</h2>
                <div className="avatar3-image">
                  <img src={avatar3} alt="avatar3" className="avatar3" />
                </div>
              </div>
              <div className="col-table4">
                <h2>4</h2>
                <div className="avatar1-image">
                  <img src={avatar} alt="avatar1" className="avatar1" />
                </div>
              </div>
              <div className="col-table5">
                <h2>5</h2>
                <div className="avatar2-image">
                  <img src={avatar2} alt="avatar2" className="avatar2" />
                </div>
              </div>
              <div className="col-table6">
                <h2>6</h2>
                <div className="avatar6-image">
                  <img src={avatar3} alt="avatar6" className="avatar6" />
                </div>
              </div>
              <div className="col-table7">
                <h2>7</h2>
                <div className="avatar1-image">
                  <img src={avatar} alt="avatar7" className="avatar7" />
                </div>
              </div>
              <div className="col-table8">
                <h2>8</h2>
                <div className="avatar2-image">
                  <img src={avatar2} alt="avatar8" className="avatar8" />
                </div>
              </div>
              <div className="col-table9">
                <h2>9</h2>
                <div className="avatar3-image">
                  <img src={avatar3} alt="avatar3" className="avatar3" />
                </div>
              </div>
              <div className="col-table10">
                <h2>10</h2>
                <div className="avatar1-image">
                  <img src={avatar} alt="avatar1" className="avatar1" />
                </div>
              </div>
              <div className="col-table11">
                <h2>11</h2>
                <div className="avatar2-image">
                  <img src={avatar2} alt="avatar2" className="avatar2" />
                </div>
              </div>
            </div> */}
          </div>
          <div className="table-point">
            <table class="col-point">
              <thead>
                <tr>
                  <th scope="col">POINT 1</th>
                  <th scope="col">POINT 2</th>
                  <th scope="col">POINT 3</th>
                  <th scope="col">POINT 4</th>
                  <th scope="col">POINT 5</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="bg-point">
            <div className="bg-col1">
              <div className="bg-col2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakerScreen;
