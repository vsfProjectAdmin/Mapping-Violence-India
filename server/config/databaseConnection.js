const mysql = require('mysql2');

const db = mysql.createConnection({
  //vars will be in .env
  host: '127.0.0.1',
  user: 'root',
  password: 'Nakl_3349',
  database: 'sql_workbench'
});


function connect() {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        reject(err);
      } else {
        console.log('Connected to the database');
        resolve();
      }
    });
  });
}

function disconnect() {
  if (db) {
    db.end((err) => {
      if (err) {
        console.error('Error disconnecting from the database: ' + err.stack);
        return;
      }
      console.log('Disconnected from the database');
    });
  }
}

module.exports = {
  db, // Expose the db
  connect,
  disconnect
};
