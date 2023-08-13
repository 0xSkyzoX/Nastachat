import { ConversationType, ConversationsInfo, MemberInfo, MessageInfo } from "../datatypes";

export default class Conversation implements ConversationsInfo {
    id: string;
    type: ConversationType;
    members: MemberInfo[];
    messages: MessageInfo[];
    constructor(d: Conversation) {
        this.id = d.id
        this.type = d.type
        this.members = d.members
        this.messages = d.messages
    }
}