const axios = require('axios');

/* USAGE
getCityCoords('Austin', 'Texas')
  .then(coordinates => console.log(coordinates))
  .catch(error => console.error(error));
*/
async function getCityCoords(city, state) {
  try {
    const query = `${city}, ${state}`;
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json'
      },
      headers: {
        'User-Agent': 'Your application name here'
      }
    });

    const data = response.data[0];
    if(data) {
      const lat = data.lat;
      const lon = data.lon; 
      return { lat, lon };
    } else {
      throw new Error("No data found for the given city.");
    }
  } catch (error) {
    console.error("Error fetching lat-long:", error);
    throw error;
  }
}

module.exports = { getCityCoords }
