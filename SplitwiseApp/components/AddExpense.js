import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem, SelectGroup } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function AddExpense({ navigation, route }) {
    const { groupMembers, group } = route.params;

    const [expenseTitle, setExpenseTitle] = React.useState('');
    const [expenseValue, setExpenseValue] = React.useState('');

    const memberNames = groupMembers.map(groupMember => groupMember.username + ' #' + groupMember.tag)
    const groupedMemberNames = {
        'Everyone': groupMembers.map(groupMember => groupMember.username + ' #' + groupMember.tag)
    }

    const [paying, setPaying] = React.useState(new IndexPath(0));
    const [splitting, setSplitting] = React.useState([

    ])
    const displayPaying = memberNames[paying.row];
    const displaySplitting = splitting.map(split => {
        const groupTitle = Object.keys(groupedMemberNames)[split.section];
        return groupedMemberNames[groupTitle][split.row];
      });

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

    const PersonIcon = (props) => (
        <Icon {...props} name='person-outline'/>
    );

    const CheckmarkIcon = (props) => (
        <Icon {...props} name='checkmark-outline'/>
    );

    const confirmExpense = () => {
        (async () => {
            try {
              // Change to /split/addExpense if not localhost
              const response = await fetch(process.env.BACKEND_URL + '/split/addExpense', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                     group: group,
                     members: groupMembers,
                     title: expenseTitle,
                     value: expenseValue,
                     paying: displayPaying,
                     splitting: displaySplitting
                   }),
            })
            const content = await response.json()
            console.log("RESULT",content)
            return
            } catch (error) {
              console.error(error);
            }
            })()
    }

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
                    {/* Check if valid value (1 decimal max)*/}
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
                        {memberNames.map((memberName, index) => <SelectItem key={index} accessoryRight={PersonIcon} title={memberName}/>)}
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
                        {Object.keys(groupedMemberNames).map((title, index) => 
                            <SelectGroup key={index} title={title}>
                                {groupedMemberNames[title].map((memberName, index) => 
                                    <SelectItem key={index} accessoryRight={PersonIcon} title={memberName}/>)}
                            </SelectGroup>
                        )}
                </Select>   
                </Card>          
            </Layout>

            <Layout style={{flex: 1, justifyContent: 'center'}} level='3'>
                <Button onPress={() => {confirmExpense()}}accessoryLeft={CheckmarkIcon}>Confirm</Button>
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