import React from 'react';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Layout, Text, Icon, Input, Select, IndexPath, SelectItem, Card, Divider, Autocomplete, AutocompleteItem, CheckBox } from '@ui-kitten/components';
import { Linking } from 'react-native';
import Header from './Header';

const Stack = createNativeStackNavigator();

export default function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [remember, setRemember] = React.useState(false);


    const loginUser = async () => {
        try {
            // If local use 'login', if not local and using ngrok to open port 3000 for backend, then use '/login' and change env variable to ngrok URL.
          const response = await fetch(process.env.BACKEND_URL + '/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password 
            }),
            credentials: 'include'
        })
        const content = await response.json()
        if (content.result[0]) {
            props.navigation.replace('Home');
        }
        else {
            console.log(content.result[0])
        }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
        <Header/>
    <Layout style={{flex: 1, flexDirection: 'column'}}>
        <Layout style={{flex: 10}}>
                <Layout style={{flex: 1, flexDirection: 'column'}}>
                    <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                        { /* lowercase and trim spaces for email and password. Also do this in registration*/}
                        <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={value => setEmail(value)}
                        />
                    </Layout>
                    <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                        <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={value => setPassword(value)}
                        />
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <CheckBox
                        status='primary'
                        checked={remember}
                        onChange={value => setRemember(value)}>
                            Remember me?
                        </CheckBox>
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                        <Button
                        onPress={() => {
                            loginUser()
                        }}>
                            Login
                        </Button>
                    </Layout>
                    <Layout style={{flex: 2, justifyContent: "center"}} level='1'>
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>Forgot Password?</Text>
                    </Layout>
                </Layout>
        </Layout>
        <Layout style={{flex: 5}} level='4'/>
        <Layout style={{flex: 3, justifyContent: "center"}} level='1'>
                <Text>Don't have an account yet?</Text>
                <Button
                onPress={() => {
                    props.navigation.replace('Register')
                }}
                >Register</Button>
        </Layout>
    </Layout>
    </>
    )
}