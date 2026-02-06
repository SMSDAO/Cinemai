#!/bin/bash
# Database migration script

echo "🔄 Running database migrations..."

cd backend
npm run migrate

echo "✅ Migrations complete!"
