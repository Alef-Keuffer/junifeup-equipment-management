## Recommended Tech Stack

To deliver both a REST API and a frontend within a tight 6-hour window, minimizing setup time is critical.

* **Unified Full-Stack Framework (Highly Recommended):** Next.js (React), Nuxt.js (Vue), or SvelteKit. A unified framework allows you to build the frontend and the REST API backend in a single repository without having to configure CORS or manage two separate servers.
* **Database Access:** Use an ORM like Prisma or Drizzle if using TypeScript/JavaScript. Because the database schema is already defined in the provided `equipment.db` and `schema.sql` files, an ORM can instantly introspect the database to give you type safety, saving significant time. Alternatively, a standard SQLite driver works perfectly for raw queries.


* **Frontend UI:** Tailwind CSS combined with a pre-built component library like shadcn/ui, MUI, or Bootstrap. This drastically cuts down the time spent styling tables, modals, and forms.

## Execution Plan (6-Hour Timeline)

| Timeframe | Phase | Key Actions |
| --- | --- | --- |
| **Hour 1** | **Setup & Database** | Initialize project repository. Configure the SQLite connection to the provided `equipment.db` file. If needed, use `schema.sql` and `seed.sql` to recreate a fresh database.

 |
| **Hour 2** | **Backend API (CRUD)** | Develop the REST API backend to support the required endpoints. Implement the logic for Listing, Consulting, Creating, Editing, and Removing.

 |
| **Hour 3** | **Frontend: Layout & Listing** | Build the main UI layout. Create a dashboard that consumes the API to list all existing equipment.

 |
| **Hour 4** | **Frontend: Forms & Details** | Implement the views to consult equipment details. Build the forms to create new equipment and edit existing ones.

 |
| **Hour 5** | **Integration & Constraints** | Connect all frontend actions to the REST API. Ensure error handling is in place, especially for strict database constraints like the unique `serial_number`.

 |
| **Hour 6** | **Review & Buffer** | Test all functionalities end-to-end. Prepare your laptop and solution for the Sprint meeting presentation.

 |

## Backend: REST API Design

The objective is to develop endpoints that support the frontend application. A standard RESTful structure maps perfectly to your requirements:

* **`GET /api/equipment`**: Retrieves all equipment records to satisfy the listing requirement.


* **`GET /api/equipment/:id`**: Fetches a specific equipment record by its ID to consult details.


* **`POST /api/equipment`**: Creates a new equipment entry. The backend must validate the payload against the `CHECK` constraints for `category` and `status` before inserting.


* **`PUT /api/equipment/:id`**: Edits an existing equipment record based on its ID.


* **`DELETE /api/equipment/:id`**: Removes an equipment entry from the database.



## Frontend: Critical UI Components

* **Inventory Table**: The primary interface should be a data table listing all equipment. It is best to display key identifiers like `name`, `category`, `status`, and `location` at a glance.


* **Status Badges**: Implement visual indicators for the `status` column to easily distinguish between 'Available', 'Assigned', 'Maintenance', and 'Retired' states.


* **Constrained Form Inputs**: When creating or editing equipment, use dropdown (`<select>`) menus rather than open text fields to enforce the strict database categories ('Laptop', 'Monitor', 'Smartphone', 'Tablet', 'Printer', 'Network Equipment').


* **Delete Confirmation**: Before triggering the API endpoint to remove an equipment, include a simple confirmation modal to prevent accidental data loss.



Are you leaning towards a specific programming language or framework for this challenge? I can provide the exact SQLite query syntax or boilerplate code for the API if you have a preferred stack in mind.