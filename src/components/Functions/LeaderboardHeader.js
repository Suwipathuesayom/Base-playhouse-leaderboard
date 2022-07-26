import "./LeaderboardHeader.css";
const LeaderboardHeader = ({ project }) => {
  return (
    <div>
      <div className="leaderboardHeader-container">
        <img src={project.imageUrl} alt="" />
        <div className="leaderboard-textheader">
          <h1>{project.projectName}</h1>
          <h2>LEADERBOARD</h2>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
