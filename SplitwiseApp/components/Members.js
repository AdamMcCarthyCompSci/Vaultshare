import React, {useEffect} from 'react';
import ExpenseItem from "./SplitItem";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, List, ListItem, Drawer, DrawerGroup, DrawerItem } from '@ui-kitten/components';
import TopNavigationSet from './TopNavigationSet';

const Stack = createNativeStackNavigator();

const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );

  const ArchiveIcon = (props) => (
    <Icon {...props} name='archive-outline'/>
  );

  const PersonRemoveIcon = (props) => (
    <Icon {...props} name='person-remove-outline'/>
  );

  const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

export default function Expenses(props) {
    
    const [groupMembers, setGroupMembers] = React.useState([{}]);
    const [membersDrawer, setMembersDrawer] = React.useState(null);

    const { group, member } = props.route.params;

    useEffect(() => {
     (async () => {
        try {
          // Change to /split/group if not localhost
          const response = await fetch(process.env.BACKEND_URL + '/split/groupMembers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                 group_id: group.group_id,
                 member_id: member.member_id
               }),
        })
        const content = await response.json()
        setGroupMembers(content.result);

        return
        } catch (error) {
          console.error(error);
        }
        })()
     }, []
    );
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavigationSet back={true} navigation={props.navigation}/>

        <Drawer
      selectedIndex={membersDrawer}
      onSelect={index => setMembersDrawer(index)}>
        {groupMembers.map((member, index) => (
              <DrawerGroup key={index} title={`${member.username} #${member.tag}`} accessoryLeft={PersonIcon}>
              <DrawerItem 
              title='Splits' 
              accessoryLeft={ArchiveIcon}
              accessoryRight={ForwardIcon}
              onPress={() => {
                props.navigation.navigate('Splits', {group: group, member: member})
              }}/>
              <DrawerItem 
              title='Remove Member' 
              accessoryLeft={PersonRemoveIcon}
              accessoryRight={ForwardIcon}
              onPress={() => {
                console.log("REMOVE MEMBER");
              }}/>
            </DrawerGroup>
      ))}
    </Drawer>
      </SafeAreaView>
    )
}