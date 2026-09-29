import { Text, View } from "react-native";

export default function ConversationList({ id, createdAt, updatedAt, participants, messages  }: Conversation) {
  const lastMessage = messages[messages.length - 1];

  return (
    <View>
      <View></View>
      <View></View>
      <View>
        <View>
            <Text className="color-foreground">
                {participants.map((participant) => participant.user.username).join(", ")}
            </Text>
            <Text className="color-foreground">
                {new Date(lastMessage.createdAt).toLocaleString()}
            </Text>
        </View>
        <View>
            <Text className="color-foreground">
                {lastMessage.content}
            </Text>
        </View>
      </View>
    </View>
  );
}
