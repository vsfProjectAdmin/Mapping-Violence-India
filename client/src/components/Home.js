import React, { useEffect, useState } from "react";
import { getIncidents } from "../api/API";
import Heatmap from "./Heatmap";
import Map from "./Map";
import CategoryBarChart from "./CategoryBarChart";
import StateBarChart from "./StateBarChart";

function Home() {
  const [incidents, setIncidents] = useState(null);

  useEffect(() => {
    getIncidents()
      .then((data) => {
        setIncidents(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching incidents:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Religious Violence in India
      </h1>
      <p className="mb-8">
        Religious violence in India has a complex history and multiple causes,
        including socio-economic factors, cultural clashes, and political
        motivations.
      </p>

      <div className="text-center text-gray-100 pt-28">
        {incidents ? (
          <Map incidents={incidents} />
        ) : (
          <p>Loading incidents...</p>
        )}
      </div>
      <div className="text-center text-gray-100 pt-28">
        {incidents ? (
          <Heatmap incidents={incidents} />
        ) : (
          <p>Loading heatmap...</p>
        )}
      </div>
      <div className="text-center text-gray-100 pt-28">
        {incidents ? (
          <CategoryBarChart incidents={incidents} />
        ) : (
          <p>Loading Category Bar Chart...</p>
        )}
      </div>
      <div className="text-center text-gray-100 pt-28">
        {incidents ? (
          <StateBarChart incidents={incidents} />
        ) : (
          <p>Loading State Bar Chart...</p>
        )}
      </div>
    </div>
  );
}

export default Home;