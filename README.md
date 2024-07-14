# Full Stack Photo Uploading App with Admin Panel

## Tech Stack
1. Backend: AdonisJS with LucidORM
2. Database: PostgreSQL hosted on neon.tech
3. Storage: Cloudinary for hosting images
4. Frontend: VueJS 3 with Pinia for Global state management and Tailwind CSS for styling

## Requirements
1. Ensure Node 20.0.0 or greater is installed
2. Create an account on neon.tech
3. Create a cloudinary account
4. Fill the empty fields in .env.example file in the 'akw-assessment-backend' with your neon.tech postgreSQL credentials and cloudinary credentials
## How to Run
### Backend
1. Open 'akw-assessment-backend' in a new terminal
2. Run 'npm install'
3. Run 'npm dev'
4. Backend Web server will be up on the given port at localhost

### Frontend
1. Open 'akw-assessment-frontend' in a new terminal
2. Run 'npm install'
3. Run 'npm dev'
4. Frontend will be up on the given port at localhost

## Features
### User
1. User can register with email and password and login.
2. User can upload image with name.
3. User can edit or delete the image if they have the permission.

### Admin
1. Create an admin account by sending a POST request to the following backend endpoint 
'{baseURL}/auth/admin/register' with the following fields in the request body 'fullName','email' and 'password'
2. Admin can login using email and password.
3. Admin can change user permissions.
