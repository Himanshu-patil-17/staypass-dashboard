# StayPass Admin Dashboard

A modern, responsive Admin Dashboard for StayPass built with React, Vite, and Tailwind CSS.

## Features

- **Frontend Only**: No backend required.
- **Responsive Design**: Works on mobile and desktop.
- **Dashboard**: Statistics cards and analytics charts using Recharts.
- **Login**: Simulated login page with validation.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory.
3.  Install dependencies:

    ```bash
    npm install
    ```

## Running the Project

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

## Building for Production

To build the project for production:

```bash
npm run build
```

The output files will be in the `dist` directory.

## Project Structure

- `src/components`: Reusable UI components (Sidebar, TopNavbar, StatCard, AnalyticsCharts).
- `src/pages`: Page components (Login, Dashboard).
- `src/App.jsx`: Main application component with routing.
- `src/main.jsx`: Entry point.
