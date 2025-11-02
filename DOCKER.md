# Docker Setup Guide

This guide explains how to run SciFeed using Docker and Docker Compose.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

## Quick Start

### 1. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

The `.env` file already contains a generated `BETTER_AUTH_SECRET`. You can keep it for development or generate a new one:

```bash
openssl rand -base64 32
```

### 2. Start the Services

Start PostgreSQL and the Next.js app:

```bash
docker-compose up -d
```

This will:
- Pull the PostgreSQL 16 image
- Build the Next.js application with Bun
- Start both services
- Create a persistent volume for the database

### 3. Run Database Migrations

Generate and run the database migrations:

```bash
# Generate migration files
bun run db:generate

# Apply migrations to the database
bun run db:migrate
```

Or use the migration script:

```bash
./scripts/migrate.sh
```

### 4. Access the Application

- **Application**: http://localhost:3000
- **Database**: localhost:5432
  - User: `scifeed`
  - Password: `scifeed_dev_password`
  - Database: `scifeed`

## Useful Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Just the app
docker-compose logs -f app

# Just the database
docker-compose logs -f postgres
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes (⚠️ This deletes all data)

```bash
docker-compose down -v
```

### Rebuild the Application

If you make changes to the Dockerfile or dependencies:

```bash
docker-compose up -d --build
```

### Access Database Directly

```bash
docker exec -it scifeed-db psql -U scifeed -d scifeed
```

### Run Commands Inside the App Container

```bash
docker exec -it scifeed-app bun run db:studio
```

## Database Management

### Drizzle Studio (Visual Database Editor)

Run Drizzle Studio to visually inspect and edit your database:

```bash
bun run db:studio
```

Then open http://localhost:4983

### Creating New Migrations

After modifying the schema in `lib/db/schema.ts`:

```bash
# Generate migration files
bun run db:generate

# Apply to database
bun run db:migrate
```

### Push Schema Directly (Development Only)

To push schema changes without creating migration files:

```bash
bun run db:push
```

⚠️ **Warning**: This is for development only and can cause data loss.

## Development Workflow

### With Docker

1. Start services: `docker-compose up -d`
2. Make code changes (hot reload is enabled)
3. View logs: `docker-compose logs -f app`
4. Stop services: `docker-compose down`

### Without Docker (Local Development)

If you prefer to run the app locally but use Docker only for PostgreSQL:

```bash
# Start only PostgreSQL
docker-compose up -d postgres

# Run the app locally
bun run dev
```

Update `.env.local` to use:
```
DATABASE_URL="postgresql://scifeed:scifeed_dev_password@localhost:5432/scifeed"
```

## Production Considerations

Before deploying to production:

1. **Change default passwords** in `docker-compose.yml`
2. **Use secrets management** for sensitive environment variables
3. **Set up proper backups** for the PostgreSQL volume
4. **Configure BETTER_AUTH_URL** to your production domain
5. **Add OAuth credentials** for GitHub/Google login
6. **Use a reverse proxy** (nginx, Traefik) with SSL/TLS
7. **Configure resource limits** in docker-compose.yml

## Troubleshooting

### Port Already in Use

If port 3000 or 5432 is already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Use port 3001 on host instead
```

### Database Connection Issues

1. Check if PostgreSQL is healthy:
   ```bash
   docker-compose ps
   ```

2. Verify database connectivity:
   ```bash
   docker exec -it scifeed-db pg_isready -U scifeed
   ```

### App Won't Start

1. Check logs:
   ```bash
   docker-compose logs app
   ```

2. Rebuild the container:
   ```bash
   docker-compose up -d --build app
   ```

### Clear Everything and Start Fresh

```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## Architecture

```
┌─────────────────────┐
│   Browser/Client    │
│  localhost:3000     │
└──────────┬──────────┘
           │
           │ HTTP
           │
┌──────────▼──────────┐
│   Next.js App       │
│   (scifeed-app)     │
│   - Better Auth     │
│   - API Routes      │
│   - Server Actions  │
└──────────┬──────────┘
           │
           │ PostgreSQL Protocol
           │
┌──────────▼──────────┐
│   PostgreSQL DB     │
│   (scifeed-db)      │
│   - User data       │
│   - Bookmarks       │
│   - Preferences     │
└─────────────────────┘
```
