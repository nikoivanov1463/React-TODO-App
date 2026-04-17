# 📝 React Todo Application

A responsive Todo application built with React using Tailwind CSS, with user preferences/tasks state managemenet. This application allows users to manage tasks, filter by specific users, and sort by titles or completion dates on completed tasks list.

---

## 📸 Screenshots of the app

![Application Main View](./src/images/main-app.png)
_The main page featuring the Pending and Completed task lists._

---

## ✨ Features

- **Context-Driven State:** Utilizes `TaskProvider.tsx` and `UserProvider.tsx` for centralized/shared data management.
- **Custom Hooks:** Clean data fetching and structuration via custom hooks for the providers Tasks and Users.
- **Completion Dates:** Automatically assigns the date when a task is completed in the completed tasks list or if a task is already completed it is set to yesterday's date by default.
- **Dynamic Filtering:** Filter tasks by specific users using a clean dropdown interface by username/user_id.
- **Advanced Sorting:**
  - **Pending List:** Sort alphabetically (A-Z / Z-A).
  - **Completed List:** Sort by date Desc(Newest)/Asc(Oldest) using timestamp comparison logic.
- **Motion UI:** Smooth entrance and layout animations powered by `motion/react` dependency.
- **Responsive Design:** Flexible responsive design using Tailwind CSS Flexbox logic.

---

## 🛠️ Technologies Used

- **React:** UI/Front-end Library.
- **Tailwind CSS:** Utility-first CSS framework for styling and responsive design.
- **motion/react (Framer Motion):** For tasks layout animations and transitions.
- **Contexts:** For global state management.
- **Custom Hooks:** For reusable business logic.

---

## 📂 Project Structure

`/components`:

- **CompletedTaskList:** Handles the view for finished items with date-sorting logic.
- **PendingTasksList:** Handles the view for active items.
- **TaskListLayout:** The core responsive layout for both Pending and Completed lists.

`/customHooks`: Custom hooks for fetching and managing task/user logic.

`/providers`: Contains `TaskProvider.tsx` and `UserProvider.tsx` to handle global state.

`/types`: TypeScript type references for app - `MyCustomTypes.tsx`.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v24.14.1 or higher
- **npm:** v11.11.0 or higher

---

## 🚀 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nikoivanov1463/React-TODO-App.git
   cd React-TODO-App
   ```

2. **Install needed dependencies:**

   ```bash
   npm install motion
   npm install tailwindcss @tailwindcss/vite
   ```

3. **Configure Tailwind:**

   ```typescript
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [
       ...
       tailwindcss(),
       ...
     ],
   });
   ```

   ```css
   /* Import Tailwindcss In CSS File */
   @import "tailwindcss";
   ```

## 💻 Running the App Locally

```bash
npm run dev
```
