import "../../global.css";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/authContext";

import { api } from "@/api/client";
import { saveToken } from "@/api/auth";

const SafeAreaView = styled(RNSafeAreaView);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      await saveToken(response.token);
      login();
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="justify-center px-6"
       >
        <View className="mb-10">
          <Text className="text-4xl font-bold text-black">Welcome back</Text>

          <Text className="mt-2 text-base text-gray-600">
            Login to continue chatting with your people.
          </Text>
        </View>

        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, gap: 20 }}
        >
          <View>
            <Text className="mb-2 text-sm font-semibold text-black">Email</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="rounded-xl bg-white px-4 text-base text-black h-16 text-base leading-6"
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-semibold text-black">
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              className="rounded-xl bg-white px-4 py-4 text-base text-black"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className="mt-2 items-center rounded-xl bg-black py-4"
          >
            <Text className="text-base font-semibold text-white">
              {loading ? "Logging in..." : "Login"}
            </Text>
          </Pressable>
        </ScrollView>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Don&apos;t have an account? </Text>

          <Pressable onPress={() => router.push("/register")}>
            <Text className="font-semibold text-black">Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
