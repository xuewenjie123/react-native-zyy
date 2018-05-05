'use strict';
import React, { Component, } from 'react';
import {View,Image,TouchableOpacity,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');

export default class EmailSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
        emailCode:"",
        randNum:"获取验证码",
        };
     }
     componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
     render(){
       var _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "绑定邮箱 ",
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
             <Image source={require('../../images/email_suc_icon.png')} style={styles.suc_img}/>
             <View style={styles.notice}>
               <Text style={styles.notice_text}>绑定成功</Text>
             </View>
          </View>
       )
     }
   }
