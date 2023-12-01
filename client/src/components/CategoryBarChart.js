import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { categories } from "../constants/Constants";
const CategoryBarChart = ({ incidents }) => {
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const calculateCategoryCounts = () => {
      const counts = {};

      incidents.forEach((incident) => {
        const incidentDate = moment(incident.INCI_DATE);

        const yearMonth = incidentDate.format("YYYY-MM");

        if (!counts[yearMonth]) {
          counts[yearMonth] = {};
        }

        if (!counts[yearMonth][incident.INCI_CATEGORY]) {
          counts[yearMonth][incident.INCI_CATEGORY] = 1;
        } else {
          counts[yearMonth][incident.INCI_CATEGORY]++;
        }
      });

      setCategoryCounts(counts);
    };

    calculateCategoryCounts();
  }, [incidents]);
  // console.log(categoryCounts);

  // Transform the counts into the desired format and sort by month in ascending order
  const resultArray = Object.entries(categoryCounts)
    .map(([months, categories]) => {
      const result = { months };
      Object.entries(categories).forEach(([category, count]) => {
        result[category] = count;
      });
      return result;
    })
    .sort((a, b) => new Date(a.months) - new Date(b.months));

  return (
    <ResponsiveContainer width="100%" minWidth={300} minHeight={500}>
      <BarChart data={resultArray}>
        <CartesianGrid />
        <XAxis dataKey="months" />
        <YAxis />
        <Tooltip
          content={({ label, payload }) => {
            const sum = payload.reduce((acc, entry) => acc + entry.value, 0);
            return (
              <div
                className="custom-tooltip"
                style={{ backgroundColor: "white", padding: "8px" }}
              >
                <p style={{ color: "black" }}>{label}</p>
                {payload.map((entry, index) => (
                  <p key={index}>
                    <span
                      style={{
                        color:
                          entry.dataKey === "months" ? "black" : entry.fill,
                      }}
                    >
                      {`${entry.name}: ${entry.value}`}
                    </span>
                  </p>
                ))}
                <p style={{ color: "black", fontWeight: "bold" }}>
                  Total: {sum}
                </p>
              </div>
            );
          }}
        />
        <Legend />
        {categories.map((c) => {
          if (c === categories[0]) {
            return <Bar dataKey={c} stackId="a" fill="#558B80" />;
          } else if (c === categories[1]) {
            return <Bar dataKey={c} stackId="a" fill="#D1E000" />;
          } else if (c === categories[2]) {
            return <Bar dataKey={c} stackId="a" fill="#E29B50" />;
          } else if (c === categories[3]) {
            return <Bar dataKey={c} stackId="a" fill="#41DC4C" />;
          } else if (c === categories[4]) {
            return <Bar dataKey={c} stackId="a" fill="#997AB8" />;
          } else if (c === categories[5]) {
            return <Bar dataKey={c} stackId="a" fill="#FA7596" />;
          } else {
            return <Bar dataKey={c} stackId="a" fill="#222222" />; //static bar color
          }
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryBarChart;
