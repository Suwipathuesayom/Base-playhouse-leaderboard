import React from 'react'
import "../assets/Styles/SpeakerScreen.css"
import marvel from "../assets/image/marvel.png"
import crown from "../assets/image/crown1.png"
import avatar from "../assets/image/avatar1.png"
import avatar2 from "../assets/image/avatar2.png"
import avatar3 from "../assets/image/avatar3.png"

function SpeakerScreen() {
  return (
    <div className="header">
      <h1>LEADERBOARD</h1>
      <div className="marvel-image">
        <img src={marvel} alt="marvel" className="marvel" />
        <div className="bg-project">
        </div>
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
            <div className="col-table1">
              <h2>1</h2>
              <div className="crown1-image">
                <img src={crown} alt="crown1" className="crown1" />
              </div >
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
            </div>
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
              <div className="bg-col2">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

export default SpeakerScreen