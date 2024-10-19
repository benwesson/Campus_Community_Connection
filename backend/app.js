const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv'); // Import dotenv
const app = express();

// Load environment variables from .env file
dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.mongodbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB and set up the API
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(process.env.Database); // Replace with your database name

    // Define API endpoint to retrieve data
    app.get('/api/data', async (req, res) => {
      try {
        const data = await db.collection(process.env.Collection).find().toArray(); // Replace with your collection name
        res.json(data);
      } catch (err) {
        res.status(500).send({ message: 'Error retrieving data' });
      }
    });
    app.get('/api/1', async (req, res) => {
      try {
        const data = await db.collection(process.env.Collection).find().toArray(); // Replace with your collection name
        res.json(true);
      } catch (err) {
        res.status(500).send({ message: 'Error retrieving data' });
      }
    });
    app.get('/api/2', async (req, res) => {
      try {
        const data = await db.collection(process.env.Collection).find().toArray(); // Replace with your collection name
        res.json(data);
      } catch (err) {
        res.status(500).send({ message: 'Error retrieving data' });
      }
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
      console.log('You can now access the API at http://localhost:3000/api/data');
    });
  } catch (err) {
    console.error(err);
  }
}

// Run the function to connect to MongoDB and start the server
run().catch(console.dir);