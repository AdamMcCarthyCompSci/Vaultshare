import React, {useEffect} from 'react';
import ExpenseItem from "./ExpenseItem";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import { ThemeContext } from '../ThemeContext';

const Stack = createNativeStackNavigator();

export default function GroupPage(props) {

  const PlusCircleOutlineIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
  );

  const themeContext = React.useContext(ThemeContext);

    const [expenses, setExpenses] = React.useState([{}]);
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
                group_id: props.route.params.group.group_id,
              }),
       })
       const content = await response.json()
       setExpenses(content.result[0]);
       setGroupMembers(content.result[1]);
       return
       } catch (error) {
         console.error(error);
       }
       })()
    }, []
   );

  return (
    <Layout style={{flex: 1, flexDirection: 'column'}}>
      
      <Layout style={{flex: 2}}>
      <Button onPress={() => {
                themeContext.toggleTheme()
      }}
      accessoryLeft={themeContext.icon}></Button>
      </Layout>

      <Layout style={{flex: 2}}>
      <Button onPress={() => {
                props.navigation.navigate('AddExpense', {groupMembers: groupMembers, group: props.route.params.group})
      }}
      accessoryLeft={PlusCircleOutlineIcon}>
      Add Expense
    </Button>
      </Layout>

      <Layout style={{flex: 10}}>
      <List
      data={
        expenses.map((expense, index) => (
              {key: index.toString(),
              expense: expense}
        ))}
        ItemSeparatorComponent={Divider}
      renderItem={({item, index}) => <ExpenseItem style={styles.item} key={index} index={index} expense={item} navigation={props.navigation}/>}
      />
      </Layout>
      
      <Layout style={{flex: 1}}/>

    </Layout>
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
