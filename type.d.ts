import type { ImageSourcePropType } from "react-native";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: ImageSourcePropType;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }

    interface Conversation {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        participants: Participant[];
        messages: Message[]
    }

    interface Participant {
        id: number;
        conversationId: number;
        user: User;
        createdAt: Date;
        updatedAt: Date;
    }

    interface Message {
        id: number;
        conversationId: number;
        senderId: number;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface User {
        id: number;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

export {};