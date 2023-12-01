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
## Key Components (Client)

### CategroyBarChart.js && StateBarChart.js

1. **Purpose**: The component is designed for visualizing incident counts for different `categories`(`states`) per month using the Recharts library. The purpose of importing `categories`(`states`) in `CategroyBarChart.js`(`StateBarChart.js`) component is to use this constant as a source of dynamic data. 

2. **recharts library**: Recharts is a charting library for React that simplifies the process of creating charts and graphs. BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer are used to build a responsive bar chart.

3. **moment library**: The format method of the moment library is used here to ensure the consistency of the date and is not affected by month boundaries. This avoids counting errors when the event occurs on the last day of the previous month or the first day of the next month.

4. **Static Bar Colors(CategroyBarChart.js)**: For each `category`, the `<Bar>` component's fill prop is set to a specific color value based on the category. and these colors don't change dynamically based on the content or order of the data.

5. **Dynamic Bar Colors(StateBarChart.js)**: For each `state`, the `<Bar>` component's fill prop is set to the result of calling `getRandomColor()`. This means each time the chart is refreshed the colors of the bars representing different states will be different.

### Contact.js

1. **Using FormSubmit.co**: The form's action URL is set to FormSubmit.co's endpoint, using an environment variable for the email address (`REACT_APP_EMAIL`). This service handles form submissions and sends them as emails.
    
2. **Form Submission**: When the user submits the form, FormSubmit.co processes the data and forwards it to the specified email.
    
3. **No Backend Required**: This setup eliminates the need for backend email handling, adding simplicity and security, as sensitive email details are not exposed in the frontend code.

### HeatMapConstructor.js && Heatmap.js 

1. **Purpose**: The `HeatMapConstructor.js` file defines a React component named InteractiveHeatmap. This component utilizes the `react-calendar-heatmap` library to create an interactive heatmap visualization. The purpose is to encapsulate the logic for rendering the heatmap, handling user interactions (click, hover), and displaying tooltips. `Heatmap.js` imports InteractiveHeatmap, processes incident data, and uses it to render the overall heatmap visualization with additional UI elements.

2. **InteractiveHeatmap functional component**:
    - `values`: Data points for the heatmap.
    - `startDate` and `endDate`: Define the range of the calendar heatmap.
    - `onClick`, `onMouseOver`, `onMouseLeave`: Callback functions for handling user interactions.
    - `classForValue`: A function that determines the CSS class for a given value, allowing for custom styling.
    - `tooltipDataAttrs`: Additional data attributes for tooltip customization.

3. **CODE: Line 83-86 and Line 102-108**: This code creates an array named `EveryRecentYear` that contains a sequence of years starting from 2022 up to the current year. The array is then used to populate a `<select>` dropdown in a React component. if current year is 2025, `EveryRecentYear` would be an array containing `[2022, 2023, 2024, 2025]`. The array is then used to populate a `<select>` dropdown.

```js
//Line 83-86
const EveryRecentYear = Array.from(
    { length: currentYear - 2021 }, 
    (_, index) => currentYear - index
);
...
//Line 102-108
<select value={selectedYear} onChange={handleYearChange}>
    {EveryRecentYear.map((year) => (
        <option key={year} value={year}>
        {year}
        </option>
    ))}
</select> 
```

### Home.js

1. **Purpose**: The Home component responsible for rendering various visualizations related to religious violence incidents in India.
    - Map: A geographical map visualization `<Map />` that likely displays the geographical distribution of incidents.
    - Heatmap: A calendar heatmap visualization `<Heatmap />` that likely shows a temporal pattern of incidents.
    - Category Bar Chart: A bar chart visualization `<CategoryBarChart />` that likely displays incident counts by category.
    - State Bar Chart: A bar chart visualization `<StateBarChart />` that likely shows incident counts by state.

2. **Code Comments**: The use of conditional rendering `{incidents ? (...) : (...)}` ensures that the visualizations are only rendered once the incident data is available. Otherwise the state will be loaded. 

### IncidentForm.js && SucessModel.js 

1. **Purpose**: This is an incident reporting form. The form is designed to collect information about various incidents, including details such as description, date, category, and subcategory... Users can submit incident reports through this form, and the data is sent to an API (database).

2. **Formik and Yup**: Formik Library is used for managing the state and behavior of the form, and Yup Library is used for defining the validation rules for the form fields.

3. **Dynamic Dropdowns**: The form includes dynamic dropdowns for selecting incident categories and subcategories based on the chosen category. We need import `new_states_api` and different subcategories from `Constants.js`.

4. **Conditional Validation**: The form includes conditional validation for the source field, ensuring it is required only when self-reporting.

5. **Self-Reporting Option**: Users can indicate if they are self-reporting an incident, which triggers additional form fields related to the source of the report. Source and Email share a database column name called `INCI_SOURCE`.

6. **Sucess Model Feedback**: `SucessModel.js` is displayed upon successful submission of an incident report.

### Map.js 

1. **Imports and Setup**:
    - The component imports React, Leaflet (a JavaScript library for interactive maps), and `react-leaflet` components.
    - It also imports a custom marker icon and a CSS file for styling.
2. **Map Component**:
    - `Map` is a functional React component that takes `incidents` as a prop, which is an array of incident data.
    - The map is centered on coordinates [20.5937, 78.9629] (somewhere in India) with specified max bounds and a zoom level.
3. **Custom Marker Icon**:
    - A custom icon for markers is created using Leaflet's `L.Icon`, with the icon URL pointing to the imported `markerIcon`.

### Method.js

1. **Purpose**: The component will inform users of the Violence Every Square Foot project's approach, instruct users on how to contribute to the event.

### Nav.js

1. **Purpose**: The Nav component shows a navigation bar with a company logo and links to different routes. It uses the Link component from `react-router-dom` for navigation. The navigation bar is designed to be responsive.

## Key Components (Server)

### FindCoords.js

This JavaScript module implements a "3-tier fallback" strategy for obtaining geographical coordinates for incident data, with the aim of ensuring that coordinates are always provided, even if precise data is unavailable. Here's a concise overview:

1. **Initial Attempt - City Coordinates**: The module first tries to fetch precise coordinates for an incident based on its city/district and state using the `getCityCoords` function. If successful and the coordinates are within India (checked by `isWithinIndia`), it slightly randomizes these coordinates.
    
2. **First Fallback - State Coordinates**: If fetching city coordinates fails or they are outside India, the module falls back to using predefined state coordinates from `stateCoords`. These coordinates are then randomized within a broader range.
    
3. **Second Fallback - Default Coordinates**: In cases where state coordinates are also unavailable, it resorts to a default set of coordinates, applying a larger random offset for variability.

### FormatDataController.js

This code defines a development-only Express router endpoint, `/processIncidents`, designed to process a large amount of incident data lacking coordinates. It follows these steps:

1. **Fetching Incidents**: Uses the `fetchIncidents` function to retrieve all incidents from the database.
2. **Assigning Coordinates**: For each incident, it asynchronously calls `getCoordinates` to assign geographical coordinates.
3. **Updating Database**: After assigning coordinates, each incident's data is updated in the database using `updateIncident`.
4. **Batch Processing**: Incidents are processed in intervals (1 second apart) to manage the load, suitable for large datasets.

This endpoint's primary function is to efficiently assign and update coordinates for incidents in a development environment.

