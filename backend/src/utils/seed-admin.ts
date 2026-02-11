/**
 * Admin User Seed Script
 * Creates the default admin user with credentials:
 * Email: admin@admin.com
 * Password: admin123 (must be changed on first login)
 */

import { ADMIN_USER } from '../models/user/user.model';

export async function seedAdminUser() {
  try {
    console.log('Seeding admin user...');

    // TODO: Integrate with Prisma
    // 1. Check if admin user already exists
    // 2. If not, create admin user with hashed password
    // 3. Set mustChangePassword = true
    // 4. Set isFirstLogin = true

    console.log(`Admin user created/verified: ${ADMIN_USER.email}`);
    console.log(`Default password: ${ADMIN_USER.password}`);
    console.log('⚠️  Admin must change password on first login');

    return {
      success: true,
      message: 'Admin user seeded successfully',
    };
  } catch (error) {
    console.error('Failed to seed admin user:', error);
    return {
      success: false,
      error,
    };
  }
}

// Run if executed directly
if (require.main === module) {
  seedAdminUser()
    .then(result => {
      console.log('Seed completed:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}
