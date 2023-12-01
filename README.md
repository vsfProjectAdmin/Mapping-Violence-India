## Installation and Setup

This project is divided into three main components: the client side built with React.js, the server side powered by Express.js, and the database utilizing MySQL. Below are the detailed steps to set up each component:

### Client (React.js)

1. **Clone the Repository**
    
    - Begin by cloning the project repository from GitHub (or another source) to your local machine.
2. **Install Dependencies**
    
    - Navigate to the client directory: `cd path/to/client`
    - Run `npm install` to install all necessary dependencies listed in the `package.json` file.
3. **Environment Variables**
    
    - there are 2 environment variables, such as API endpoints, in a `.env` file within the client directory.
    - `REACT_APP_BASE_URL` is the server endpoint. currently `http://localhost:3001`
    - `REACT_APP_EMAIL` is the email address for feedback
1. **Start the Client**
    
    - Once dependencies are installed and environment variables are set, start the client application by running `npm start`.
    - The React app should now be running on `http://localhost:3000` or another specified port.

### Server (Express.js)

1. **Navigate to the Server Directory**
    
    - Change to the server directory: `cd path/to/server`
2. **Install Dependencies**
    
    - Like the client, run `npm install` to install dependencies.
3. **Set Up Environment Variables**
    
    - The database connection is currently handled within `/config/databaseConnection.js`
    - you will need to replace 
    
```js
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Nakl_3349',
  database: 'sql_workbench'
});
```
with your database credentials.

1. **Start the Server**
    
    - Launch the Express server by running `npm run start` or a similar command.
    - Ensure the server is running and listening on the appropriate port (e.g., `http://localhost:3001`).

### Database (MySQL)

1. **Install MySQL**
    
    - Ensure MySQL is installed on your machine. If it's not installed, download and install it from the official MySQL website.
2. **Load the Database Dump**
    
    - Locate the MySQL dump file provided with the project. This file usually has a `.sql` extension.
    - Open your MySQL command line tool or a database management tool like phpMyAdmin.
    - Create a new database for the project: `CREATE DATABASE your_database_name;`
    - Select the database: `USE your_database_name;`
    - Load the dump into the database using the command: `source path/to/your/dumpfile.sql;`
        - In the MySQL command line, this can be done by navigating to the directory containing the dump file and running the command.
        - If using a GUI tool, there might be an option to import a database from a file. Navigate through the tool's menu to find this option.
## Key Components

### Contact.js

1. **Using FormSubmit.co**: The form's action URL is set to FormSubmit.co's endpoint, using an environment variable for the email address (`REACT_APP_EMAIL`). This service handles form submissions and sends them as emails.
    
2. **Form Submission**: When the user submits the form, FormSubmit.co processes the data and forwards it to the specified email.
    
3. **No Backend Required**: This setup eliminates the need for backend email handling, adding simplicity and security, as sensitive email details are not exposed in the frontend code.

### Map.js 

**Imports and Setup**:
    - The component imports React, Leaflet (a JavaScript library for interactive maps), and `react-leaflet` components.
    - It also imports a custom marker icon and a CSS file for styling.
**Map Component**:
    - `Map` is a functional React component that takes `incidents` as a prop, which is an array of incident data.
    - The map is centered on coordinates [20.5937, 78.9629] (somewhere in India) with specified max bounds and a zoom level.
**Custom Marker Icon**:
    - A custom icon for markers is created using Leaflet's `L.Icon`, with the icon URL pointing to the imported `markerIcon`.

### Backend FindCoords.js

This JavaScript module implements a "3-tier fallback" strategy for obtaining geographical coordinates for incident data, with the aim of ensuring that coordinates are always provided, even if precise data is unavailable. Here's a concise overview:

1. **Initial Attempt - City Coordinates**: The module first tries to fetch precise coordinates for an incident based on its city/district and state using the `getCityCoords` function. If successful and the coordinates are within India (checked by `isWithinIndia`), it slightly randomizes these coordinates.
    
2. **First Fallback - State Coordinates**: If fetching city coordinates fails or they are outside India, the module falls back to using predefined state coordinates from `stateCoords`. These coordinates are then randomized within a broader range.
    
3. **Second Fallback - Default Coordinates**: In cases where state coordinates are also unavailable, it resorts to a default set of coordinates, applying a larger random offset for variability.

### Backend FormatDataController.js

This code defines a development-only Express router endpoint, `/processIncidents`, designed to process a large amount of incident data lacking coordinates. It follows these steps:

1. **Fetching Incidents**: Uses the `fetchIncidents` function to retrieve all incidents from the database.
2. **Assigning Coordinates**: For each incident, it asynchronously calls `getCoordinates` to assign geographical coordinates.
3. **Updating Database**: After assigning coordinates, each incident's data is updated in the database using `updateIncident`.
4. **Batch Processing**: Incidents are processed in intervals (1 second apart) to manage the load, suitable for large datasets.

This endpoint's primary function is to efficiently assign and update coordinates for incidents in a development environment.