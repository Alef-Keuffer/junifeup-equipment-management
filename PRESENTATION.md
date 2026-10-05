# 🎯 Sprint Meeting Presentation: Equipment Management System

## 1. Context & Objective
**The Goal:** Build a backoffice platform for the Technology Department to manage the company's hardware inventory.
**Requirements:**
- Know what equipment exists.
- Track its status (Available, Assigned, Maintenance, Retired).
- Track its physical location.
- Provide full CRUD (Create, Read, Update, Delete) functionality via a REST API and a Frontend UI.

---

## 2. Architecture & Tech Stack Decisions
We had a tight 6-hour window, so we prioritized efficiency, type safety, and a unified architecture.

- **Unified Full-Stack (Next.js 15):** By using Next.js, we avoided configuring CORS and setting up separate frontend/backend servers. Both live harmoniously in one repository.
- **Backend & Database (Prisma + SQLite):** We used Prisma ORM to instantly introspect the provided `equipment.db` SQLite database. This gave us full TypeScript safety out of the box. 
  - *Technical Highlight:* We discovered that the seed data stored dates as `"YYYY-MM-DD"` strings rather than ISO DateTimes. We dynamically adapted the Prisma Schema to handle `purchase_date` as a `String` to prevent parsing crashes while maintaining data integrity.
- **Frontend (React + Tailwind CSS + shadcn/ui):** We leveraged `shadcn/ui` to rapidly scaffold a premium, accessible interface without having to build complex modal states and tables from scratch.

---

## 3. Feature Walkthrough (Live Demo Guide)
*(Note for the presenter: Open `http://localhost:3000` here)*

1. **The Inventory Dashboard (Read):**
   - We have a clean data table displaying all equipment.
   - Notice the **Visual Status Badges** (Green for Available, Blue for Assigned, Orange for Maintenance, Gray for Retired). This allows the team to gauge inventory health at a glance.
2. **Adding Equipment (Create):**
   - Click "Add Equipment".
   - *Technical Highlight:* The form strictly enforces database constraints. You cannot type a random category; you *must* select from the valid dropdown options (Laptop, Monitor, etc.).
   - Error handling intercepts unique constraint violations (e.g., duplicate Serial Numbers).
3. **Modifying Inventory (Update):**
   - Click the edit icon on any row to instantly update its status or location.
4. **Removing Equipment (Delete):**
   - Click the trash icon.
   - *UX Highlight:* A destructive action like this triggers a confirmation dialog to prevent accidental data loss.

---

## 4. API Robustness
To prove the reliability of the backend, we built an automated CLI testing script (`test_api.sh`).
*(Note for the presenter: Run `./test_api.sh` in the terminal)*
- This script automatically hits every REST API endpoint (`GET`, `POST`, `PUT`, `DELETE`).
- It creates a test laptop, updates its status, and deletes it, confirming that the backend strictly adheres to REST principles and returns the correct HTTP status codes (like `204 No Content` on deletion).

---

## 5. Next Steps & Future Scaling
If we had another sprint to expand this module, we would focus on:
1. **Security:** Implementing NextAuth.js to restrict dashboard access to authorized IT staff only.
2. **Scalability:** Adding Server-Side Pagination and Search/Filtering to the table, allowing us to handle thousands of rows without performance drops.
3. **Analytics:** Adding a top row of metric cards (e.g., "Total Laptops Available", "Devices in Maintenance").

---

**Thank you! Any questions?**
