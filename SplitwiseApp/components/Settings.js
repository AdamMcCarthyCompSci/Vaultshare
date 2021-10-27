import React from 'react';
import ExpenseItem from "./SplitItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function Settings(props) {

    const themeContext = React.useContext(ThemeContext);
    return (
        <>
            <Layout style={{flex: 1, flexDirection: 'column'}}>
        <Text>Settings</Text>
        <Layout style={{flex: 2}}>
      <Button onPress={() => {
                themeContext.toggleTheme()
      }}
      accessoryLeft={themeContext.icon}></Button>
      </Layout>
      </Layout>
        </>
    )
}
