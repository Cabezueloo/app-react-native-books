import { DataProvider } from "context/DataContext"
import { Slot, Stack, Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AppLayout() {
  console.log("LOGIN LAYOUT")

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',headerShown:false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
