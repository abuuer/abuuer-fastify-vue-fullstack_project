# Fastify TypeScript VueJS Project

This project is built using Fastify, TypeScript, and VueJS. It includes database migration using Prisma, CRUD APIs for categories and products, and supports MySQL for the database.

## Getting Started

### Prerequisites

Make sure you have the latest versions of [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [MySQL](https://www.mysql.com/) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abuuer/abuuer-fastify-vue-fullstack_project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd project-directory
   ```

3. **Install dependencies for the Fastify backend:**

   ```bash
   cd server
   npm install
   ```

4. **Install dependencies for the VueJS frontend:**

   ```bash
   cd client
   npm install
   ```

### Database Setup

1. Ensure MySQL is running on your machine.

2. Create a new MySQL database for the project.

3. Configure the database connection in the `server/.env` file:

   ```dotenv
   DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

### Database Migration

1. Run migrations to create the categories and products tables:

   ```bash
   cd server
   npx prisma migrate dev
   ```

### Running the Application

1. **Start the Fastify backend server:**

   ```bash
   cd server
   npm run dev
   ```

   The Fastify server will be running on `http://localhost:3000`.

2. **Start the VueJS frontend:**

   ```bash
   cd client
   npm run serve
   ```

   The VueJS application will be available on `http://localhost:8080`.

## Features

### Categories

- CRUD API for categories.
- Display categories as a tree.
- Show the count of products for each category, including recursive children categories.

### Products

- CRUD API for products.
- Display top parent categories.
- Display children of the selected category.
- Resize images to 320x320 during upload.
- Delete button with confirmation message.

## Technologies Used

- Fastify
- TypeScript
- VueJS
- Prisma
- MySQL

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
