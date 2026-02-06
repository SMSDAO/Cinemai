# Scripts - CinemAi Neo

Utility scripts for development, deployment, and maintenance.

## 🛠️ Available Scripts

- **`bootstrap.sh`** - Set up development environment and install dependencies
- **`migrate.sh`** - Run database migrations
- **`seed.sh`** - Seed database with initial data
- **`deploy.sh`** - Deploy application to cloud
- **`sync-oracle.sh`** - Sync data with Oracle database

## 🚀 Usage

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run a script
./scripts/bootstrap.sh
```

## 📝 Notes

- All scripts should be idempotent (safe to run multiple times)
- Scripts should handle errors gracefully
- Use environment variables for configuration
