import React from "react";
import LearnerBox from "./LearnerBox";
import "../assets/styles/Speaker.css";

class SpeakerBox extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div className="speaker__box">
        {/* <div className="speaker__boxLearner" style={{ marginRight: "20px" }}>
          <LearnerBox {...this.props} />
        </div> */}
        <div className="speaker__boxSpeaker">
          {this.props.points
            .filter((point) => !point.isHidden)
            .map((point) => (
              <h3>{point.taskWeightPoint}</h3>
            ))}
        </div>
      </div>
    );
  }
}

export default SpeakerBox;
