
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    NavigatorIOS,
    TouchableOpacity,
    Platform,
    Alert,
    ListView
} from 'react-native';

import SearchDetail from '../pages/SearchDetail';
var  URL = 'http://192.168.6.12:8080/joywing/service/rest/mock/orders?orderID=';
var TestUrl = 'http://xuan.news.cn/cloudnews/wyxh/index_vThirdBanner.html?t=92';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};


    }

    render() {
        return (
            <View style={styles.container}>
                {this.CreateNavBar()}
                <View style={styles.searchRow}>


                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        placeholder="请输入查询的订单..."
                        onChangeText={(text)=>this.setState({orderID:text})}
                        style={styles.searchTextInput}
                    />
                    <TouchableOpacity onPress={()=>{this.SearchResult()}}>
                        <Image style={styles.logView}
                               source={require('../Img/Icon_search.png')}
                        />
                    </TouchableOpacity>
                </View>

            </View>


        );
    }

    CreateNavBar() {
        return (
            <View style={styles.navBarStyle}>
                <Text style={{paddingTop:15,color:'white',fontSize:20}}>
                    订单查询
                </Text>
            </View>
        )
    }


    SearchResult() {
         // fetch(TestUrl)
         console.log(URL + this.state.orderID);
         fetch(URL+this.state.orderID)
            .then((response)=>response.json())
            .then((responseData)=>{
                var JSonData = JSON.parse(responseData.data);


                this.props.navigator.push({
                    component:SearchDetail,
                    
                    passProps:{JSonData}
                })
            })
            .catch((error)=>{
                console.log(error);
             if(!this.state.orderID){
                 alert('请输入订单号');
             }else {
                 alert('请输入正确的订单号');
             }


            })

    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    searchRow: {
        flexDirection:'row',
        backgroundColor: '#eeeeee',
        paddingLeft: 0.024*screenWidth,
        paddingRight: 0.024*screenWidth,
        paddingBottom: 0.024*screenWidth,
        paddingTop:0.024*screenWidth
    },
    searchTextInput: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 0.0072*screenWidth,
        borderWidth: 0.0024*screenWidth,
        width:0.8 *screenWidth,
        height: 0.096*screenWidth,
        paddingLeft: 0.192*screenWidth,
    },
    logView:{

        width:0.096*screenWidth,
        height:0.096*screenWidth,

       paddingRight:0.024*screenWidth,
       marginLeft:0.024*screenWidth

    },
    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 0.17*screenWidth : 0.11*screenWidth,
        backgroundColor:'rgba(255,96,0,1.0)',

        // 设置主轴的方向
         flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',

        // 设置主轴的对齐方式
        justifyContent:'center'
    },

});

module.exports = Search;
