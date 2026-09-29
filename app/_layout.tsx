import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { AuthProvider, useAuth } from "@/context/authContext";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    "sans-bold": require("../assets/fonts/static/Inter_24pt-Bold.ttf"),
    "sans-regular": require("../assets/fonts/static/Inter_24pt-Regular.ttf"),
    "sans-semibold": require("../assets/fonts/static/Inter_24pt-SemiBold.ttf"),
    "sans-medium": require("../assets/fonts/static/Inter_24pt-Medium.ttf"),
    "sans-light": require("../assets/fonts/static/Inter_24pt-Light.ttf"),
    "sans-extrabold": require("../assets/fonts/static/Inter_24pt-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
