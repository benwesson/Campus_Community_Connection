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
from pymongo import MongoClient
from dotenv import load_dotenv
import os
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
            with open(file, 'r', encoding='utf-8') as f:
                data = f.read()
                print(f"Contents of {file}:")
                
                # Step 1: Create a Beautiful Soup object
                soup = BeautifulSoup(data, 'html.parser')

                # Step 2: Extract all <p> tags and the <h1> tag
                paragraphs = soup.find_all('p')
                heading = soup.find('h1')

                # Check if heading is found
                if heading is None:
                    print("No <h1> tag found. Skipping this file.")
                    continue

                heading_text = heading.text.strip()

                # Step 3: Process each paragraph
                for i, paragraph in enumerate(paragraphs, start=1):
                    paragraph_text = paragraph.text.strip()
                    print(f'Paragraph {i}: {paragraph_text}')
                    print(f'Heading: {heading_text}')

                    # Check if both data and location are not None
                    if paragraph_text and heading_text:
                        # Create a unique location ID by combining heading and index
                        location_id = f"{heading_text.replace(" ", ""):}_{i}"  # e.g., "Location_1", "Location_2"

                        # Check if a document with the same location ID already exists
                        existing_document = collection.find_one({
                            'location_id': location_id
                        })

                        if existing_document is None:
                            # If no document exists, insert a new one with the unique location ID
                            collection.insert_one({
                                'location_id': location_id,
                                'data': paragraph_text,
                                'location': heading_text
                            })
                            print("New document inserted with location ID:", location_id)
                        else:
                            print("Document for this location already exists. Skipping insertion.")
                    else:
                        print("Either data or location is None. Skipping insertion.")
        except Exception as e:
            print(f"An error occurred while processing {file}: {e}")

    # Close the database connection
    closeConnection(client)

# Example usage
if __name__ == "__main__":
    main(os.getenv("projectPath"))

    # Close the database connection
    closeConnection(client)


main(os.getenv("projectPath"))