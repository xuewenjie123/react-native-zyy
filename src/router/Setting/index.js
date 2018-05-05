'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ToastAndroid,Text,InteractionManager,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
import { NavigationActions } from 'react-navigation'
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';

import {myInfo} from '../../service/mine';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imgurl: "",
          userName:"",
        };
     }

     componentDidMount(){
       if(this.props.navigation.state.params){
         this.setState({
           imgurl: this.props.navigation.state.params.imgurl,
           userName:this.props.navigation.state.params.userName,
         })
       }else{
          myInfo("",_this.myInfoResult);
       }
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
     myInfoResult(result){
       if(result.httpCode == 200){
         if(result.user){
             _this.setState({
               userName:result.user.userName,
               imgurl: result.user.fileUrl?result.user.fileUrl:undefined,})
         }
       }
     }
     finshedChange(){
       removeStorage('login',function(error){
        var resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Mine'}),
          ]
        })
        _navigator.dispatch(resetAction)
           ToastAndroid.show('退出登录成功',ToastAndroid.SHORT)
       })
     }
    backRouter(){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Mine'}),
        ]
      })
      _navigator.dispatch(resetAction)
    }
     render(){
       _this=this;
       _state=_this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "设置",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.backRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>

            <View style={styles.header_box}>
                <TouchableOpacity style={styles.header_box_c} onPress={()=>_navigator.navigate('EditData',{imgurl:_state.imgurl})}>
                         <View style={styles.h_left}>
                              <View style={styles.title_person}>
                                <View style={styles.title_boder}>
                                  <Image source={_state.imgurl?{uri: _state.imgurl}:require('../../images/head_portrait.png')} style={styles.title_img}/>
                                </View>
                              </View>
                             <Text style={styles.person_text}>{_state.userName}</Text>
                         </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.h_right}/>
                </TouchableOpacity>
            </View>




             <View style={styles.query_t}>
                   <TouchableOpacity style={styles.label} onPress={()=>_navigator.navigate('Address',{imgurl:_state.imgurl,userName:_state.userName})}>
                       <View style={styles.order_qy}>
                         <Image source={require('../../images/lock_con.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>地址管理</Text>
                       </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.label} onPress={()=>_navigator.navigate('Security',{imgurl:_state.imgurl,userName:_state.userName})}>
                       <View style={styles.order_qy}>
                         <Image source={require('../../images/phone_icon.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>账户与安全</Text>
                       </View>
                       <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                   </TouchableOpacity>

             </View>

               <TouchableOpacity style={styles.button} onPress={this.finshedChange.bind(this)}>
                     <Image source={require('../../images/edit_fished.png')} style={styles.btn_bg}/>
                     <Text style={styles.yes_btn}>退出登录</Text>
               </TouchableOpacity>


          </View>
       )
     }
   }
