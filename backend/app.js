const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Validate environment variables
const { mongodbURL, Database, Collection } = process.env;
if (!mongodbURL || !Database || !Collection) {
  throw new Error('Missing required environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongodbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB and set up the API
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(Database);

        // User signup endpoint
        app.post('/api/signup', async (req, res) => {
          const { username, password } = req.body;
    
          if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          try {
            const result = await db.collection(Collection).insertOne({
              username,
              password: hashedPassword
            });
            res.status(201).send({ message: 'User  created successfully' });
          } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error creating user' });
          }
        });
    
        // User login endpoint
        app.post('/api/login', async (req, res) => {
          const { username, password } = req.body;
    
          if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
          }
    
          try {
            const user = await db.collection(Collection).findOne({ username });
            if (!user) {
              return res.status(401).send({ message: 'Invalid credentials' });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return res.status(401).send({ message: 'Invalid credentials' });
            }
    
            const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
          } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Error logging in' });
          }
        });

    // Define API endpoint to retrieve data
    app.get('/api/data', async (req, res) => {
      try {
        const data = await db.collection(Collection).find().toArray();
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error retrieving data' });
      }
    });
    
    // API endpoint to get data by location_id
    app.get('/api/data/:location', async (req, res) => {
      const location = req.params.location;
      const locationPattern = new RegExp(`^${location}_`);

      try {
          const data = await db.collection(Collection).find({
              location_id: { $regex: locationPattern }
          }).toArray();

          if (data.length > 0) {
              res.json(data);
          } else {
              res.status(404).send({ message: 'No data found for the specified location' });
          }
      } catch (err) {
          console.error(err);
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

// Close the MongoDB connection gracefully on exit
process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});