import { Controller, Get, Query } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { SocialPost } from './models/social-post.model';
import { SocialMediaController } from './interfaces/social-media-controller.interface';

@Controller('reddit')
export class RedditController implements SocialMediaController {
  constructor(private readonly redditService: RedditService) {}

  @Get('search')
  search(@Query('q') query: string): Promise<SocialPost[]> {
    return this.redditService.searchPosts(query);
  }
}
