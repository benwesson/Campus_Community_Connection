from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pathlib
from bs4 import BeautifulSoup 

# Load environment variables
load_dotenv()

# Connect to MongoDB
def connectDB():
    client = MongoClient(os.getenv("mongodbURL"))
    db = client[os.getenv("Database")]
    collection = db[os.getenv("Collection")]
    return client, collection

def closeConnection(client): 
    client.close()

# Function to get all HTML files from a specified folder
def get_html_files(folder_path):

    html_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files

# Main function to read HTML files and insert data into MongoDB
def main(folder_path):
    client, collection = connectDB()

    # Get all HTML files from the specified folder
    html_files = get_html_files(folder_path)

    # Read data from files and insert into MongoDB
    for file in html_files:
        print(f"Reading file: {file}")
        try:
            with open(file, 'r') as f:
                data = f.read()
                print(f"Contents of {file}:")
                # print(data)
                
                # Step 1: Create a Beautiful Soup object
                soup = BeautifulSoup(data, 'html.parser')

                # Step 2: Extract all <p> tags
                paragraphs = soup.find_all('p')
                heading = soup.find('h1')
                # Step 3: Print each paragraph
               # Assuming 'collection' is your MongoDB collection object
                for i, paragraph in enumerate(paragraphs, start=1):
                    print(f'Paragraph {i}: {paragraph.text}')
                    print(heading.text)
                    
                    # Check if both data and location are not None
                    if paragraph.text is not None and heading.text is not None:
                        # Check if a document with the same data already exists
                        existing_document = collection.find_one({
                            'data': paragraph.text,
                            'location': heading.text
                        })
                        
                        if existing_document is None:
                            # If no document exists, insert a new one
                            collection.insert_one({
                                'data': paragraph.text,
                                'location': heading.text
                            })
                            print("New document inserted.")
                        else:
                            print("Document already exists. Skipping insertion.")
                    else:
                        print("Either data or location is None. Skipping insertion.")
        except Exception as e:
            print(f"An error occurred while processing {file}: {e}")

    # Close the database connection
    closeConnection(client)


main(os.getenv("projectPath"))