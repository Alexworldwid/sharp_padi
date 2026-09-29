import "../../global.css";
import { Text } from "react-native";
import { styled } from "nativewind";
import {
  SafeAreaView as RNSafeAreaView,
} from "react-native-safe-area-context";
import TitleBar from "@/components/titleBar";
import AllConversation from "@/components/allConversation";



const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center bg-background">
      <TitleBar />

      <Text className="text-xl text-foreground font-sans-regular">
        Welcome to Sharp Padi
      </Text>


      <AllConversation />

      
    </SafeAreaView>
  );
}
