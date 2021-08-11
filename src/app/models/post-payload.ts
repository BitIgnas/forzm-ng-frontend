import { User } from './user';

export interface PostPayload {
    title: string;
    content: string;
    postType: string;
    forumName: string;
    user: User;
}