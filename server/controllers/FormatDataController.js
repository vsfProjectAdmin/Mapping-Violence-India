const express = require("express");
const router = express.Router();
const { db } = require("../config/databaseConnection");
const { getCoordinates } = require("../services/FindCoords");

// Function to fetch incidents from the database using a callback
function fetchIncidents(callback) {
  const query = "SELECT * FROM `sql_workbench`.`incidents`";
  db.query(query, function (error, results) {
    if (error) {
      console.error("Error fetching incidents: " + error.stack);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function updateIncident(id, latitude, longitude) {
  const query = `
        UPDATE \`sql_workbench\`.\`incidents\`
        SET INCI_LATITUDE = ?, INCI_LONGITUDE = ?
        WHERE id = ?;
    `;

  db.query(query, [latitude, longitude, id], function (error, results) {
    if (error) {
      console.error("Error updating incident: " + error.stack);
    } else {
      console.log("Incident updated successfully.");
    }
  });
}

// Endpoint to process incidents
router.get("/processIncidents", (req, res) => {
  fetchIncidents((error, incidents) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    let ceiling = incidents.length;
    let id = 0;

    const interval = setInterval(function () {
      console.log("Iteration: " + id);

      getCoordinates(incidents[id]).then((coords) => {
        if (incidents[id]) {
          incidents[id].INCI_LATITUDE = coords.lat;
          incidents[id].INCI_LONGITUDE = coords.lon;

          console.log(incidents[id]);
          updateIncident(
            id,
            incidents[id].INCI_LATITUDE,
            incidents[id].INCI_LONGITUDE
          );
        }
      });

      if (++id >= ceiling) {
        clearInterval(interval);
      }
    }, 1000); // Delay of 1 second

    res.json({ message: "Incidents processed successfully", data: incidents });
  });
});

module.exports = router;
