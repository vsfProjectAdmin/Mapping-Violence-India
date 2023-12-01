const express = require("express");
const router = express.Router();
const IncidentsModel = require("../models/IncidentModal");
const { db } = require("../config/databaseConnection");

router.get("/get-incidents", (req, res) => {
  const query = "SELECT * FROM `sql_workbench`.`incidents`";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.stack);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

router.post("/add-incident", (req, res) => {
  // Get the data from the request body
  const incidentData = req.body;

  // Call a function to insert the data into the database
  IncidentsModel.createIncident(incidentData, (error, insertId) => {
    if (error) {
      console.error("Error inserting incident data:", error);
      res
        .status(500)
        .json({ error: "Failed to insert data into the database" });
    } else {
      console.log("Inserted new incident with ID:", insertId);
      res
        .status(201)
        .json({ message: "Incident data inserted successfully", insertId });
    }
  });
});

module.exports = router;
