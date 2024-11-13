# Web Scraper

**Overview**

This web scraper is designed to automate the process of extracting specific data from the Campus Community Connection (CCC) platform. By automating this task, we can efficiently collect and analyze valuable information without manual intervention.

**Purpose**

The primary purpose of this web scraper is to automate the process of collecting data from specific websites. By extracting relevant information, we can analyze trends, generate insights, and inform decision-making.


**Technical Implementation**


Tools and Libraries
PyWebCopy: A Python library used to create local copies of websites.
Python 3.12

**Installation & Running the script**

Open the Terminal: Open a terminal or command prompt.
Navigate to the Script Directory: Use the cd backend\scraper\scraper.py command to navigate to the directory where your script is saved. 
Run the Script: Execute the script using the following command: python scraper.py


## Upload Mongodb

This section focuses on the process of uploading data extracted from a local copy of the Campus Community Connection (CCC) website to a MongoDB database using Python.

**Purpose**
This Python script automates the upload process of data extracted from a local copy of the Campus Community Connection (CCC) website to a MongoDB database.

**Technical Implementation**
Beautiful Soup 4: Parses the downloaded HTML files to identify and extract specific data elements.
PyMongo: Facilitates the connection to a MongoDB database and enables data insertion and querying operations.


**Installation & Running the script**
Open the Terminal: Open a terminal or command prompt.
Navigate to the Script Directory: Use the cd backend\uploadMongo.py command to navigate to the directory where your script is saved. 
Run the Script: Execute the script using the following command: python uploadMongo.py

## Hosting backend  
**Purpose**
This backend API is designed to provide data from a MongoDB database. It exposes two main endpoints:

Get All Data: Retrieves all data stored in the specified collection.
Get Data by Location: Retrieves data entries with location IDs matching a given pattern.
**Technical Implementation**
The API is built using Node.js and Express.js. It connects to a MongoDB database using the MongoDB Node.js driver.

Key components:

Express.js: Used to define and handle API routes.
MongoDB Node.js Driver: Used to interact with the MongoDB database.
dotenv: Used to manage environment variables securely.
**Installation & Running the script**
Prerequisites:
Node.js and npm (or yarn) installed
A MongoDB Atlas cluster set up with a database and collection

A .env file in your project root with the following environment variables:
mongodbURL: Your MongoDB connection string
Database: Your database name
Collection: Your collection name

Configuration:

Create a .env file:

Create a .env file in your project root and add the following environment variables, replacing the placeholders with your actual values:

mongodbURL=your_mongodb_connection_string
Database=your_database_name
Collection=your_collection_name


API Endpoints:

Get all data:

GET /api/data
Retrieves all data stored in the specified collection.
Get data by location:

GET /api/data/:location
Replace :location with the desired location ID.
Retrieves data entries with location IDs matching the provided pattern (^${location}_).


Additional Notes:

Error Handling: The API includes basic error handling for database operations and provides informative error messages.
Security: Consider implementing additional security measures like authentication and authorization, especially if your API handles sensitive data.
Deployment: You can deploy this API to a cloud platform like Heroku, AWS, or Google Cloud Platform.
Testing: Write unit and integration tests to ensure the API works as expected.
Troubleshooting:

MongoDB Connection: Ensure your MongoDB connection string is correct and your MongoDB Atlas cluster is accessible.
Environment Variables: Verify that your .env file is set up correctly and the environment variables are loaded.
API Endpoint: Double-check the API endpoint URLs and request methods.
Error Messages: Review the error messages in the console or browser to identify the root cause of the issue.