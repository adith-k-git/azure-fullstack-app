# Task Manager

A full-stack task management app with a React and Vite frontend, an Express API, and MongoDB.

## Features

- Create, view, edit, and delete tasks
- Search tasks by title and filter by status
- Sort tasks by priority and paginate results
- Validate task data and show API errors in the UI
- Run locally or with Docker Compose

## Requirements

- Node.js 20 or later and npm
- MongoDB 7 or a MongoDB connection string
- Docker Desktop, if using Docker Compose

## Local setup

From the project root, install the workspace dependencies:

```bash
npm install
```

Create your local backend environment file by copying `backend/.env.example` to `backend/.env`. Set `MONGO_URI` to your MongoDB connection string. For a local MongoDB instance, the values can be:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
NODE_ENV=development
```

Start the backend and frontend from the project root:

```bash
npm run dev
```

Open <http://localhost:3000>. The API runs at <http://localhost:5000>.

If your API runs at a different URL, create `frontend/.env` and set `VITE_API_URL`, for example:

```env
VITE_API_URL=http://localhost:5000/api
```

Restart Vite after changing frontend environment variables.

## Docker Compose

From the project root, run:

```bash
docker compose up --build
```

The frontend is available at <http://localhost:3000>, the API at <http://localhost:5000>, and MongoDB at `localhost:27017`.

## Data and environment files

Local `.env` files, dependency folders, build output, and the archived `frontend/install-output.txt` file are excluded from Git. Do not commit credentials or private connection strings. Each contributor should create their own `backend/.env` using `backend/.env.example`; set `MONGO_URI` to their own local or hosted MongoDB instance. For a different frontend API address, add `VITE_API_URL` in `frontend/.env`.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | List tasks with optional search, status, sort, and pagination parameters |
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks/:id` | Get one task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
