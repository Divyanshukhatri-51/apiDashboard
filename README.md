React Redux Users CRUD Dashboard
A complete React application demonstrating API integration, Redux Toolkit state management, and full CRUD operations using JSONPlaceholder mock API.

Features
✅ Fetch users from public API (https://jsonplaceholder.typicode.com/users)

✅ Redux Toolkit with async thunks for data fetching

✅ Full CRUD operations (Create, Read, Update, Delete) stored in Redux

✅ Clean dashboard table with loading/error states

✅ Reusable form components for add/edit

✅ Modern folder structure following Redux best practices

Project Structure
text
src/
├── api/              # API service layer
│   └── usersApi.js
├── app/              # Redux store configuration
│   └── store.js
├── features/         # Redux slices + components
│   └── users/
│       ├── usersSlice.js
│       ├── UsersTable.jsx
│       └── UserForm.jsx
├── App.jsx
└── index.js

Quick Setup
bash
# Clone & install
npm create vit@latest dashboard
cd dashboard

# Install dependencies
npm install @reduxjs/toolkit react-redux axios

# Copy source files to src/
# Run the app
npm run dev
Live Demo: Opens at http://localhost:3000

API Integration
Primary Endpoint: GET https://jsonplaceholder.typicode.com/users

Returns 10 mock users with nested address/company data. The app fetches on mount and displays in a responsive table.

Note: JSONPlaceholder is read-only, so Create/Update/Delete operations persist only in Redux state (ideal for portfolio demos).

Redux State Flow
API Call → fetchUsers thunk → users.list[] → Table render
                ↓
      userAdded() → adds to users.list[]
      userUpdated() → merges changes by ID
      userDeleted() → filters by ID
Usage
Read: Users auto-load on app start

Create: Fill form → "Create" button adds to table

Update: Click "Edit" → modify form → submit

Delete: Click "Delete" button removes row instantly

Key Components Breakdown
Component	Purpose	Redux Actions
UsersTable	Main dashboard + table	fetchUsers, CRUD ops
UserForm	Reusable add/edit form	userAdded, userUpdated
usersSlice	All users state + logic	Full CRUD reducers + thunk
Error & Loading States
Loading: Spinner text during API fetch

Error: Red error message if fetch fails

Empty: "No users found" message

Portfolio Value
Perfect for junior full-stack interviews:

✅ Shows React + Redux Toolkit proficiency

✅ Demonstrates API integration patterns

✅ Clean, scalable folder structure

✅ Loading/error handling

✅ Local CRUD persistence

✅ Production-ready code organization

Dependencies
json
{
  "@reduxjs/toolkit": "^2.0.0",
  "react-redux": "^9.0.0",
  "axios": "^1.6.0",
  "nanoid": "^5.0.0"
}
