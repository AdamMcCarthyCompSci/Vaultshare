import React from 'react';
import ExpenseItem from "./SplitItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function Settings(props) {
    return (
        <>
        <Text>Activity</Text>
        {/* <BottomNavigationTabs navigation={props.navigation}/> */}
        </>
    )
}