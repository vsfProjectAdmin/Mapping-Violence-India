import React from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";

const InteractiveHeatmap = ({
  values,
  startDate,
  endDate,
  onClick,
  onMouseOver,
  onMouseLeave,
  classForValue,
  tooltipDataAttrs,
}) => {
  return (
    <div className="interactive-heatmap-container">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={classForValue}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        tooltipDataAttrs={tooltipDataAttrs}
      />
      <ReactTooltip />
    </div>
  );
};

export default InteractiveHeatmap;
