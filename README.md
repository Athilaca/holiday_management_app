Holiday Management Application

Objective: Build a full-stack Holiday Management Application that fetches holiday data from the Calendarific API and allows users to search, filter, and display holidays for a selected country and year.

Tech Stack: Backend: Django, Django REST Framework, SQLite, Django Caching Frontend: React, Axios, Tailwind CSS API: Calendarific API (for fetching holiday data) Features: Search and filter holidays by country, year, and holiday name. Display holiday details in a modal (e.g., name, description, type, and date). Cache holiday data for a given country and year for 24 hours to avoid repetitive API calls. Pagination for displaying holidays when the number of holidays exceeds 20. Dropdowns for selecting country and year. Custom search to filter holidays by name (e.g., “Christmas”). Setup Instructions: Backend (Django): Clone the repository:

git clone <repository_url> cd holiday-management-app/backend Set up a Python virtual environment (if not using virtualenv globally):

python3 -m venv venv source venv/bin/activate # On Windows, use venv\Scripts\activate Install required dependencies:

pip install -r requirements.txt Set up environment variables: Create a .env file in the backend directory with the following contents:

CALENDARIFIC_API_KEY=<your_calendarific_api_key> Migrate the database:

python manage.py migrate Run the Django server:

python manage.py runserver The backend should now be running on http://127.0.0.1:8000/.

Frontend (React): Navigate to the frontend directory:

cd ../frontend Install the required packages:

npm install Run the React development server:

npm run dev The frontend should now be running on http://localhost:3000/.

API Endpoints: Fetch holidays for a specific country and year:

Endpoint: /api/holidays/ Method: GET Parameters: country: The ISO 3166-1 alpha-2 code for the country (e.g., US, IN). year: The year for which holidays are to be fetched. Response: A list of holidays for the selected country and year. Search holidays by name:

Endpoint: /api/holidays/search/ Method: GET Parameters: name: The name of the holiday (e.g., "Christmas"). Response: A list of holidays that match the search term. How to Run the Application:

Start the Backend: Make sure the Django server is running on http://127.0.0.1:8000/ by following the setup instructions above.
Start the Frontend: Make sure the React development server is running on http://localhost:3000/ by following the setup instructions above.
Usage: Open the frontend in your browser (http://localhost:3000/). Use the country and year dropdowns to select a country and year. View the list of holidays for the selected country and year. Search for holidays by name using the search bar. Click on a holiday to see detailed information in a modal.
Date Range Picker: A date range picker was implemented for filtering holidays by date. Filter by Holiday Type: A dropdown filter for holiday types (e.g., National, Religious) was added.

Additional Notes: Ensure that you replace the CALENDARIFIC_API_KEY with your valid API key obtained from Calendarific API. The backend uses SQLite as the database for simplicity, but this can be swapped with PostgreSQL or another database system if necessary. Conclusion: This Holiday Management App integrates the Calendarific API to provide a seamless user experience for searching, viewing, and filtering holidays by country and year. The application has been optimized using caching and is fully responsive using Tailwind CSS.