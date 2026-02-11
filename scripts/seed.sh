#!/bin/bash
# Database seeding script

echo "🌱 Seeding database..."

cd backend

# Generate Prisma client
npm run prisma:generate

# Seed admin user
echo "🔐 Creating admin user..."
ts-node src/utils/seed-admin.ts

# Add additional seeding commands here
# ts-node src/utils/seed-data.ts

echo "✅ Seeding complete!"
echo ""
echo "📋 Default Admin Credentials:"
echo "   Email: admin@admin.com"
echo "   Password: admin123"
echo "   ⚠️  You MUST change this password on first login"
echo ""
