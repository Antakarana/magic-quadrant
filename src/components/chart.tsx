import React from "react";
import "../styles/chart.css";

const Chart: React.FC = ({ children }) => {
  return (
    <div className="container-chart">
      <span className="text-chart text-chart-left">Ability to execute →</span>
      <div className="container-chart-label">
        <div className="top-chart-label">
          <span className="chart-label">Challengers</span>
        </div>
        <div className="top-chart-label">
          <span className="chart-label">Leaders</span>
        </div>
        <div className="bottom-chart-label">
          <span className="chart-label">Niche Players</span>
        </div>
        <div className="bottom-chart-label">
          <span className="chart-label">Visionaries</span>
        </div>
      </div>
      <span className="text-chart text-chart-bottom">
        Completeness Of Vision →
      </span>
      {children}
    </div>
  );
};

export { Chart };
