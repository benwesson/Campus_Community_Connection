// app.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv'); // Import dotenv
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the URI from the .env file
MongoClient.connect(process.env.mongodbURL, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');

    // Create a database object
    const db = client.db();

    // Define API endpoints
    app.get('/api/data', (req, res) => {
      // Retrieve data from MongoDB
      db.collection('your-collection-name').find().toArray((err, data) => {
        if (err) {
          res.status(500).send({ message: 'Error retrieving data' });
        } else {
          res.send(data);
        }
      });
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  }
});