#!/bin/bash
# Database migration script for Docker environment

set -e

echo "Waiting for PostgreSQL to be ready..."
sleep 2

echo "Generating Drizzle migrations..."
bun run drizzle-kit generate

echo "Running Drizzle migrations..."
bun run drizzle-kit migrate

echo "Migrations completed successfully!"
