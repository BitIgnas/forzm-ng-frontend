export interface PostResponse {
    id: number;
    title: string;
    content: string;
    contentMarkup: string;
    created: Date;
    postType: string;
    postImageUrl: string;
    forumForumName: string;
    forumImageUrl: string;
    userUsername: string;
    userProfileImageUrl: string;
    userDateCreated: Date;
}