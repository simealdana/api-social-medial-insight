import { SocialMediaType } from "./social-media-type.enum";
export interface SocialComment {
  id: string;
  author: string;
  body: string;
}

export interface SocialPost {
  type: SocialMediaType;
  id: string;
  title: string;
  url: string;
  comments: SocialComment[];
}
