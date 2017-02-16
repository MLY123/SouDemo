
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Platform,
    Linking,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import Search from '../pages/Search'
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

import CustomView from '../pages/CustomView'

var  URL = 'http://192.168.6.12:8080/joywing/service/rest/mock/customerID?id=';
var TestUrl = 'http://xuan.news.cn/cloudnews/wyxh/index_vThirdBanner.html?t=92';
var CustomID;
// 一些常量设置
var cols = 2;
var cellWH = 0.48*screenWidth;
var vMargin = (screenWidth - cellWH * cols) / (cols + 1);
var hMargin = 0.06*screenWidth;

class SearchDetail extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.JSonData)
        };

    }
    render() {
        return (
            <View style={styles.container}>

                {this.CreateNavBar()}

                <ListView
                    dataSource={this.state.dataSource}  // 数据源
                    renderRow={this.renderRow}
                />

            </View>
        );
    }

    CreateNavBar(){
        return(
            <View style={styles.navBarStyle}>
                <View style={styles.NarLeftStyle}>
                    <TouchableOpacity onPress={()=>this.BackView()}>
                        <Image source={require('../Img/back.png')}/>
                    </TouchableOpacity>

                </View>


                <Text style={{paddingTop:Platform.OS == 'ios'?15:0,color:'white',fontSize:20}}>
                    搜索详情
                </Text>


            </View>
        )
    }
    BackView(){
        this.props.navigator.pop()
    }
    // 返回具体的cell
    renderRow(rowData){
        CustomID = rowData.CustomNum;
        console.log('海关编号:'+CustomID);
        console.log(rowData.orderID);
        return(
        <View style={styles.cellViewStyle}>
            {/*订单信息*/}
            <View style={styles.HeahderView}>
                <Image source={require('../Img/orderInfo.png')}/>
                <Text style={styles.HeadTitleStyle}>订单信息</Text>
            </View>
               <View style={styles.middleTextStyle}>
                   <View style={styles.middleText}>
                       <Text style={styles.topTitleBold}>订单号:</Text>
                   <Text style={styles.topTitle}>{rowData.orderID}</Text>
                   </View>
                   <View style={styles.middleText}>

                       <Text style={styles.topTitleBold}>状        态:</Text>
                       <Text style={styles.topTitle}>{rowData.State}</Text>
                   </View>

                   <View style={styles.middleText}>
                       <Text style={styles.topTitleBold}>类    型:</Text>
                       <Text style={styles.topTitle}>{rowData.Type}</Text>
                   </View>

                   <View style={styles.middleText}>
                       <Text style={styles.topTitleBold}>接单区域:</Text>
                       <Text style={styles.topTitle}>{rowData.SingleZone}</Text>
                   </View>
                   <View style={styles.middleText}>
                       <Text style={styles.topTitleBold}>客    服:</Text>
                       <Text style={styles.topTitle}>{rowData.Server}</Text>
                   </View>

                   <View style={styles.middleText}>
                       <Text style={styles.topTitleBold}>创建时间:</Text>
                   <Text style={styles.topTitle}>{rowData.CreateTime}</Text>
                   </View>
               </View>
            {/*客户信息*/}
            <View style={styles.HeahderView}>
                <Image source={require('../Img/costomerInfo.png')}/>
                <Text style={styles.HeadTitleStyle}>客户信息</Text>
            </View>
                <View style={styles.middleTextStyle}>

                    <View style={styles.middleText}>
                        <Text style={styles.topTitleBold}>收款单位:</Text>
                        <Text style={styles.topTitle}>{rowData.Payee}</Text>
                    </View>

                    <View style={styles.middleText}>
                        <Text style={styles.topTitleBold}>委托单位:</Text>
                    <Text style={styles.topTitle}>{rowData.Client}</Text>
                    </View>

                    <View style={styles.middleText}>
                        <Text style={styles.topTitleBold}>货        主:</Text>
                    <Text style={styles.topTitle}>{rowData.Consignor}</Text>
                    </View>
                    <View style={styles.middleText}>
                        <Text style={styles.topTitleBold}>经营单位:</Text>
                    <Text style={styles.topTitle}>{rowData.Operation}</Text>
                    </View>
                </View>
            {/*货物信息*/}
            <View style={styles.HeahderView}>
                <Image source={require('../Img/goodsInfo.png')}/>
                <Text style={styles.HeadTitleStyle}>货物信息</Text>
            </View>
                <View style={styles.middleTextStyle}>

                <View style={styles.middleText}>
                    <Text style={styles.topTitleBold}>货  品  名:</Text>
                    <Text style={styles.topTitle}>{rowData.GoodName}</Text>
                </View>

                <View style={styles.middleText}>
                    <Text style={styles.topTitleBold}>件            数:</Text>
                    <Text style={styles.topTitle}>{rowData.GoodNum+'件'}</Text>
                </View>
                <View style={styles.middleText}>
                    <Text style={styles.topTitleBold}>货物类型:</Text>
                    <Text style={styles.topTitle}>{rowData.GoodType}</Text>
                </View>
                <View style={styles.middleText}>

                    <Text style={styles.topTitleBold}>重            量:</Text>
                    <Text style={styles.topTitle}>{rowData.Weight+'kg'}</Text>
                </View>
                <View style={styles.middleText}>
                    <Text style={styles.topTitleBold}>体        积:</Text>
                    <Text style={styles.topTitle}>{rowData.Volume}</Text>
                </View>
                <View style={styles.middleText}>

                    <Text style={styles.topTitleBold}>集装箱尺寸:</Text>
                    <Text style={styles.topTitle}>{rowData.Continer}</Text>
                </View>
                <View style={{width:0.7 *screenWidth,
        height:0.072*screenWidth,
        marginLeft:vMargin,
        flexDirection:'row',
        // 居中
        alignItems:'center'}}>
                    <Text style={styles.topTitleBold}>客户单证号:</Text>
                    <Text style={styles.topTitle}>{rowData.CustomDocNum}</Text>

                </View>
            </View>
            {/*资料信息*/}
            <View style={styles.HeahderView}>
                <Image source={require('../Img/documentInfo.png')}/>
                <Text style={styles.HeadTitleStyle}>资料信息</Text>
            </View>

                <View style={styles.middleTextStyle}>
                    <View style={styles.showNumType}>
                        <Image source={require('../Img/quote.png')}/>
                        <Text style={styles.topTitleBold}>报  价  单:</Text>
                        <Text style={styles.topTitle}>{rowData.Quote}</Text>
                    </View>

                    <View style={styles.showNumType}>
                    <Image source={require('../Img/bill.png')}/>
                     <Text style={styles.topTitleBold}>提  单  号:</Text>
                    <Text style={styles.topTitle}>{rowData.Bill}</Text>
                    </View>
                    <View style={styles.showNumType}>

                        <Image source={require('../Img/customNum.png')}/>
                        <Text style={{paddingLeft:0.012*screenWidth,
        paddingRight:0.012*screenWidth,
        fontSize: 0.04*screenWidth,fontWeight:'bold'}}>海关编号:</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress = {()=>{this.pushSearchDetail()}}>
                    <Text style={{fontSize:0.04*screenWidth,color:'blue',
        }}>{rowData.CustomNum}</Text>
                    </TouchableOpacity>
                        <Text style={{fontSize:0.04*screenWidth,paddingLeft:0.012*screenWidth}}>({rowData.SystomPerson})</Text>
                    </View>
                </View>


        </View>

        );
    }

    pushSearchDetail(){

        fetch(URL+CustomID)
            .then((response)=>response.json())
            .then((responseData)=>{

            var CustomData = JSON.parse(responseData.data);


                this.props.navigator.push({
                    component:CustomView,
                    passProps:{CustomData}
                })
            })
            .catch((error)=>{
            console.log(error);
                alert(error.message);
            })

    }
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 0.17*screenWidth : 0.11*screenWidth,
        backgroundColor:'rgba(255,96,0,1.0)',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',

        // 设置主轴的对齐方式
        justifyContent:'center',

    },
    NarLeftStyle:{
        position:'absolute',
        left:0.024*screenWidth,
        alignItems:'center',
        marginTop:Platform.OS == 'ios'?0.06*screenWidth:0.012*screenWidth,
    },
    cellViewStyle:{
        width:screenWidth,

        backgroundColor:'black',


    },
    topTitleBold:{
        paddingLeft:0.012*screenWidth,
        paddingRight:0.012*screenWidth,
        fontSize: 0.04*screenWidth,
        fontWeight:'bold'
    },
    topTitle:{
        paddingLeft:0.012*screenWidth,
        paddingRight:0.012*screenWidth,
        fontSize: 0.04*screenWidth,

    },
    middleTextStyle:{
        width:screenWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',


    },
    middleText:{
        width:cellWH,
        height:0.072*screenWidth,
        marginLeft:vMargin,
        flexDirection:'row',

        // 居中
        alignItems:'center'
    },
    showNumTypeStyle:{
        width:screenWidth,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:2,
        flexWrap:'wrap',


    },
    showNumType:{
        flexDirection:'row',

        marginRight:0.096*screenWidth,
        marginLeft:0.048*screenWidth,
        marginTop:0.012*screenWidth,

    },
    HeahderView:{
        width:screenWidth,
        height:0.1*screenWidth,
        backgroundColor:'#f5fcff',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:1,
        paddingLeft:0.01*screenWidth
    },
    HeadTitleStyle:{
        paddingLeft:0.012*screenWidth,

        fontSize: 0.05*screenWidth,
        fontWeight: 'bold',
        
    }
});

module.exports = SearchDetail;
