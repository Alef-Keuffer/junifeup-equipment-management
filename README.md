# Equipment Management System 💻

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-6-blue?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A modern, fast, and unified full-stack backoffice platform designed to help companies track and manage their hardware inventory effortlessly. Built as a technical challenge for JuniFEUP.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Security](#security)
- [How to Contribute?](#how-to-contribute)
- [What's Next?](#whats-next)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Author](#author)

## About

The Equipment Management System is an internal backoffice tool that represents a company's hardware inventory. Whether it's laptops, monitors, smartphones, tablets, printers, or network equipment, this application allows the technology department to quickly visualize what equipment exists, its current status (Available, Assigned, Maintenance, Retired), and its physical location.

## Features

- **Inventory Dashboard:** A beautiful, responsive data table listing all company equipment.
- **Visual Status Badges:** Instantly recognize the condition and assignment state of hardware through color-coded badges.
- **Create & Edit:** Easy-to-use modal forms with strict dropdown constraints to prevent invalid data entries.
- **Delete Protection:** Confirmation dialogs built-in to prevent accidental removal of inventory records.
- **Full CRUD API:** A robust set of backend REST API endpoints (`GET`, `POST`, `PUT`, `DELETE`).
- **Data Integrity:** Graceful handling of SQLite `CHECK` constraints and unique fields (e.g., Serial Number collisions).

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Frontend UI:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend / ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [SQLite](https://www.sqlite.org/)

## Architecture

This project utilizes a **Unified Full-Stack Architecture** using Next.js. 
Instead of maintaining a separate backend Node.js server and a React frontend, both layers live in the same repository.
- The **Backend API** is powered by Next.js Route Handlers (`src/app/api/...`), communicating with the SQLite database securely via Prisma ORM.
- The **Frontend** consists of React Client Components that consume the REST API seamlessly without needing to configure CORS or manage distinct deployment pipelines.

## Project Structure

```text
├── prisma/
│   └── schema.prisma       # Prisma ORM schema defining the database structure
├── src/
│   ├── app/
│   │   ├── api/            # Backend REST API routes (GET, POST, PUT, DELETE)
│   │   ├── layout.tsx      # Global HTML layout
│   │   └── page.tsx        # Main entry point for the frontend
│   ├── components/
│   │   ├── ui/             # Reusable shadcn/ui components (Buttons, Inputs, Dialogs)
│   │   ├── dashboard.tsx   # Core inventory data table component
│   │   └── ...             # Form and Dialog components
│   └── lib/
│       └── prisma.ts       # Singleton Prisma Client for database access
├── equipment.db            # Pre-populated SQLite Database
├── schema.sql              # Database schema dump
├── seed.sql                # Initial mock data
├── test_api.sh             # API testing script
├── PRESENTATION.md         # Sprint meeting presentation notes
├── submission-info.txt     # Submission instructions
└── .env                    # Environment variables
```

## API Documentation

The REST API provides endpoints to manage the equipment inventory under the `/api/equipment` route.

| Method | Endpoint               | Description                                      | Body Requirements |
| ------ | ---------------------- | ------------------------------------------------ | ----------------- |
| `GET`  | `/api/equipment`       | Retrieves a list of all equipment.               | None              |
| `GET`  | `/api/equipment/[id]`  | Retrieves the details of a specific equipment.   | None              |
| `POST` | `/api/equipment`       | Creates a new piece of equipment.                | JSON object with `name`, `category`, `serial_number`, `status`, `location`, `purchase_date`. |
| `PUT`  | `/api/equipment/[id]`  | Updates an existing piece of equipment.          | JSON object with fields to update. |
| `DELETE`| `/api/equipment/[id]` | Removes a piece of equipment from the inventory. | None              |

**Note on Constraints:** 
- The `category` must be one of: `Laptop`, `Monitor`, `Smartphone`, `Tablet`, `Printer`, `Network Equipment`.
- The `status` must be one of: `Available`, `Assigned`, `Maintenance`, `Retired`.
- The `serial_number` must be unique across all records.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Generate the Prisma Client types:
   ```bash
   npx prisma generate
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Configuration

The application relies on environment variables for database connections. The repository includes an `.env` file pointing to the provided local SQLite database:

```env
DATABASE_URL="file:../equipment.db"
```
*(Note: Prisma resolves SQLite paths relative to the `prisma/schema.prisma` file, hence the `../` to target the root directory).*

## Security

- **Input Validation:** The backend API strictly validates required fields and ensures `category` and `status` values fall within the authorized Enums before touching the database.
- **Unique Constraints:** The system gracefully intercepts and rejects duplicate `serial_number` creations via Prisma constraint error catching.
- **Server-side Execution:** Database credentials and Prisma client logic are strictly contained within Next.js Server contexts, completely hidden from the client browser.

## How to Contribute?

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## What's Next?

Future improvements for the platform include:
- **Authentication & Authorization:** Secure the dashboard and API routes with tools like NextAuth.js.
- **Pagination & Filtering:** Add server-side pagination and advanced search filters for scaling to thousands of equipment items.
- **Analytics:** Create charts showing the distribution of equipment status and costs.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **JuniFEUP** - For providing the Phase 2 Technical Problem context and SQLite database schema.
- UI components designed by [shadcn/ui](https://ui.shadcn.com/).

## Author

Developed as part of the JuniFEUP Technology Department selection process by Alef Keuffer.
