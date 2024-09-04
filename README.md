## Features
- **User Authentication**: Todo uses NextAuth to provide secure user authentication. Users can sign up and log in using their Google or GitHub accounts.
- **Responsive Design**: The application is built with a responsive design in mind, ensuring a great user experience on various devices, including mobile phones, tablets, and desktops.

## Technologies Used
- **Next.js**: A React framework for building fast and efficient web applications.
- **Prisma**: A database toolkit that simplifies database access and management.
- **MongoDB**: A NoSQL database used to store video data and user information.
- **Redux Toolkit**: A state management library that helps manage the application's global state.
- **UseSWR**: A React hook for data fetching, caching, and revalidation, providing a simple and efficient way to manage remote data in your application.
- **Tailwind CSS**: A utility-first CSS framework for creating stylish and responsive designs with ease.
- **NextAuth**: A library for authentication in Next.js applications, integrated with Google and GitHub for user authentication.

## Getting Started
To get started with Todo, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/chieduchineme/nextTodo.git
   ```
2. Install the dependencies:
   ```bash
   cd nextTodo
   npm install
   ```
3. Set up your environment variables. You may need to create a `.env.local` file in the root directory with the following content:
   ```dotenv
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   DATABASE_URL=your-database-url
   ```
   Replace `your-google-client-id`, `your-google-client-secret`, `your-github-client-id`, and `your-github-client-secret` with your own credentials from the respective developer platforms.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your web browser and navigate to `http://localhost:3000` to access Todo.

## SOURCE CODE WALKTHROUGH
In this demo, we rule out Redux because the application is small; such that we do not even need middleware, so Zustand is an overkill; therefore we used useSWR for managing data fetching and caching from APIs, and ContextAPI for state management.

# Styles: 
- global stylesheets to be applied across all components and pages, ensuring consistent styling across all components.
# Components:
- Houses reusable UI components.
# Hooks:
- Contains custom React hooks that encapsulate reusable logic.
- Encapsulates business logic or complex state management that can be reused across multiple components.
# Interfaces:
- Ensures type safety by defining the shape of data structures, which helps prevent runtime errors.
# Lib:
- Contains utility functions and libraries, modules like fetcher.js, serverAuth.js, or prismadb.js.
# Pages:
- Contains the application's pages (routes); Next.js page files like index.tsx, auth.tsx, or 404.tsx.
# Prisma:
- Contains Prisma database schema and migration files.
# .env and .env.local:
- Environment variable files such as .env and .env.local where sensitive or environment-specific data is needed.
# Redux :
- redux setup if the application gets bigger
# Sample-Redux-Comp :
- Components integrated with redux if the application gets bigger
