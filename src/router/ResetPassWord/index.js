'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import { resetPassword }  from '../../service/editPassWord';
import { NavigationActions } from 'react-navigation';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
export default class EditPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        oldPass:'',
        newPass:'',
        userId:this.props.navigation.state.params.userId,
        userType:this.props.navigation.state.params.userType,
        };
     }
     oldPassChange(text){
        this.setState({
            oldPass:text
        })
     }
     componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
     newPassChange(text){
       this.setState({
           newPass:text
       })
     }
     finshedChange(){
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Find'}),
            NavigationActions.navigate({ routeName: 'Login'}),
          ]
        })
                 var resultFu = function(result){
                 if(!result.ErrorMsg&&result.httpCode==200){
                      removeStorage('login',function(error){
                         ToastAndroid.show('重置密码成功', ToastAndroid.SHORT);
                         _this.props.navigation.dispatch(resetAction)
                      })
                  }else{
                      ToastAndroid.show(result.msg,ToastAndroid.SHORT);
                  }
              };
      if(!_state.oldPass){
        ToastAndroid.show('请输入新密码', ToastAndroid.SHORT);
        return false;
      }else if (!_state.newPass) {
        ToastAndroid.show('请确认密码', ToastAndroid.SHORT);
        return false;
      }else if( !(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(_state.newPass)) || !(/^.{6,18}$/.test(_state.newPass)) ){
          ToastAndroid.show('密码为6-18位字母、数字或符号组成，必须包含字母和数字', ToastAndroid.SHORT);
          return false;
      }else if (_state.newPass!==_state.oldPass) {
        ToastAndroid.show('两次密码不一致', ToastAndroid.SHORT);
        return false;
      }else {
          resetPassword({newPassWord:_state.newPass,userId:_state.userId,userType:_state.userType},resultFu)
      }
     }

     render(){
      _this=this;
      _state=this.state;
      _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "重置密码",
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

             <View style={styles.change_box}>
                   <View style={styles.label}>
                       <Text style={styles.text}>新的密码</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={this.oldPassChange.bind(this)} secureTextEntry={true} value={_state.oldPass} />
                   </View>

                   <View style={styles.label}>
                       <Text style={styles.text}>确认密码</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={this.newPassChange.bind(this)} secureTextEntry={true} value={_state.newPass} />
                   </View>

             </View>


               <TouchableOpacity style={styles.button} onPress={this.finshedChange.bind(this)}>
                     <Image source={require('../../images/edit_fished.png')} style={styles.btn_bg}/>
                     <Text style={styles.yes_btn}>确定</Text>
               </TouchableOpacity>


          </View>
       )
     }
   }
