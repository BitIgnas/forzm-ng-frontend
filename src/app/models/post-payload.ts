import { User } from './user';

export interface PostPayload {
    title: string;
    content: string;
    contentMarkup: string;
    postType: string;
    forumName: string;
}