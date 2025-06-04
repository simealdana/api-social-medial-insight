import { Injectable } from '@nestjs/common';
import { SocialPost, SocialComment } from './models/social-post.model';
import { SocialMediaType } from './models/social-media-type.enum';
import { SocialMediaCollector } from './interfaces/social-media-collector.interface';

@Injectable()
export class RedditService implements SocialMediaCollector {
  readonly type = SocialMediaType.REDDIT;
  async searchPosts(query: string): Promise<SocialPost[]> {
    const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) {
      throw new Error(`Failed to search Reddit: ${searchRes.status}`);
    }
    const searchData = await searchRes.json();
    const posts: SocialPost[] = [];
    for (const item of searchData.data.children) {
      const data = item.data;
      const post: SocialPost = {
        type: this.type,
        id: data.id,
        title: data.title,
        url: `https://www.reddit.com${data.permalink}`,
        comments: [],
      };
      post.comments = await this.fetchComments(data.subreddit, data.id);
      posts.push(post);
    }
    return posts;
  }

  private async fetchComments(subreddit: string, articleId: string): Promise<SocialComment[]> {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${articleId}.json`;
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length < 2) {
      return [];
    }
    const commentsListing = data[1].data.children;
    const comments: SocialComment[] = commentsListing.map((c: any) => {
      const d = c.data;
      return { id: d.id, author: d.author, body: d.body } as SocialComment;
    });
    return comments;
  }
}
