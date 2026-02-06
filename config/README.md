# Configuration - CinemAi Neo

Environment-specific configuration files.

## 🏗️ Configuration Files

- **`default.json`** - Default configuration values
- **`development.json`** - Development environment overrides
- **`staging.json`** - Staging environment overrides
- **`production.json`** - Production environment overrides
- **`secrets.example.json`** - Example secrets template (do not commit actual secrets)

## 🔐 Security

Never commit actual secrets or sensitive data. Use environment variables or secure secret management systems.

## 📝 Usage

Configuration files are loaded based on `NODE_ENV`:
- `NODE_ENV=development` loads `default.json` + `development.json`
- `NODE_ENV=production` loads `default.json` + `production.json`
