import React from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, Input } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function Friends(props) {

  const [username, setUsername] = React.useState('');
  const [tag, setTag] = React.useState('');

  const PersonAddOutlineIcon = (props) => (
      <Icon {...props} name='person-add-outline'/>
  );

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      <Layout style={{flex:1}}>
        <Layout style={{flex: 1, flexDirection: 'row'}}>
        <Layout style={{flex:3}}>
            <Input
            placeholder='Username'
            value={username}
            onChangeText={value => setUsername(value)}
            />
          </Layout>
          <Layout style={{flex:1}}>
            <Input
            placeholder='Tag'
            value={tag}
            onChangeText={value => setTag(value)}
            />
          </Layout>
        </Layout>
      </Layout>
      <Layout style={{flex:1}}>
        <Button onPress={() => {
            props.navigation.navigate('AddFriend')
          }}
          accessoryLeft={PersonAddOutlineIcon}>
        </Button>
      </Layout>
    </Layout>
    )
}
