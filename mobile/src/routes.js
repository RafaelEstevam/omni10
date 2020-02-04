import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { MaterialIcons } from '@expo/vector-icons';

import SearchDevs from './pages/SearchDevs';
import Profile from './pages/Profile';

class NavigationDrawerStructure extends React.Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <MaterialIcons style={styles.btnNavigation} name="menu" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        );
    }
}

const FirstActivity_StackNavigator = createStackNavigator({
    First: {
        screen: SearchDevs,
        navigationOptions: ({ navigation }) => ({
            title: 'Busca de DEVs',
            headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#FF9800',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTintColor: '#000',
        }),
    },
});
   
const Screen2_StackNavigator = createStackNavigator({
    Second: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: 'Demo Screen 2',
            headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
            backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
        }),
    },
});

const DrawerNavigatorExample = createDrawerNavigator({
    Screen1: {
        screen: FirstActivity_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Busca de DEVs',
        },
    },
    Screen2: {
        screen: Screen2_StackNavigator,
        navigationOptions: {
            drawerLabel: 'Demo Screen 2',
        },
    },
});

const styles = StyleSheet.create({
    btnNavigation: {
        padding: 15,
    }
})
export default createAppContainer(DrawerNavigatorExample);