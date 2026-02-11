import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { FeatureRequestsModule } from './feature-requests/feature-requests.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PrismaModule, VotesModule, FeatureRequestsModule, CommentsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
