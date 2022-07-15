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
              <h3 key={pointIndex}>{point.taskWeightPoint}</h3>
            ))}
        </div>
      </div>
    );
  }
}

export default SpeakerBox;
