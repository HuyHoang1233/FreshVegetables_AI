# My Fullstack App

A production-oriented monorepo for a Next.js web application, Spring Boot REST API, PostgreSQL, Redis, and Nginx.

## Architecture

`Browser -> Nginx -> Next.js / Spring Boot -> PostgreSQL (and Redis)`

The browser uses `/api/v1` in production, so Nginx forwards API calls without exposing the backend or database publicly. Docker Compose provides persistent PostgreSQL and Redis volumes plus health-gated startup dependencies.

## Prerequisites

- Docker Desktop with Docker Compose v2
- For non-Docker development: Node.js 20+, npm, Java 21, Maven 3.9+, PostgreSQL 16+

## Configure the environment

Copy the example file before starting. Replace the placeholder database password and JWT secret with unique values.

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

`.env` is deliberately ignored by Git. Never use the sample secret values in an internet-facing environment.

## Run with Docker

Local development (automatically merges `compose.override.yaml`, exposes frontend at `http://localhost:3000` and backend at `http://localhost:8080`):

```bash
docker compose up --build
```

Production-style deployment (uses only `compose.yaml`, exposes Nginx on `http://localhost` by default):

```bash
docker compose -f compose.yaml up -d --build
```

Useful commands:

```bash
docker compose down
docker compose logs -f backend
docker compose logs -f frontend
```

The same commands are available through `make up`, `make prod`, `make down`, `make logs-backend`, and `make logs-frontend` when GNU Make is installed.

## Run without Docker

1. Create a PostgreSQL database matching `POSTGRES_DB` and configure the variables in `backend/.env.example` or your shell.
2. Start the backend:

   ```bash
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

3. In a second terminal, start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Set `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1` for the frontend in this mode.

## Project structure

```text
frontend/              Next.js App Router client
backend/               Spring Boot API and Flyway migrations
docker/nginx/          Reverse-proxy configuration
compose.yaml           Production-style services
compose.override.yaml  Local development overrides and hot reload mounts
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `POSTGRES_*` | PostgreSQL database name, user, password, and local port |
| `JWT_SECRET` | Secret used to sign JWTs; use at least 32 random characters |
| `JWT_EXPIRATION` / `REFRESH_TOKEN_EXPIRATION` | Token lifetimes in seconds |
| `NEXT_PUBLIC_API_URL` | Production browser API path; default `/api/v1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated browser origins allowed by the API |
| `BOOTSTRAP_ADMIN_EMAIL` / `BOOTSTRAP_ADMIN_PASSWORD` | Optional first administrator account; set both before the first startup, then remove both variables from the environment |
| `APP_PORT` | Nginx's public HTTP port in production-style Compose |

## Add a module

1. Add the domain entity, DTOs, mapper, repository, service, controller, and migration under `backend`.
2. Add typed API functions and feature UI under `frontend/src/features`.
3. Protect endpoints with the appropriate role and update API tests.
4. Add a Flyway migration; do not modify an already-applied migration.

## Troubleshooting

- **A port is already in use:** change `APP_PORT`, `FRONTEND_PORT`, `BACKEND_PORT`, or `POSTGRES_PORT` in `.env`.
- **Backend waits indefinitely:** inspect `docker compose logs postgres`; PostgreSQL must pass its healthcheck before the backend starts.
- **Frontend cannot reach the API locally:** use `http://localhost:8080/api/v1` in development; production uses `/api/v1` through Nginx.
- **Schema mismatch:** check Flyway output in backend logs. Do not use `ddl-auto: update` to bypass migrations.
- **Reset local data:** stop the stack, then explicitly remove the named Docker volumes only if losing local data is acceptable.

## Health endpoints

- Reverse proxy: `GET /health`
- API: `GET /actuator/health`
