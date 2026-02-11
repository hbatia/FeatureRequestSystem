import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { FeatureRequestsModule } from './feature-requests/feature-requests.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PrismaModule, VotesModule, FeatureRequestsModule, CommentsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
