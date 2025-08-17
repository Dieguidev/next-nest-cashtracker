"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#dc2626" : "#F59E0B",
          trailColor: "#e1e1e1",
          textColor: "#F59E0B",
          textSize: 8,
        })}
        value={+percentage}
        text={`${percentage}% Gastado`}
      />
    </div>
  );
};
