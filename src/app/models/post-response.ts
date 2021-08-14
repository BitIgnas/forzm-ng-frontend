export interface PostResponse {
    id: number;
    title: string;
    content: string;
    created: Date;
    postType: string;
    forumForumName: string;
    forumImageUrl: string;
    userUsername: string;
    userDateCreated: Date;
    userProfileImageUrl: string;
}