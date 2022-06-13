import React from 'react'
import "../assets/Styles/SpeakerScreen.css"
import marvel from "../assets/image/marvel.png"
import crown from "../assets/image/crown1.png"

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
            <div className="crown1-image">
              <img src={crown} alt="crown1" className="crown1" />
            </div>
            <div className="col-table1">
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
    </div>

  )
}

export default SpeakerScreen