const { stateCoords } = require('../constants/Constants');
const { getCityCoords } = require('../api/CityAPI');

const getRandomOffset = (lat, lon, margin) => {
    const latOffset = (Math.random() - 0.5) * 2 * margin;
    const lonOffset = (Math.random() - 0.5) * 2 * margin;
    lat = parseFloat(lat) + latOffset;
    lon = parseFloat(lon) + lonOffset;
    return {lat, lon};
}

const isWithinIndia = (lat, lon) => {
  const north = 37.0902;
  const south = 8.0622;
  const east = 97.3954;
  const west = 68.1624;
  lat = parseFloat(lat);
  lon = parseFloat(lon);
  return lat >= south && lat <= north && lon >= west && lon <= east;
};

async function getCoordinates(incidentData) {
    let coords = {};

    try {
      coords = await getCityCoords(incidentData.INCI_PLACE_CITY_DISTRICT, incidentData.INCI_STATE_UT);

      isWithinIndia(coords.lat, coords.lon)
        ? coords = getRandomOffset(coords.lat, coords.lon, .025) 
        : (() => { throw new Error('Coordinates are outside of India.') });

    } catch (error) {
      console.error(`Error getting city coordinates: ${error}. Now using state coordinates...`);

      if (stateCoords[incidentData.INCI_STATE_UT] !== undefined) {
        [coords.lat, coords.lon] = stateCoords[incidentData.INCI_STATE_UT];
        coords = getRandomOffset(coords.lat, coords.lon, 1);
      } else {
          // Handle the undefined case, maybe set default values or log an error
          console.log(`Coordinates not found for state: ${incidentData.INCI_STATE_UT}`);
          coords = getRandomOffset("21.814333", "78.158709", 4.5);
      }
    }

    return {
      lat: coords.lat,
      lon: coords.lon
    };
  }

  module.exports = { getCoordinates };



