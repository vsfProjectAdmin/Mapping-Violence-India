import React, { useEffect, useState } from "react";
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
        const incidentDate = new Date(incident.INCI_DATE);
        const yearMonth = `${incidentDate.getFullYear()}-${(
          incidentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;

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

  // Transform the counts into the desired format
  const resultArray = Object.entries(categoryCounts).map(
    ([months, categories]) => {
      const result = { months };
      Object.entries(categories).forEach(([category, count]) => {
        result[category] = count;
      });
      return result;
    }
  );
  console.log(resultArray);
  // const months = resultArray.map((entry) => entry.months);
  // console.log(months);

  return (
    <ResponsiveContainer width="100%" minWidth={300} minHeight={500}>
      <BarChart data={resultArray}>
        <CartesianGrid />
        <XAxis dataKey="months" />
        <YAxis />
        <Tooltip />
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
