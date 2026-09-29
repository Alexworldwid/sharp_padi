import { Text } from "react-native";
import { SafeAreaView as RNSafeAreView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreView);


export default function Settings() {
    return (
        <SafeAreaView>
            <Text>Settings</Text>
        </SafeAreaView>
    )
}