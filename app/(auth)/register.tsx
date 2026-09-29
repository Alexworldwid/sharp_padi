import "../../global.css";

import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
    KeyboardAvoidingView,
    Platform,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";

import { api } from "@/api/client";

const SafeAreaView = styled(RNSafeAreaView);

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert(
        "Missing information",
        "Please fill in all fields."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      console.log("Registered user:", response.user);

      /*
       * Registration currently doesn't return a JWT,
       * so we send the user to login after registration.
       */
      Alert.alert(
        "Account created",
        "Your account has been created. Please log in.",
        [
          {
            text: "Continue",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Registration failed", error.message);
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
          <Text className="text-4xl font-bold text-black">
            Create account
          </Text>

          <Text className="mt-2 text-base text-gray-600">
            Join Sharp Padi and start chatting.
          </Text>
        </View>

        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
           className="gap-5"
        >
          <View>
            <Text className="mb-2 text-sm font-semibold text-black">
              Username
            </Text>

            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              placeholderTextColor="#888"
              autoCapitalize="none"
              autoCorrect={false}
              className="rounded-xl bg-white px-4 py-4 text-base text-black"
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-semibold text-black">
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              className="rounded-xl bg-white px-4 py-4 text-base text-black"
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-semibold text-black">
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor="#888"
              secureTextEntry
              className="rounded-xl bg-white px-4 py-4 text-base text-black"
            />
          </View>

          <Pressable
            onPress={handleRegister}
            disabled={loading}
            className="mt-2 items-center rounded-xl bg-black py-4"
          >
            <Text className="text-base font-semibold text-white">
              {loading ? "Creating account..." : "Create account"}
            </Text>
          </Pressable>
        </ScrollView>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">
            Already have an account?{" "}
          </Text>

          <Pressable onPress={() => router.replace("/login")}>
            <Text className="font-semibold text-black">
              Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
