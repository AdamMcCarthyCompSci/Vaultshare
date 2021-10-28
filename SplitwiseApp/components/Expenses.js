import React, {useEffect} from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, List, ListItem, TopNavigation, Divider, TopNavigationAction, Drawer, DrawerGroup, DrawerItem, ButtonGroup, Card } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';
import BottomNavigationTabs from './Home';
import TopNavigationSet from './TopNavigationSet';

const Stack = createNativeStackNavigator();

export default function Expenses(props) {

  const { group, member } = props.route.params;

  const PlusCircleOutlineIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
  );

  const CreditCardIcon = (props) => (
    <Icon {...props} name='credit-card-outline'/>
  );

  const EditIcon = (props) => (
    <Icon {...props} name='edit-outline'/>
  );

  const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );
    const [splits, setSplits] = React.useState([{}]);
    const [expenses, setExpenses] = React.useState([{}]);
    const [groupMembers, setGroupMembers] = React.useState([{}]);
    const [groupsDrawer, setGroupsDrawer] = React.useState(null);

   useEffect(() => {
    (async () => {
       try {
         // Change to /split/group if not localhost
         const response = await fetch(process.env.BACKEND_URL + '/split/expenses', {
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
       console.log(content.result[0])
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
      <Card status='primary' style={{height: "100%"}}>
      <Button
      appearance='outline' 
      accessoryLeft={CreditCardIcon}>
      Settle up
    </Button>
    </Card>
        </Layout>
      <Layout style={{flex: 3}}>
      <Card status='primary' style={{height: "100%"}}>
      <List
      data={
        expenses.map((expense, index) => (
              {key: index.toString(),
              expense: expense}
        ))}
        ItemSeparatorComponent={Divider}
      renderItem={({item, index}) => <ExpenseItem style={styles.item} key={index} index={index} expense={item} splits={splits} navigation={props.navigation}/>}
      extraData={splits}
      />
      </Card>
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
