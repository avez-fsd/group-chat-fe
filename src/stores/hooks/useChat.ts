import { create } from 'zustand'

export interface GroupData {
    groupUniqueId: string,
    isAdmin: boolean,
    isGroup: boolean,
    name: string,
    otherParticipants: OtherParticipant[]
}

export interface Message {
    message: string;
    createdAt: string;
    updatedAt: string;
    user: {
      name: string;
      email: string;
      userUniqueId: string;
    };
}

interface OtherParticipant {
    email: string,
    name: string,
    userUniqueId: string
}

interface ChatState {
    isActive: boolean,
    groupData: GroupData | undefined,
    messages: Message[] | [],
    setGroup: (payload:any) => void,
    setMessages: (payload:any) => void,
    setMessage: (message:any) => void,
    setIsActive: (isActive: boolean) => void,
}

export const useChat = create<ChatState>((set) => ({
    groupData: undefined,
    isActive: false,
    messages: [],
    setGroup: (payload: any) => set(() => ({ groupData: payload})),
    setMessages: (payload: any) => set(() => ({ messages: payload})),
    setMessage: (message: any) => set((state) => ({ messages: [...state.messages, message]})),
    setIsActive: (isActive: any) => set(() => ({ isActive })),
}))