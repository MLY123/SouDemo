import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ListView,
    Image
} from 'react-native';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
// 一些常量设置
var cols = 2;
var cellWH = 0.48*screenWidth;
var vMargin = (screenWidth - cellWH * cols) / (cols + 1);
var hMargin = 0.06*screenWidth;

export default class SouDemo extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.CustomData)
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

                {/*中间*/}
                <Text style={{paddingTop:Platform.OS == 'ios'?0.036*screenWidth:0,color:'white',fontSize:0.048*screenWidth}}>
                    海关单详情
                </Text>


            </View>
        )
    }
    BackView(){
        this.props.navigator.pop()
    }
    renderRow(rowData){
        console.log(rowData.Logo);
      return(
          <View style={styles.CustomCellStyle}>
              {/*海关单信息*/}
              <View style={styles.HeahderView}>
                  <Image source={require('../Img/customNumInfo.png')}/>
                  <Text style={styles.HeadTitleStyle}>海关单信息</Text>
              </View>
                 <View style={styles.middleTextStyle}>
                  <View style={{ width:screenWidth,
        height:0.072*screenWidth,
        marginLeft:vMargin,
        flexDirection:'row',
        alignItems:'center'}}>
                      <Text style={styles.topTitleBold}>海关编号:</Text>
                      <Text style={styles.topTitle}>{rowData.customID}</Text>
                  </View>

                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>标        志:</Text>
                      <Text style={styles.topTitle}>{rowData.Logo}</Text>
                  </View>
                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>备  案  号:</Text>
                      <Text style={styles.topTitle}>{rowData.PreparedNo}</Text>
                  </View>

                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>进口口岸:</Text>
                      <Text style={styles.topTitle}>{rowData.ImportPort}</Text>
                  </View>

                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>运输方式:</Text>
                      <Text style={styles.topTitle}>{rowData.TransfromMethod}</Text>
                  </View>
                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>监管方式:</Text>
                      <Text style={styles.topTitle}>{rowData.RegulateMethod}</Text>
                  </View>


                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>启运国地:</Text>
                      <Text style={styles.topTitle}>{rowData.StartControy}</Text>
                  </View>
                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>贸易国别:</Text>
                      <Text style={styles.topTitle}>{rowData.TradeControy}</Text>
                  </View>
                  <View style={styles.middleText}>
                      <Text style={styles.topTitleBold}>承诺事项:</Text>
                      <Text style={styles.topTitle}>{rowData.AdmireCase}</Text>
                  </View>
              </View>
              {/*货物信息*/}
              <View style={styles.HeahderView}>
                  <Image source={require('../Img/goodsInfo.png')}/>
                  <Text style={styles.HeadTitleStyle}>货物信息</Text>
              </View>
                  <View style={styles.middleTextStyle }>
                      <View style={styles.middleText}>
                          <Text style={styles.topTitleBold}>包装类型:</Text>
                          <Text style={styles.topTitle}>{rowData.PageType}</Text>
                      </View>

                      <View style={styles.middleText}>
                          <Text style={styles.topTitleBold}>件数:</Text>

                          <Text style={styles.topTitle}>{rowData.GoodNum+'件'}</Text>
                      </View>
                      <View style={styles.middleText}>
                          <Text style={styles.topTitleBold}>毛重:</Text>

                          <Text style={styles.topTitle}>{rowData.GW+'kg'}</Text>
                      </View>
                      <View style={styles.middleText}>
                          <Text style={styles.topTitleBold}>净重:</Text>

                          <Text style={styles.topTitle}>{rowData.NW+'kg'}</Text>
                      </View>
                  </View>
              {/*客户信息*/}
              <View style={styles.HeahderView}>
                  <Image source={require('../Img/costomerInfo.png')}/>
                  <Text style={styles.HeadTitleStyle}>客户信息</Text>
              </View>
                  <View style={styles.middleTextStyle}>
                  <View style={styles.ShowLongText}>
                      <Text style={styles.topTitleBold}>经营单位:</Text>

                      <Text style={styles.topTitle}>{rowData.Operation}</Text>
                  </View>
                  <View style={styles.ShowLongText}>
                      <Text style={styles.topTitleBold}>收货单位:</Text>

                      <Text style={styles.topTitle}>{rowData.Recipient}</Text>
                  </View>
                  <View style={styles.ShowLongText}>
                      <Text style={styles.topTitleBold}>申报单位:</Text>

                      <Text style={{ paddingLeft:0.012*screenWidth,

        fontSize: 0.04*screenWidth,
        flexWrap:'wrap'}}>{rowData.Declare}</Text>
                  </View>

              </View>
          </View>
      )
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
    CustomCellStyle:{
        width:screenWidth,

        backgroundColor:'black',
        // paddingTop:0.024*screenWidth
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
        flexWrap:'wrap'
    },
    ShowLongText:{
        width:screenWidth,
        height:0.072*screenWidth,
        marginLeft:vMargin,
        flexDirection:'row'

    },
    HeahderView:{
        width:screenWidth,
        height:0.1*screenWidth,
        backgroundColor:'#f5fcff',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:0.001*screenWidth,
        paddingLeft:0.01*screenWidth,

    },
    HeadTitleStyle:{
        paddingLeft:0.012*screenWidth,

        fontSize: 0.05*screenWidth,
        fontWeight: 'bold',
    }
});
