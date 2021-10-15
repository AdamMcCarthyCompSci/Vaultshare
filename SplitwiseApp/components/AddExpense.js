import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function AddExpense({ navigation, route }) {
    const { groupMembers, group } = route.params;

    const [expenseTitle, setExpenseTitle] = React.useState('');
    const [expenseValue, setExpenseValue] = React.useState('');

    const memberNames = groupMembers.map(groupMember => groupMember.username)

    const [paying, setPaying] = React.useState(new IndexPath(0));
    const [splitting, setSplitting] = React.useState([

    ])
    const displayPaying = memberNames[paying.row];
    const displaySplitting = memberNames[splitting.row]

    const ShoppingBagIcon = (props) => (
        <Icon {...props} name='shopping-bag-outline'/>
      );

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar-outline'/>
    );

    const GroupIcon = (props) => (
        <Icon {...props} name='people-outline'/>
    );

    const NotesIcon = (props) => (
        <Icon {...props} name='clipboard-outline'/>
    );

    const CameraIcon = (props) => (
        <Icon {...props} name='camera-outline'/>
    );

    const CloseIcon = (props) => (
        <Icon {...props} name='close-outline'/>
    );

    const PaymentIcon = (props) => (
        <Icon {...props} name='credit-card-outline'/>
    );

    return (
        <Layout style={{flex: 1, flexDirection: 'column'}}>

            <Layout style={{flex: 1, justifyContent: 'center'}} level='3'>
                <Button onPress={() => {console.log(memberNames)}}accessoryLeft={GroupIcon}>{group.group_name}</Button>
            </Layout>

            <Layout style={{flex: 1}} level='4'>
            <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                <Layout style={{flex: 1}}>
                    <Button accessoryLeft={ShoppingBagIcon}/>
                </Layout>
                <Layout style={{flex:6}}>
                    <Input
                    placeholder='Expense Title'
                    value={expenseTitle}
                    onChangeText={value => setExpenseTitle(value)}
                    />
                </Layout>
            </Layout>
            </Layout>

            <Layout style={{flex: 1}} level='4'>
            <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                <Layout style={{flex: 1}}>
                    <Button accessoryLeft={PaymentIcon}/>
                </Layout>
                <Layout style={{flex:6}}>
                    <Input
                    placeholder='Expense Value'
                    value={expenseValue.toString()}
                    onChangeText={(value) => {
                        setExpenseValue(value.toString())
                    }}
                    keyboardType="numeric"
                    />
                </Layout>
            </Layout>
            </Layout>

            <Layout style={{flex: 2}} level='4'>
            <Card status='primary' style={{height: "100%"}}>
                <Text>Who's Paying?</Text>
                <Select
                    multiSelect={false}
                    selectedIndex={paying}
                    value={displayPaying}
                    onSelect={index => setPaying(index)}>
                        {memberNames.map((memberName, index) => <SelectItem key={index} title={memberName}/>)}
                </Select>  
                </Card>          
            </Layout>

            <Layout style={{flex: 2}} level='4'>
            <Card status='primary' style={{height: "100%"}}>
                <Text>Who's Splitting?</Text>
                <Select
                    multiSelect={true}
                    selectedIndex={splitting}
                    value={displaySplitting}
                    onSelect={index => setSplitting(index)}>
                        {memberNames.map((memberName, index) => <SelectItem key={index} title={memberName}/>)}
                </Select>   
                </Card>          
            </Layout>

            <Layout style={{flex: 1, justifyContent: 'center'}} level='3'>
                <Button onPress={() => {console.log(memberNames)}}accessoryLeft={GroupIcon}>{group.group_name}</Button>
            </Layout>

            <Layout style={{flex: 1}} level='4'>
                <Layout style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} level='2'>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                        <Button accessoryLeft={CalendarIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                        <Button accessoryLeft={NotesIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                    <Layout style={{flex: 10}}>
                    <Button accessoryLeft={CameraIcon}/>
                    </Layout>
                    <Layout style={{flex: 1}}/>
                </Layout>
            </Layout>

        </Layout>
    )
}