import "./LeaderboardHeader.css";

const LeaderboardHeader = ({ project }) => {
  return (
    <div className="leaderboardHeader-container">
      <img src={project.imageUrl} alt="" />
      <div className="leaderboardHeader-textheader">
        <h1>{project.projectName}</h1>
        <h2>LEADERBOARD</h2>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
