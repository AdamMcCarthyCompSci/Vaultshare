import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import Expenses from "./components/Expenses";
import Members from "./components/Members";
import ExpenseDetails from "./components/ExpenseDetails";
import AddExpense from "./components/AddExpense";
import AddGroup from "./components/AddGroup";
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry, Layout, Text, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as defaultTheme } from './SplitwiseTheme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './ThemeContext';
import { NavigationContext } from './NavigationContext';
import Home from './components/Home';

const { Navigator, Screen } = createStackNavigator();

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

  const [tab, setTab] = React.useState(0);

  const changeTab = (props) => {
    setTab(props);
  };

  const darkMode = (theme == 'dark' ? DarkTheme : DefaultTheme);
  const navigationTheme = {
      ...darkMode,
    }

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ThemeContext.Provider value={{ theme, icon, toggleTheme }}>
    <NavigationContext.Provider value={{ tab, changeTab }}>
    <ApplicationProvider {...eva} theme={{...eva[theme], ...defaultTheme}}>
    <NavigationContainer theme={navigationTheme}>
      <Navigator
        screenOptions={{
          headerShown: false
        }}
            options={{
              animationEnabled: false,
            }}>
            <Screen
            name="Login"
            component={Login}
            />
            <Screen
            name="Register"
            component={Register}
            />
            <Screen
            name="Home"
            component={Home}
            />
            <Screen
            name="Expenses"
            component={Expenses}
            options={({route}) => ({title: route.params.title})}
            />
            <Screen
            name="Members"
            component={Members}
            options={({route}) => ({title: route.params.title})}
            />
            <Screen 
            name="ExpenseDetails" 
            component={ExpenseDetails} 
            options={({ route }) => ({title: route.params.title})}
            />
            <Screen
            name="AddExpense"
            component={AddExpense}
            />
            <Screen
            name="AddGroup"
            component={AddGroup}
            />
    </Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    </NavigationContext.Provider>
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
