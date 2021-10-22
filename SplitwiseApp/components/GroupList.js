import React, {useEffect} from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function GroupList(props) {

  const themeContext = React.useContext(ThemeContext);

  // const [groups, setGroups] = React.useState([{title: "Oldenburger Str. 9", members: [{name: "Ross"}, {name: "Adam"}, {name: "Tom"}, {name: "Darragh"}, {name: "Ronan"}, {name: "David"}, {name: "Joe"}]}])
  const [groups, setGroups] = React.useState([{}])

  const PlusCircleOutlineIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
  );

  const PeopleOutlineIcon = (props) => (
    <Icon {...props} name='people-outline'/>
  );

  useEffect(() => {
    (async () => {
       try {
         // Change to /split/groups if not localhost
         const response = await fetch(process.env.BACKEND_URL + '/split/groups', {
           method: 'GET',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
       })
       const content = await response.json()
       console.log(content.result)
       setGroups(content.result)
       return
       } catch (error) {
         console.error(error);
       }
       })()
   }, []);

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
            <Button onPress={() => {
        props.navigation.navigate('Friends')
      }}
      accessoryLeft={PeopleOutlineIcon}>
    </Button>
      <FlatList
      data={
        groups.map((group, index) => (
              {key: index.toString(),
              group: group}
        ))}
      renderItem={({item, index}) =>                     
        <Button
        key={index}
        index={index}
        onPress={() => {
        props.navigation.navigate('GroupPage', {group: item.group})
        }}>
          {item.group.group_name}
        </Button>}
      />

      <Button onPress={() => {
        props.navigation.navigate('AddGroup')
      }}
      accessoryLeft={PlusCircleOutlineIcon}>
    </Button>
    </Layout>
  );
}
