import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import GroupList from "./components/GroupList";
import GroupPage from "./components/GroupPage";
import ExpenseDetails from "./components/ExpenseDetails";
import AddExpense from "./components/AddExpense";
import Friends from "./components/Friends";
import AddGroup from "./components/AddGroup";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry, Layout, Text, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as defaultTheme } from './SplitwiseTheme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = React.useState('light');

  const MoonIcon = (props) => (
    <Icon {...props} name='moon-outline'/>
  );

  const SunIcon = (props) => (
    <Icon {...props} name='sun-outline'/>
  );

  const [icon, setIcon] = React.useState(MoonIcon);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const nextIcon = theme === 'light' ? SunIcon : MoonIcon;
    setTheme(nextTheme);
    setIcon(nextIcon);
  };

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ThemeContext.Provider value={{ theme, icon, toggleTheme }}>
    <ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}}>
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen
            name="Register"
            component={Register}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            />
            <Stack.Screen
            name="GroupList"
            component={GroupList}
            />
            <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={({route}) => ({title: route.params.title})}
            />
            <Stack.Screen 
            name="ExpenseDetails" 
            component={ExpenseDetails} 
            options={({ route }) => ({title: route.params.title})}
            />
            <Stack.Screen
            name="AddExpense"
            component={AddExpense}
            />
            <Stack.Screen
            name="Friends"
            component={Friends}
            />
            <Stack.Screen
            name="AddGroup"
            component={AddGroup}
            />
            <Stack.Screen
            name="Profile"
            component={Profile}
            />
            <Stack.Screen
            name="Settings"
            component={Settings}
            />
    </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    </ThemeContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
