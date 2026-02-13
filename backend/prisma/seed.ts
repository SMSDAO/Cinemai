import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed database with admin user
 * This script is idempotent and production-safe:
 * - Creates admin user if not exists
 * - Updates existing user to admin role if needed
 */
async function main() {
  console.log('🌱 Seeding database...');

  // Admin user credentials
  const adminEmail = 'admin@admin.com';
  const adminPassword = 'Admin123$';
  const adminName = 'Admin User';

  // Hash password
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  // Check if admin user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingUser) {
    // Create new admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: UserRole.ADMIN,
        isFirstLogin: false,
        mustChangePassword: false,
      },
    });

    console.log(`✅ Created admin user: ${admin.email} (ID: ${admin.id})`);
  } else if (existingUser.role !== UserRole.ADMIN) {
    // Update existing user to admin role
    const admin = await prisma.user.update({
      where: { email: adminEmail },
      data: {
        role: UserRole.ADMIN,
        passwordHash, // Update password in case it changed
      },
    });

    console.log(`✅ Updated user to admin: ${admin.email} (ID: ${admin.id})`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${existingUser.email} (ID: ${existingUser.id})`);
  }

  console.log('🌱 Seeding completed!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
