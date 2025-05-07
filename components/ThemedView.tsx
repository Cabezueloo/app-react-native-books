import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'container' | 'containerItems',

};

export function ThemedView({ style, lightColor, darkColor, type='default' , ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, type === 'container' ? styles.container : undefined,
     type==='containerItems' ? styles.containerItems : undefined,
     type==='default' ? styles.default : undefined
    ]} {...otherProps} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  default:{

  },
  containerItems:{
    flex:1
  }


})