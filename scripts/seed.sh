#!/bin/bash
# Database seeding script

echo "🌱 Seeding database..."

cd backend
npm run prisma:generate
# Add seeding commands here

echo "✅ Seeding complete!"
