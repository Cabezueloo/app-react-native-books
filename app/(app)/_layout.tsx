
import { Slot, Stack, Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ROUTES } from "../../constants/Routes";
import { useAuthAndStyle } from "../../context/Context";
import { useTranslation } from "react-i18next";
import { StringConstants } from "../../configs";


export default function AppLayout() {
  const {t} = useTranslation()
  const {colors} = useAuthAndStyle()

  return (
    <Tabs  screenOptions={{ tabBarActiveTintColor: colors.primary, headerShown: false, }}>
      <Tabs.Screen
        name="search/index"
        options={{
          title: t(StringConstants.home),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PAGE_FAVORITES}
        options={{
          title: t(StringConstants.favorites),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name={ROUTES.PAGE_ADD}
        options={{
          title: t(StringConstants.upload),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
        <Tabs.Screen
       name={ROUTES.PAGE_HOME_MESSAGES}
       options={{
        title: t(StringConstants.messages),
         tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
       }}
     />
      <Tabs.Screen
        name={ROUTES.PAGE_PROFILE}
        options={{
          title: t(StringConstants.profile),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages/chat"
        options={{ href: null, /* also you can hide header if needed */ }}
      />
    </Tabs>

  );
}
