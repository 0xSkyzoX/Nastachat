import { CommentInfo, PostInfo, ReferenceInfo } from "../datatypes";

export default class Post implements PostInfo {
    title: string;
    description?: string;
    img?: string;
    createdAt: string;
    owner: { username: string; avatar: string; id: string; fullname: string; };
    comments?: CommentInfo[];
    likes: string[];
    id: string;
    reference?: ReferenceInfo;
    constructor(post: PostInfo) {
        this.comments = post.comments;
        this.createdAt = post.createdAt;
        this.description = post.description;
        this.id = post.id;
        this.likes = post.likes;
        this.title = post.title;
        this.reference = post.reference;
        this.owner = post.owner;
        this.img = post.img
    }
}