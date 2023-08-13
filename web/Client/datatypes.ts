export enum UserType {
     Staff = 0, // Kind of moderator but Junior Moderator
     Member = 1, // This is the default type of any one registred
     Premuim = 2, // Premuim for giving some special features for members who bought it
     Admin = 3, // This is for admins can edit and ban and do any thing and have access to the admin panel
}

export type UserData = {
     username: string,
     email: string,
     fullname: string,
     profile: {
          avatar: string, bio: string,
          friends: FriendInfo[],
          notifications: NotificationsInfo[]
     },
     verified: boolean,
     type: UserType,
     id: string,
}

export type MemberInfo = {
     username: string,
     fullname: string,
     avatar: string,
     id: string,
     bio: string
}

export type ReferenceInfo = {
     post_id?: string;
     mentioned?: boolean
}

export type CommentInfo = {
     by: {
          username: string,
          id: string,
          avatar?: string
     },
     content: string,
     id: string
}

export type PostInfo = {
     title: string,
     img?: string,
     description?: string,
     owner: { username: string, avatar: string, id: string, fullname: string },
     comments?: CommentInfo[],
     id: string,
     likes: string[],
     createdAt: string,
     reference?: ReferenceInfo
}

export type FriendInfo = {
     fullname: string,
     username: string,
     avatar?: string,
     accepted?: boolean,
     id: string,
     requested: boolean
}

export type NotificationsInfo = { name: string, by?: string, description: string, user_id?: string }


export enum ErrorTypes {
     Invalid_Token = 0,
     Expired_Token = 1
}

export type MessageInfo = {
     content: string,
     author: MemberInfo,
     createdAt: string
}

export type ConversationType = "PRIVATE" | "GROUP" | "PUBLIC"

export type ConversationsInfo = {
     type: ConversationType,
     members: MemberInfo[],
     messages: MessageInfo[],
     id: string
}

export type ProfileInfo = {
     username: string,
     fullname: string,
     bio: string,
     avatar: string,
}

export type InboxList = {
     username: string,
     fullname: string,
     avatar: string,
     id: string,
     bio: string,
     conversation_id: string
}

export type EventType = "NotificationCreate" | "MessageCreate"