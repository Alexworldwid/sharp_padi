import { api } from "@/api/client";
import "../global.css";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import ConversationList from "./conversationList";

export default function AllConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);

        const data = await api("/conversations");

        console.log("Conversation:", data);

        setConversations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => (
        <ConversationList {...item} />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        !loading ? (
          <Text className="color-foreground">No Conversation yet</Text>
        ) : null
      }
    />
  );
}
