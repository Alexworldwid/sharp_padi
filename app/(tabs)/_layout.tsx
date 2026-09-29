import { Tabs } from "expo-router"
import {tabs} from "../../constants/data"
import {clsx} from "clsx";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Image, View } from "react-native";


const tabBar = {
    height: 72,
    horizontalInset: 20,
    radius: 24,
    iconFrame: 48,
    itemPaddingVertical: 8,
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    const TabIcon = ({ focused, icon }: TabIconProps) => {
        return (
            <View className={clsx("items-center justify-center", focused && "rounded-full bg-white/10")}>
                <Image source={icon} resizeMode="contain" className="size-12" />
            </View>
        );
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                    height: tabBar.height,
                    margin: tabBar.horizontalInset,
                    borderRadius: tabBar.radius,
                    backgroundColor: "#081126",
                    borderTopWidth: 0,
                    elevation: 0
                },
                tabBarItemStyle: {
                    paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
                },
                tabBarIconStyle: {
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: 'center'
                }
            }}
        >
            {
                tabs.map((tab) => (
                    <Tabs.Screen 
                        key={tab.name} 
                        name={tab.name} 
                        options={{
                            title: tab.title,
                            tabBarIcon: ({focused}) => (
                                <TabIcon focused={focused} icon={tab.icon} />
                            )
                        }} 
                    />
                ))
            }
        </Tabs>
    )
}