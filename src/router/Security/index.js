'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from './../../components/common/NavigatorTopBar.js';
import color from './../../constant/color.js';
import styles from './styles.js';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import {NavigationActions} from 'react-navigation';
var _this,_state,_navigator;
export default class Security extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
     }
     componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
      backRouter(){
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
              NavigationActions.navigate({routeName: 'Mine'}),
            NavigationActions.navigate({routeName: 'Setting'})
          ]
        })
        _navigator.dispatch(resetAction)
      }
     render(){
       _this=this;
       _state = this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "账号与安全",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.backRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('./../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>

             <View style={styles.query_t}>
                   <TouchableOpacity style={styles.label} onPress={()=>{_navigator.navigate('EditPassWord')}}>
                       <View style={styles.order_qy}>
                         <Image source={require('../../images/lock_con.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>修改密码</Text>
                       </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.label} onPress={()=>_navigator.navigate('ReplaceTel')}>
                       <View style={styles.order_qy}>
                         <Image source={require('../../images/phone_icon.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>更换手机</Text>
                       </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.label,{borderBottomWidth:0}]} onPress={()=>_navigator.navigate('Email')}>
                       <View style={styles.order_qy}>
                         <Image source={require('../../images/email_icon.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>绑定邮箱</Text>
                       </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                   </TouchableOpacity>
             </View>


          </View>
       )
     }
   }
