from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
print(os.getenv("mongodbURL"))
# Connect to MongoDB
client = MongoClient(os.getenv("mongodbURL"))
db = client['your_database_name']
collection = db['your_collection_name']

# Read data from file
with open('your_file_path', 'r') as file:
    data = file.read()

# Insert data into MongoDB
collection.insert_one({'data': data})

# Close the connection
client.close()