import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditController } from './social/reddit.controller';
import { RedditService } from './social/reddit.service';

@Module({
  imports: [],
  controllers: [AppController, RedditController],
  providers: [AppService, RedditService],
})
export class AppModule {}
