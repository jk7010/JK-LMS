# JK LMS Monorepo

This workspace is organized as a clean two-app project:

- `lmsbackend/` -> Node.js + Express + MongoDB API
- `lmsfrontend/` -> React client app

No root-level `node_modules` are required.

## Features Included

- User registration and login (Student/Teacher role-based)
- Course creation, update, delete (Teacher)
- Student course enrollment
- Assignment creation and listing
- Student assignment submission/edit
- Teacher grading and comments
- Student grade view
- Protected frontend routes by role
- Environment-variable based configuration

## Environment Setup

1. Backend env:
   - Copy `lmsbackend/.env.example` to `lmsbackend/.env`
   - Set real values for:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `PORT`
     - `CLIENT_ORIGIN`

2. Frontend env:
   - Copy `lmsfrontend/.env.example` to `lmsfrontend/.env`
   - Set `REACT_APP_API_BASE_URL`

## Install

From root:

```bash
npm run install:all
```

Or separately:

```bash
npm install --prefix lmsbackend
npm install --prefix lmsfrontend
```

## Run Development

- Backend only:

```bash
npm run dev:backend
```

- Frontend only:

```bash
npm run dev:frontend
```

- Both from backend script:

```bash
npm run app --prefix lmsbackend
```

## Build Frontend

```bash
npm run build:frontend
```

## Deployment Notes

- Keep backend and frontend deployed as separate services.
- Set all env vars in deployment platform settings (do not commit real secrets).
- Frontend should point to deployed backend URL via `REACT_APP_API_BASE_URL`.
