import React from 'react';
import ExpenseDetails from "./ExpenseDetails";
import { StyleSheet, View, FlatList, TextPropTypes } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, ListItem, Icon, Text } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function ExpenseItem(props) {
  const { expense } = props.expense;

  const renderItemAccessory = (props) => (
    <Text>{expense.expense_value}</Text>
  );
  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

    return (
        <Layout style={{flex: 1, flexDirection: 'row'}}>
            {/* <Layout style={{ flex: 1 }}/> */}
            <Layout style={{ flex: 10}}>
              <ListItem
                  title={expense.expense_title}
                  description={`${expense.date_paid} ${expense.expense_value} ${expense.member_id}`}
                  accessoryLeft={renderItemIcon}
                  accessoryRight={renderItemAccessory}
                />
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