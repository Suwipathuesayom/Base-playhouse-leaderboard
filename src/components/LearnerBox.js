import React from "react";
import getRankColor from "./Functions/getRankColor";

class LearnerBox extends React.Component {
  render() {
    return (
      <div
        className={`learner__box`}
        style={{
          backgroundColor: getRankColor(
            this.props.rankIndex,
            this.props.project.theme.top3
          ),
          border:
            this.props.groupNameParams === this.props.groupName
              ? `3px solid ${this.props.project.theme.hilight}`
              : 0,
        }}
      >
        <h3>{this.props.rankIndex + 1}</h3>
        {!this.props.smallScreen && (
          <img
            src={`https://picsum.photos/200/300?random=${this.props.groupIndex}`}
            alt="not found"
          />
        )}
        {!this.props.smallScreen && <h3>{this.props.groupIndex}</h3>}
        <h2>{this.props.groupName}</h2>
        <h3>
          {this.props.project.useWeight
            ? this.props.totalWeightPoint
            : this.props.totalPoint}
        </h3>
      </div>
    );
  }
}

export default LearnerBox;
