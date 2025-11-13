 # Star Wars Character App

## Project Overview

This is a responsive Star Wars Character App built with React, TypeScript, and Tailwind CSS.  
It fetches data from the Star Wars API (SWAPI) and displays a list of characters with details.

## How to Run the Project

1. Clone the repository:  
   ```bash
   git clone https://github.com/rajashahid123/starwars-app.git



 # Install dependencies:
   npm install


   # Start the development server:
   npm run dev


  # Open in browser:
    http://localhost:5173


  # What You Implemented (and Bonus Features)

- Fetched Star Wars characters from SWAPI (`/people` endpoint)  
- Implemented pagination, loading, and error handling  
- Displayed character cards with random blurred images  
- Clicking a card opens a modal with character details:
  - Name, Height, Mass, Birth Year  
  - Date Added (formatted as dd-MM-yyyy)  
  - Number of films  
  - Homeworld details (name, terrain, climate, population)  
- Search characters by name (partial match)  
- Filter characters by homeworld  
- Combined search + filter functionality  
- Fully responsive UI for mobile, tablet, and desktop


# login  =  admin
# password = 1234


## Trade-offs / Design Choices

- Used **Tailwind CSS** for fast and responsive styling instead of writing custom CSS  
- Components are modular and reusable for better maintainability  
- Functional components + React Hooks were used for simplicity and modern React practices  
- Random placeholder images from Picsum Photos were used instead of fetching real images, to avoid extra API dependencies  
- Did not implement full authentication or persistent token storage as it was optional (bonus feature)



 
