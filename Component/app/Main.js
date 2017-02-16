import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    Navigator,
    Platform
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import Search from '../pages/Search'
var Main = React.createClass({
    getInitialState(){
        return{
            selectedTab:'Search'
        }

    },
    render(){
        let tabBarHeight = 0;
        return(
            <TabNavigator
                tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
                sceneStyle={{ paddingBottom: tabBarHeight }}
            >
                <TabNavigator.Item
                    title="首页"
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_homepage'}} style={styles.iconStyle}/>} // 图标
                    renderSelectedIcon={() =><Image source={{uri: 'icon_tabbar_homepage_selected'}} style={styles.iconStyle}/>}
                    onPress={()=>{this.setState({selectedTab:'Search'})}}
                    selected={this.state.selectedTab === 'Search'}
                >
                    <Navigator
                        initialRoute={{name:'首页',component:Search}}
                        configureScene={()=>{
                             return Navigator.SceneConfigs.PushFromRight;
                        }}
                        renderScene={(route,navigator)=>{
                           let Component = route.component;
                           return <Component {...route.passProps} navigator={navigator}/>;
                        }}
                    />

                </TabNavigator.Item>
            </TabNavigator>
        )
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    iconStyle:{
        height:30,
        width:30

    }
});
module.exports = Main;