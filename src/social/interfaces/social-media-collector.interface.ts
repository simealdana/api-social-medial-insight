import { SocialPost } from '../models/social-post.model';
import { SocialMediaType } from '../models/social-media-type.enum';

export interface SocialMediaCollector {
  readonly type: SocialMediaType;
  searchPosts(query: string): Promise<SocialPost[]>;
}
