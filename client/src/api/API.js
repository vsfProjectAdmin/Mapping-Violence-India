import axios from 'axios';

// Fetch incidents
export const getIncidents = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/incidents/get-incidents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incidents:', error);
  }
};

// Add a new incident
export const addIncident = async (incidentData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/incidents/add-incident`, incidentData);
    console.log('New Incident Added:', response.data);
  } catch (error) {
    console.error('Error adding incident:', error);
  }
};
