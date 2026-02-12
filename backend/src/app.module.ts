import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { CinemaService } from './services/cinema/cinema.service';
import { ShortsService } from './services/shorts/shorts.service';
import { BillingService } from './services/billing/billing.service';
import { BrandkitService } from './services/brandkit/brandkit.service';
import { GrowthService } from './services/growth/growth.service';
import { SocialService } from './services/social/social.service';
import { OracleSyncService } from './services/oracle-sync/oracle-sync.service';
import { TimelineService } from './services/timeline/timeline.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { SyncService } from './services/sync/sync.service';
import { AdminService } from './services/admin/admin.service';

// Controllers
import { AuthController } from './api/auth/auth.controller';
import { UsersController } from './api/users/users.controller';
import { ProductionsController } from './api/productions/productions.controller';
import { ShortsController } from './api/shorts/shorts.controller';
import { BillingController } from './api/billing/billing.controller';
import { BrandkitController } from './api/brandkit/brandkit.controller';
import { GrowthController } from './api/growth/growth.controller';
import { SocialController } from './api/social/social.controller';
import { AssetsController } from './api/assets/assets.controller';
import { OracleBridgeController } from './api/oracle-bridge/oracle-bridge.controller';
import { TimelineController } from './api/timeline/timeline.controller';
import { DashboardController } from './api/dashboard/dashboard.controller';
import { SyncController } from './api/sync/sync.controller';
import { AdminController } from './api/admin/admin.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    AuthController,
    UsersController,
    ProductionsController,
    ShortsController,
    BillingController,
    BrandkitController,
    GrowthController,
    SocialController,
    AssetsController,
    OracleBridgeController,
    TimelineController,
    DashboardController,
    SyncController,
    AdminController,
  ],
  providers: [
    AuthService,
    UserService,
    CinemaService,
    ShortsService,
    BillingService,
    BrandkitService,
    GrowthService,
    SocialService,
    OracleSyncService,
    TimelineService,
    DashboardService,
    SyncService,
    AdminService,
  ],
})
export class AppModule {}
