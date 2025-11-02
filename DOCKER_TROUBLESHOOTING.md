# Docker Troubleshooting

## Network Interface Error

If you see this error:
```
failed to add the host (veth...) <=> sandbox (veth...) pair interfaces: operation not supported
```

This is a **system-level Docker networking issue**, not a problem with the SciFeed configuration.

### Quick Fix: Use PostgreSQL Only in Docker

The simplest workaround is to run only PostgreSQL in Docker and run the app locally:

```bash
# Start only PostgreSQL
docker-compose up -d postgres

# Run the app locally with Bun
bun run dev
```

Make sure your `.env.local` has:
```env
DATABASE_URL="postgresql://scifeed:scifeed_dev_password@localhost:5432/scifeed"
```

Then run migrations:
```bash
bun run db:generate
bun run db:migrate
```

### Potential System-Level Fixes

The networking error is typically caused by:

1. **Kernel module issues** (especially on custom Linux kernels)
2. **Docker daemon configuration**
3. **Firewall/iptables conflicts**
4. **WSL2 networking issues** (if on Windows)

#### Try these fixes:

**1. Restart Docker daemon:**
```bash
sudo systemctl restart docker
```

**2. Check Docker network driver:**
```bash
docker network ls
docker network inspect bridge
```

**3. Try using host network (Linux only):**

Modify `docker-compose.yml`:
```yaml
services:
  postgres:
    network_mode: "host"
    # Remove the ports section when using host network
```

**4. Check kernel modules:**
```bash
lsmod | grep veth
lsmod | grep bridge
```

If missing, load them:
```bash
sudo modprobe veth
sudo modprobe bridge
```

**5. Check Docker version compatibility:**
```bash
docker --version
docker-compose --version
```

Consider updating to the latest Docker version.

**6. Reset Docker networks:**
```bash
docker network prune
sudo systemctl restart docker
```

## Alternative: Simpler Docker Setup

If issues persist, use this simplified `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: scifeed
      POSTGRES_PASSWORD: scifeed_dev_password
      POSTGRES_DB: scifeed
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Then run the Next.js app directly on your host machine.

## Working Development Setup (Recommended)

For development, we recommend:

1. **PostgreSQL in Docker** (isolated, easy to reset)
2. **Next.js app running locally** (faster hot reload, easier debugging)

```bash
# Terminal 1: Start PostgreSQL
docker-compose up postgres

# Terminal 2: Run app
bun run dev
```

This gives you the best of both worlds:
- Isolated database you can easily reset
- Fast development experience with hot reload
- No Docker networking complexities
- Easy access to debugging tools

## Production Deployment

For production, consider using:
- **Vercel** (zero config, handles everything)
- **Railway** (includes managed PostgreSQL)
- **Render** (Docker-based, includes PostgreSQL)
- **Fly.io** (Docker-based, global deployment)

These platforms handle Docker networking and infrastructure for you.
