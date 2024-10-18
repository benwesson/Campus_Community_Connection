import os
import pathlib
from pywebcopy import save_website

# Define the project folder and name
project_name = "campuscommunityconnection"
project_folder = pathlib.Path(__file__).parent.resolve() / project_name

try:
    # Check if the project folder exists
    if not os.path.exists(project_folder):
        # Create the project folder if it doesn't exist
        os.makedirs(project_folder)
        print(f"Created project folder: {project_folder}")
    else:
        print(f"Project folder already exists: {project_folder}")

    # Save the website
    save_website(
        url="https://campuscommunityconnection.umd.edu/",
        project_folder=str(project_folder),
        project_name=project_name,
        bypass_robots=True,
        debug=True,
        open_in_browser=True,
        delay=None,
        threaded=False,
    )

except Exception as e:
    print(f"An error occurred: {e}")