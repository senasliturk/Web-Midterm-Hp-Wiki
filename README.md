#  Hogwarts Wiki Project

This project is a Harry Potter themed web application developed as part of a web programming assignment.  
The main goal of the project is to practice **React**, **component-based structure**, **API usage**, and **routing** by building an interactive encyclopedia.

The application allows users to explore characters, spells, movies, and books from the Harry Potter universe.

---

##  Project Features

- **Home Page**
  - An interactive landing page inspired by the Hogwarts Sorting Hat.
  - Users can answer questions and get redirected to their Hogwarts House.

- **Characters Page**
  - Displays a list of characters fetched from an external API.
  - Characters can be filtered by house.
  - Includes a search functionality.

- **Character Detail Page**
  - Uses dynamic routing to show detailed information about a selected character.
  - Information includes house, wand, patronus, actor, and more.

- **Spells Page**
  - Displays spells using a book-style page flip design.
  - Spell data is fetched dynamically from the API.

- **Movies & Books Pages**
  - Displays the Harry Potter movie and book series.
  - These pages use static data since the API does not provide movie or book information.

- **Background Music**
  - Background music starts after user interaction due to browser autoplay restrictions.

- **Error & Loading States**
  - Loading messages are shown while data is being fetched.
  - Error messages are displayed if the API request fails.

---

## Data Source Explanation

- **Characters & Spells**
  - Data is fetched from the public Harry Potter API:  
    https://hp-api.onrender.com/

- **Books & Movies**
  - Since the API does not provide endpoints for books or movies, static data was used.
  - This decision was made to complete all required sections of the project.

---

##  Technologies Used

- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- HTML / CSS / JavaScript

---

##  How to Run the Project

Download the project files and extract them.Then install dependencies.


src/
├── assets/        # Images, videos, and audio files
├── components/    # Reusable components (Navbar, ErrorAlert, etc.)
├── pages/         # Page components (Home, Characters, Spells, Movies, Books)
├── services/      # API requests (Axios)
└── App.jsx        # Main application file




