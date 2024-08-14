# Heritage Nest Backend

## Description:

Backend for the Heritage Nest project utilizing Express.js and Mongoose for a robust RESTful API. Implements JWT for secure authentication and bcrypt for password encryption. Configured with dotenv for environment management, providing a scalable and secure server-side solution.

## Technologies Used

- **Backend Framework**: Express.js
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT
- **Password Encryption**: bcrypt
- **Environment Management**: dotenv
- **CORS**: cors

## Live Link:

Server status: https://heritage-nest-backend-mu.vercel.app/status

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jibon-roy/Heritage-Nest-Backend.git
   ```
2. Go to folder:
   ```bash
   cd Heritage-Nest-Backend
   ```
3. Replace the env with your env file:
   ```bash
   MONGO_URI=Your mongodb uri
   JWT_SECRET= your JWT_SECRET
   DB_NAME=your db name
   DEV_URL= your dev frontend url
   PROD_URL=your prod frontend url
   PROD_URL2=your prod frontend url 2
   ```
4. Run project:
   ```bash
   pnpm dev
   ```
