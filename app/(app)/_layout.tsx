
import { Slot, Stack, Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ROUTES } from "../../constants/Routes";
import { useAuthAndStyle } from "../../context/Context";


export default function AppLayout() {
  console.log("LOGIN LAYOUT")
  const {colors} = useAuthAndStyle()

  return (
    <Tabs  screenOptions={{ tabBarActiveTintColor: colors.primary, headerShown: false, }}>
      <Tabs.Screen
        name="search/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PAGE_FAVORITES}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PAGE_ADD}
        options={{
          title: 'Update',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PAGE_PROFILE}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>

  );
}
