import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';
import { ColorsInterface } from '../constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Determine color key based on text type
  const colorKey = (
    {
      title: 'primary',
      subtitle: 'secondary',
      link: 'accent',
      default: 'text',
      defaultSemiBold: 'text',
    } satisfies Record<ThemedTextProps['type'], keyof ColorsInterface>
  )[type];

  // Get theme color
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorKey // Use dynamic color key
  );

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    
    
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
