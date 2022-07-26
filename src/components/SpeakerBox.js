import React from "react";
import "../assets/styles/Speaker.css";

class SpeakerBox extends React.Component {
  render() {
    return (
      <div className="speaker__box">
        <div className="speaker__boxSpeaker">
          {this.props.points
            .filter((point) => !point.isHidden)
            .map((point, pointIndex) => (
              <h3 key={pointIndex}>
                {this.props.project.useWeight
                  ? point.taskWeightPoint
                  : point.taskPoint}
              </h3>
            ))}
        </div>
      </div>
    );
  }
}

export default SpeakerBox;
