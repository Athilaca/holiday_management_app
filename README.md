# Holiday Management Application

## Objective
Build a full-stack Holiday Management Application that fetches holiday data from the Calendarific API and allows users to search, filter, and display holidays for a selected country and year.

---

## Tech Stack
- **Backend:** Django, Django REST Framework, SQLite, Django Caching
- **Frontend:** React, Axios, Tailwind CSS
- **API:** Calendarific API (for fetching holiday data)

---

## Features
1. Search and filter holidays by country, year, and holiday name.
2. Display holiday details in a modal (e.g., name, description, type, and date).
3. Cache holiday data for a given country and year for 24 hours to avoid repetitive API calls.
4. Pagination for displaying holidays when the number of holidays exceeds 20.
5. Dropdowns for selecting country and year.
6. Custom search to filter holidays by name (e.g., “Christmas”).
7. Date range picker for filtering holidays by date.
8. Filter by holiday type (e.g., National, Religious).

---

## Setup Instructions

### Backend (Django):
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd holiday-management-app/backend
    ```

2. Set up a Python virtual environment (if not using virtualenv globally):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use venv\Scripts\activate
    ```

3. Install required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    Create a `.env` file in the `backend` directory with the following contents:
    ```env
    CALENDARIFIC_API_KEY=<your_calendarific_api_key>
    ```

5. Migrate the database:
    ```bash
    python manage.py migrate
    ```

6. Run the Django server:
    ```bash
    python manage.py runserver
    ```
    The backend should now be running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

### Frontend (React):
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm run dev
    ```
    The frontend should now be running on [http://localhost:3000/](http://localhost:3000/).

---

## API Endpoints

### Fetch Holidays for a Specific Country and Year
- **Endpoint:** `/api/holidays/?country=${country}&year=${year}`
- **Method:** GET
- **Parameters:**
  - `country`: The ISO 3166-1 alpha-2 code for the country (e.g., US, IN).
  - `year`: The year for which holidays are to be fetched.
- **Response:** A list of holidays for the selected country and year.


---

## How to Run the Application

### Start the Backend
1. Ensure the Django server is running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/) by following the setup instructions above.

### Start the Frontend
1. Ensure the React development server is running on [http://localhost:5173/](http://localhost:3000/) by following the setup instructions above.

---

## Usage
1. Open the frontend in your browser ([http://localhost:5173/](http://localhost:3000/)).
2. Use the country and year dropdowns to select a country and year.
3. View the list of holidays for the selected country and year.
4. Search for holidays by name using the search bar.
5. Click on a holiday to see detailed information in a modal.
6. filter holidays by their type.

---

## Additional Notes
1. Ensure that you replace the `CALENDARIFIC_API_KEY` with your valid API key obtained from the Calendarific API.
2. The backend uses SQLite as the database for simplicity, but this can be swapped with PostgreSQL or another database system if necessary.
3. The application has been optimized using caching and is fully responsive using Tailwind CSS.

---

## Conclusion
This Holiday Management App integrates the Calendarific API to provide a seamless user experience for searching, viewing, and filtering holidays by country and year. The application has been optimized for performance using caching and offers a fully responsive design powered by Tailwind CSS.

