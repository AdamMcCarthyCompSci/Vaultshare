import React, {useEffect} from 'react';
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
  const [friends, setFriends] = React.useState([{}]);
  const [requests, setRequests] = React.useState([{}]);

  const PersonAddOutlineIcon = (props) => (
      <Icon {...props} name='person-add-outline'/>
  );

  useEffect(() => {
    (async () => {
       try {
         // Change to /split/groups if not localhost
         const response = await fetch(process.env.BACKEND_URL + '/split/friends', {
           method: 'GET',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
       })
       const content = await response.json()
       console.log(content.result);
       setFriends(content.result[0]);
       setRequests(content.result[1]);
       return
       } catch (error) {
         console.error(error);
       }
       })()
   }, []);

  const addFriend = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + '/split/addFriend', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            tag: tag
        }),
        credentials: 'include'
    })
    const content = await response.json()
    console.log(content.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      <Layout style={{flex:1}}>
      <Text>Add Friend</Text>
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
            addFriend()
          }}
          accessoryLeft={PersonAddOutlineIcon}>
        </Button>
      </Layout>
      <Layout style={{flex:1}}>
        <Text>Friends</Text>
      <FlatList
      data={
        friends.map((friend, index) => (
              {key: index.toString(),
              friend: friend}
        ))}
      renderItem={({item, index}) => {
          return (
            <Button
            key={index}
            index={index}
            onPress={() => {
            console.log(friends)
            }}>
              {item.friend.username + " #" + (item.friend.tag && item.friend.tag.toString())}
            </Button>
          )
      }}
      />
      <Text>Pending Friend Requests</Text>
      <FlatList
      data={
        requests.map((friend, index) => (
              {key: index.toString(),
              friend: friend}
        ))}
      renderItem={({item, index}) => {
          return (
            <Button
            key={index}
            index={index}
            onPress={() => {
            console.log(friends)
            }}>
              {item.friend.username + " #" + (item.friend.tag && item.friend.tag.toString())}
            </Button>
          )
      }}
      />
    </Layout>

    </Layout>
    )
}
