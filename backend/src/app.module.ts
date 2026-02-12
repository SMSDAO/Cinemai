import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './services/user/user.service';
import { TimelineService } from './services/timeline/timeline.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { SyncService } from './services/sync/sync.service';
import { AdminService } from './services/admin/admin.service';
import { UsersController } from './api/users/users.controller';
import { TimelineController } from './api/timeline/timeline.controller';
import { DashboardController } from './api/dashboard/dashboard.controller';
import { SyncController } from './api/sync/sync.controller';
import { AdminController } from './api/admin/admin.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    UsersController,
    TimelineController,
    DashboardController,
    SyncController,
    AdminController,
  ],
  providers: [UserService, TimelineService, DashboardService, SyncService, AdminService],
})
export class AppModule {}
