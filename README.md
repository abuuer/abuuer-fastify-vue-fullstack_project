# Fastify TypeScript VueJS Project

This project is built using Fastify, TypeScript, and VueJS. It includes database migration using Prisma, CRUD APIs for categories and products, and supports MySQL for the database.

## Getting Started

### Prerequisites

Make sure you have the latest versions of [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [MySQL](https://www.mysql.com/) installed on your machine.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abuuer/abuuer-fastify-vue-fullstack_project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd abuuer-fastify-vue-fullstack_project
   ```

### Run With Docker

```bash
docker-compose up
```

this Docker Compose configuration sets up a development environment with three services: a Vue.js client, a Node.js server, and a MySQL database, each running in its own container. The dependencies are managed during container initialization. Additionally, the Prisma migration is configured to create the necessary database tables, and a seed script is executed to populate the database during the setup process.

### Run Without Docker

### Dependencies Installation

1. **Install dependencies for the Fastify backend:**

   ```bash
   cd server
   npm install
   ```

2. **Install dependencies for the VueJS frontend:**

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

Run migrations to create the categories and products tables:

```bash
cd server
npx prisma migrate dev
```

### Data Seeding

```bash
npm run seed
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

- **Backend:**

  - Built with Fastify and Typescript.
  - Uses Prisma for database interaction.
  - Implements CRUD operations for categories and products.
  - Displays categories as a tree structure.
  - Shows the count of products for recursive children categories.
  - Handles image resizing during uploading to be 320 \* 320.

- **Frontend:**

  - Developed with the latest version of Vue.js.
  - Utilizes Vue Router for navigation.
  - Implements CRUD operations for categories and products.
  - Displays top parent categories and children of the selected category.
  - Includes a delete button with a confirmation message.

- **Database:**
  - MySQL is used as the database.

## Technologies Used

- Fastify
- TypeScript
- VueJS
- Prisma
- MySQL

## Importing Postman Collection

You can easily import the Postman collection associated with this project. Follow the steps below:

1. **Locate to the project directory level:**

   - The file is located in the root directory under the name "fastify-vue-fullstack-project.postman_collection.json"

2. **Open Postman:**

   - Launch Postman on your system.

3. **Click on the "Import" button:**

   - Locate the "Import" button in the top-left corner of the Postman interface.

4. **Choose "Import File":**

   - Select the option to "Import File."

5. **Select the Postman collection file:**
   - Browse and choose the Postman collection file from the project directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
