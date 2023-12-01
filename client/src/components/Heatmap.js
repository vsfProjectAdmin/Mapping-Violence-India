import React from "react";
import InteractiveHeatmap from "./HeatMapConstructor";
import "../css/heatmap.css";
import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
const getColorForCount = (count) => {
  const colorClasses = [
    "color-scale-0",
    "color-scale-1",
    "color-scale-2",
    "color-scale-3",
  ];
  return colorClasses[count] || "color-scale-3";
};

const Heatmap = ({ incidents }) => {
  const updatedData = incidents.map((item) => ({
    ...item,
    date: item.INCI_DATE.split("T")[0],
  }));

  const dateCounts = {};
  updatedData.forEach((item) => {
    const { date } = item;
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const newData = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  const [heatmapData, setHeatmapData] = useState([]);

  // Use useEffect to set heatmapData when newData changes
  useEffect(() => {
    setHeatmapData(newData);
    ReactTooltip.rebuild();
  }, [newData]);

  // console.log(heatmapData);

  const handleClick = (value) => {
    if (value && value.date) {
      alert(`On ${value.date}, the incident count is ${value.count} `);
    }
  };

  const handleMouseOver = (event, value) => {
    if (value && value.date) {
      event.target.setAttribute(
        "data-tip",
        `On ${value.date}, the incident count is ${value.count} `
      );
    }
  };

  const handleMouseLeave = (event) => {
    event.target.removeAttribute("data-tip"); // Remove data-tip attribute to hide the tooltip
  };

  const classForValue = (value) => {
    if (value && value.count) {
      return getColorForCount(value.count);
    }
    return "color-empty";
  };

  const getTooltipDataAttrs = (value) => {
    // handle null value.date issue
    if (!value || !value.date) {
      return null;
    }
    // Configuration for react-tooltip
    return {
      "data-tip": `Date: ${value.date}, Count: ${value.count}`,
    };
  };
  const currentYear = new Date().getFullYear(); //Code to get the year of the current date, avoid users from filling in the wrong date(>current date)
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Create an array from 2022 year - current year
  const EveryRecentYear = Array.from(
    { length: currentYear - 2021 }, //
    (_, index) => currentYear - index
  );

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const startDate = new Date(selectedYear + "-01-01");
  const endDate = new Date(selectedYear + "-12-31");

  // Define the labels for the days of the week
  const dayLabels = ["Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."];
  return (
    <div className="calendar-container">
      <div classNmae="flex-container">
        <div className="labelOfYear">
          <label>Daily incidents in</label>
          <select value={selectedYear} onChange={handleYearChange}>
            {EveryRecentYear.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="legend">
            <div className="legend-item">
              <div className="legend-square-0 legend-square">0</div>
            </div>
            <div className="legend-item">
              <div className="legend-square-1 legend-square">1</div>
            </div>
            <div className="legend-item">
              <div className="legend-square-2 legend-square">2</div>
            </div>
            <div className="legend-item">
              <div className="legend-square-3 legend-square">3+</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div className="dayLabels-container">
          {/* Add the day labels here */}
          <div className="day-labels">
            {dayLabels.map((label, index) => (
              <div key={index} className="day-label">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="heatmap-container">
          <InteractiveHeatmap
            values={heatmapData}
            startDate={startDate}
            endDate={endDate}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            classForValue={classForValue}
            tooltipDataAttrs={getTooltipDataAttrs}
          />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
