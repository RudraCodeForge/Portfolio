# Prince Daksh Portfolio

A modern, responsive developer portfolio built with React, Vite, and a Node.js backend. This project showcases personal work, technical skills, experience, education, GitHub activity, and a contact flow in a clean dark-themed interface.

## Live Demo

https://portfolio-alpha-two-4l3iyz4zzc.vercel.app/

## Overview

This portfolio is designed for developers who want a polished personal brand page with:

- responsive layout for desktop, tablet, and mobile
- modern dark UI with accent highlights
- project showcase with filtering and pagination
- editable content-driven data structure
- live GitHub contribution and repo insights
- admin dashboard for managing portfolio content
- contact form and backend email integration

## Features

- Fast frontend powered by React 19 and Vite
- Modular component structure for easier maintenance
- Portfolio sections for projects, experience, education, and skills
- GitHub GraphQL integration for contribution tracking
- Separate frontend, admin, and backend app structure
- Clean API layer for frontend and admin communication
- MongoDB-backed backend for data persistence
- JWT-based admin authentication
- Contact email support through Resend

## Tech Stack

- React 19
- Vite
- React Router DOM
- CSS Modules
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- GitHub GraphQL API
- Resend Email API

## Project Structure

```text
Portfolio/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── Admin/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── Backend/
│   ├── Config/
│   ├── Controller/
│   ├── Models/
│   ├── Routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 20 or later
- npm
- MongoDB instance or connection string
- GitHub token for live GitHub data
- Email service API key for contact emails

### 1. Install Dependencies

Run the following command in each app folder as required:

```bash
cd Frontend
npm install
```

```bash
cd Admin
npm install
```

```bash
cd Backend
npm install
```

### 2. Environment Variables

Create a separate `.env` file in each project folder and add only the required keys. Do not commit real secret values to GitHub.

#### Frontend `.env`

```env
VITE_API_URL
```

- Used by the frontend to connect with the backend API.

#### Admin `.env`

```env
VITE_API_URL
VITE_ADMIN_URL
```

- `VITE_API_URL`: backend URL used by the admin app.
- `VITE_ADMIN_URL`: admin app URL for redirect or related app links.

#### Backend `.env`

```env
PORT
NODE_ENV
MONGO_URI
FRONTEND_URL
ADMIN_URL
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
RESEND_API_KEY
CONTACT_EMAIL
GITHUB_TOKEN
```

- `PORT`: backend port number
- `NODE_ENV`: development or production mode
- `MONGO_URI`: MongoDB connection string
- `FRONTEND_URL`: frontend application URL
- `ADMIN_URL`: admin application URL
- `ACCESS_TOKEN_SECRET`: JWT access token secret
- `REFRESH_TOKEN_SECRET`: JWT refresh token secret
- `RESEND_API_KEY`: email API key
- `CONTACT_EMAIL`: email used for contact notifications
- `GITHUB_TOKEN`: GitHub API token for contribution and repo data

### 3. Run the Project

#### Frontend

```bash
cd Frontend
npm run dev
```

The frontend usually runs at:

```text
http://localhost:5173
```

#### Backend

```bash
cd Backend
npm start
```

The backend usually runs at:

```text
http://localhost:5000
```

#### Admin

```bash
cd Admin
npm run dev
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Admin

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm start
npm run dev
```

## GitHub Integration

The GitHub section uses the GitHub GraphQL API to fetch:

- recent contribution count
- contribution graph data
- owned repositories
- primary language and star count

The profile username is configured in the app code and the token is required for authenticated requests.

## Editing Content

Most portfolio data is separated from page components so it is easy to update:

- Projects: `Frontend/src/data/Projects.js`
- Experience: `Frontend/src/data/Experience.js`
- Education: `Frontend/src/data/Education.js`
- Skills: `Frontend/src/data/GoodAtData.js`

Update these files and restart the local app when needed.

## Routes

- `/` - main portfolio page
- `/projects` - full project list
- `/projects?page=2` - paginated project list

## Deployment Notes

Before deploying, make sure:

1. environment variables are added to your hosting platform
2. the frontend is built with `npm run build`
3. the generated dist folder is deployed correctly
4. SPA fallback routing is configured for route-based pages

Because Vite exposes `VITE_*` variables to the browser, keep them limited and avoid exposing sensitive data.

## Contact Form

The contact form is built to prevent page reloads and send the form data through the app flow. It can be connected to an email backend or external service for production usage.

## License

This project is intended for personal portfolio use and learning. Please do not copy or present the work as your own without permission.
