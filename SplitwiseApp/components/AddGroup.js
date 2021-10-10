import React, {useEffect} from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function AddGroup(props) {

    const [groups, setGroups] = React.useState({group_name: ""})

     useEffect(() => {
     (async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + 'split/groups', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const content = await response.json()
        console.log(content.result[0])
        setGroups(content.result[0])
        return
        } catch (error) {
          console.error(error);
        }
        })()
    }, []);

    return (
        <Text>{groups.group_name}</Text>
    )
}
