
#  Mini E-commerce Web Application

This is a full-stack mini e-commerce application built with Angular (frontend), Spring Boot (backend), and MongoDB (database).

---

##  Tech Stack

- **Frontend:** Angular
- **Backend:** Spring Boot 3.x (REST API)
- **Database:** MongoDB (collections: `products`, `users`, `carts`)
- **Authentication:** JWT-based auth with role support 

---

##  How to Run the Application

###  Frontend (Angular)

1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
3.Start the development server:
ng serve
4.Visit http://localhost:4200 in your browser.

### Backend (Spring Boot)

1.Navigate to the backend folder.
2.Start the Spring Boot application:
./mvnw spring-boot:run
3.The backend will run on http://localhost:8080.

### Authentication & Authorization

JWT-based authentication.
Users can register and log in.
Authenticated users can:
Add items to cart
View their cart
Update/remove cart items
Each user's cart is isolated by their user ID.
Role-based access is in place but primarily defaults to USER.

### Project Structure

#Frontend

products/ – Product listing with search, sort, pagination
product-detail/ – Product detail page
cart/ – Shopping cart management
login/, register/ – Auth flow
Shared components for header, navigation, etc.

#Backend

controllers/ – REST API endpoints for products, cart, user auth
models/ – MongoDB documents for Product, User, and CartItem
repositories/ – Interfaces for data access
utils/ – JWT utilities, authentication filters, etc.
confi/ - SecurityConfig

###Features Implemented
# Frontend
Product Listing Page (grid/list view)
Real-time search with debounce
Sorting (price/name)
Pagination with items per page
Cart management with quantity updates
Authentication (Login/Register)
Conditional navigation (login/logout button changes)

# Backend
CRUD endpoints:
GET /api/products
GET /api/products/{id}
POST /api/cart/add
GET /api/cart
PUT /api/cart/item/{id}
DELETE /api/cart/item/{id}
JWT-secured router
Per-user cart isolation via user ID from JWT token
Bean validation for request payloads
CORS support enabled

### Database Setup (MongoDB)
This application uses MongoDB with the following collections:
product
user
cart

You can import the sample data provided in the /mongoDB folder using the mongoimport tool.

Steps to Import Data
1.Make sure MongoDB is installed and running locally on default port (mongodb://localhost:27017).
2.Open terminal / PowerShell and navigate to the folder where your .json files are.

