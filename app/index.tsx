import { Text, View } from "react-native";
import TabNavigator from '../navigation/TabNavigator';
import 'react-native-get-random-values';
import { LogBox } from 'react-native';

// Temporary
export default function Index() {
  LogBox.ignoreLogs([
    'TextElement: Support for defaultProps will be removed', // suppresses the warning
  ]);

  return  <TabNavigator />;
}
