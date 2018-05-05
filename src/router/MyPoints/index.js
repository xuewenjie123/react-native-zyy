'use strict';
import React, { Component, } from 'react';
import { ListView,View, TouchableOpacity,Image,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import styles from './styles';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import { getPoint, }  from '../../service/point';
import { date2str, }  from '../../constant/constants';
var MyPointsList=[
   {action:"新用户注册",date:"2016-08-12",pointNum:"+20"},
   {action:"实体店消费",date:"2016-08-12",pointNum:"+14"},
   {action:"新用户消费 加送",date:"2016-08-12",pointNum:"+80"},
   {action:"礼品兑换",date:"2016-08-12",pointNum:"+10"},

];
var _navigator,_this;
export default class MyPoints extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
        this.state = {
          dataSource: ds,
          point:0,
        };
     }

     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
       var resultFu=function(result){
         _this.setState({
           point:result.bonusPoints?result.bonusPoints:0,
           dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.bpRecords),
         })
       }
       getPoint({},resultFu)

     }
     _renderRow(point){
       return(
         <View style={styles.main_label}>
           <View style={styles.labels}>
                <View><Text style={styles.lt_text}>{point.action}</Text><Text style={styles.lb_text}>{date2str(new Date(point.date.replace(/\-/g, "/")),"yyyy年MM月dd日")}</Text></View>
                <View><Text style={styles.lr_text}>{point.pointNum}</Text></View>
           </View>
        </View>
       )
     }

     render(){
       _this=this
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "我的积分",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_navigator.goBack()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
           <View style={styles.main}>
           <NavigatorTopBar {...NavigatorTopBarProps}/>
               <View style={styles.point}>
                   <Image source={require("../../images/point_head.jpg")}  style={styles.point_h}/>
                   <View style={{alignItems:"center"}}>
                     <Text style={styles.point_text}> 当前积分</Text>
                     <Text style={styles.point_num}>{_this.state.point+''}</Text>
                   </View>
                </View>
                <View style={styles.Record}><Text style={styles.Record_text}>消费记录</Text></View>
               <ListView
                 dataSource={this.state.dataSource}
                 renderRow={_this._renderRow.bind(_this)}
                 initialListSize={10}
                 enableEmptySections={true}
               />
            </View>

       )
     }
   }
