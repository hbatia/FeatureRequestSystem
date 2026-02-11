import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FeatureRequestsController } from './feature-requests.controller';
import { FeatureRequestsService } from './feature-requests.service';

@Module({
  imports: [PrismaModule],
  controllers: [FeatureRequestsController],
  providers: [FeatureRequestsService],
})
export class FeatureRequestsModule {}
