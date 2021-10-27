import React, { useEffect } from 'react';
import ExpenseDetails from "./ExpenseDetails";
import { StyleSheet, View, FlatList, TextPropTypes } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, ListItem, Icon, Text, Card } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function ExpenseItem(props) {
  const { expense } = props.expense;
  const { splits } = props;

//   const [splits, setSplits] = React.useState([{}]);

//   useEffect(() => {
//     (async () => {
//        try {
//          // Change to /split/group if not localhost
//          const response = await fetch(process.env.BACKEND_URL + '/split/expenseSplits', {
//            method: 'POST',
//            headers: {
//                Accept: 'application/json',
//                'Content-Type': 'application/json'
//            },
//                body: JSON.stringify({
//                 expense_id: expense.expense_id,
//               }),
//        })
//        const content = await response.json()
//     //    setSplits(content.result)
//        console.log(content.result);
//        return
//        } catch (error) {
//          console.error(error);
//        }
//        })()
//     }, []
//    );

    return (
        <Layout style={{flex: 1, flexDirection: 'row'}}>
            {/* <Layout style={{ flex: 1 }}/> */}
            <Layout style={{ flex: 10}}>
                <Card status='primary' style={{height: "100%"}}>
                <Button onPress={() => console.log("YOOO!", splits.map(split => split.expense_id))}>{expense.expense_title} {expense.expense_id}</Button>
                {splits.filter(split => split.expense_id === expense.expense_id).map((split, index) => (
                    <Text>{split.split_value}</Text>
                ))}
                </Card>  
            </Layout>
            {/* <Layout style={{ flex: 1}}/> */}
        </Layout>
    )
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