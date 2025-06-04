import { SocialPost } from '../models/social-post.model';

export interface SocialMediaController {
  search(query: string): Promise<SocialPost[]>;
}
