import { Ionicons } from "@expo/vector-icons"
import {View, Pressable, Text} from "react-native"

export default function TitleBar (){
    return(
        <View className="flex flex-row justify-between w-full align-middle px-3">
        <View>
          <Text className="color-primary text-lg">
            Edit
          </Text>
        </View>

        <View className="flex justify-center align-middle">
          <Text className="color-foreground font-bold text-xl">Messages</Text>
        </View>

        <View>
          <Pressable>
            <Ionicons name="create-outline" size={24} className="color-primary" />
          </Pressable>
        </View>
      </View>
    )
}