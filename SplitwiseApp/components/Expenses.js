import React, {useEffect} from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, List, ListItem, TopNavigation, Divider, TopNavigationAction } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';
import BottomNavigationTabs from './Home';
import TopNavigationSet from './TopNavigationSet';

const Stack = createNativeStackNavigator();

export default function Expenses(props) {

  const { group, member } = props.route.params;

  const PlusCircleOutlineIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
  );

    const [expenses, setExpenses] = React.useState([{}]);
    const [splits, setSplits] = React.useState([{}]);
    const [groupMembers, setGroupMembers] = React.useState([{}]);

   useEffect(() => {
    (async () => {
       try {
         // Change to /split/group if not localhost
         const response = await fetch(process.env.BACKEND_URL + '/split/group', {
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
       setExpenses(content.result[0]);
       setGroupMembers(content.result[1]);
       setSplits(content.result[2])
       console.log(content.result[2])
       return
       } catch (error) {
         console.error(error);
       }
       })()
    }, []
   );

  return (
    <>
          <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationSet back={true} navigation={props.navigation}/>
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      <Layout style={{flex: 1}}>
      <List
      data={
        splits.map((split, index) => (
              {key: index.toString(),
              split: split}
        ))}
        ItemSeparatorComponent={Divider}
      renderItem={({item, index}) => <ExpenseItem style={styles.item} key={index} index={index} split={item} navigation={props.navigation}/>}
      />
      </Layout>
    </Layout>
        </SafeAreaView>
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
