Full-Stack Food App 🍽️
-----------------------

A complete food ordering web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project is designed to provide a seamless experience for users to order food and for admins to manage menus, users, and orders.

* * * * *

Features 🚀
-----------

### User Features

-   **Food Ordering:** Browse the menu, add items to the cart, and place orders.
-   **Order Tracking:** View order history and status.
-   **Authentication:** Secure user registration and login.

### Admin Features (go to /admin. password - admin123)

-   **Admin Panel:** Manage menu items, orders, and users.
-   **Menu Management:** Add, edit, or delete food items, including uploading images.
-   **Order Management:** View and update order statuses.
-   **User Management:** Manage users and automatically delete their associated orders when a user is removed.

* * * * *

Tech Stack 💻
-------------

### Frontend

-   React.js
-   Material-UI for UI components and styling.

### Backend

-   Node.js with Express.js
-   MongoDB for database management.

### Deployment

-   GitHub for version control.
-   Deployment platforms: Netlify (Frontend) and Render (Backend).

* * * * *

Environment Variables 🔐
------------------------

Create a `.env` file in the root directories of both the frontend and backend. Add the following variables:

### Backend `.env` Example:

`MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
PORT=<Backend Port, e.g., 5000>`

### Frontend `.env` Example:

`REACT_APP_API_BASE_URL=<Your Backend API URL>`

* * * * *

Installation & Setup ⚙️
-----------------------

### Clone the repository:

`git clone https://github.com/your-username/full-stack-food-app.git
cd full-stack-food-app`

### Install dependencies:

`# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install`

### Start the development servers:

`# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start`

### Open the application:

Visit `http://localhost:3000` in your browser.

* * * * *

Any assumptions, challenges, or limitations faced during development:
---------------------------------------------------------------------


-   **Challenges:**

    -   Ensuring seamless integration between the frontend and backend with APIs.
    -   Handling image uploads and integrating them with the database.
    -   Implementing efficient state management for cart and orders in the frontend.
-   **Limitations:**

    -   Payment gateway integration is not included in this version.
    -   Limited support for real-time updates; users must refresh for status updates.

* * * * *

Author ✍️
---------

**Nawang Dorjee**
