import { Module } from '@nestjs/common';
import { AuthController } from './api/auth/auth.controller';
import { UsersController } from './api/users/users.controller';
import { BillingController } from './api/billing/billing.controller';
import { ProductionsController } from './api/productions/productions.controller';
import { AssetsController } from './api/assets/assets.controller';
import { ShortsController } from './api/shorts/shorts.controller';
import { GrowthController } from './api/growth/growth.controller';
import { BrandkitController } from './api/brandkit/brandkit.controller';
import { SocialController } from './api/social/social.controller';
import { OracleBridgeController } from './api/oracle-bridge/oracle-bridge.controller';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { BillingService } from './services/billing/billing.service';
import { CinemaService } from './services/cinema/cinema.service';
import { ShortsService } from './services/shorts/shorts.service';
import { GrowthService } from './services/growth/growth.service';
import { BrandkitService } from './services/brandkit/brandkit.service';
import { SocialService } from './services/social/social.service';
import { OracleSyncService } from './services/oracle-sync/oracle-sync.service';

@Module({
  imports: [],
  controllers: [
    AuthController,
    UsersController,
    BillingController,
    ProductionsController,
    AssetsController,
    ShortsController,
    GrowthController,
    BrandkitController,
    SocialController,
    OracleBridgeController,
  ],
  providers: [
    AuthService,
    UserService,
    BillingService,
    CinemaService,
    ShortsService,
    GrowthService,
    BrandkitService,
    SocialService,
    OracleSyncService,
  ],
})
export class AppModule {}
