'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator;
import { editPassWord,checkOldPassword }  from '../../service/editPassWord';
import { NavigationActions } from 'react-navigation';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
export default class EditPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        oldPass:'',
        newPass:'',
        yesPass:'',
        };
     }
     oldPassChange(text){
        this.setState({
            oldPass:text
        })
     }
     newPassChange(text){
       this.setState({
           newPass:text
       })
     }
     yesChange(text){
       this.setState({
           yesPass:text
       })
     }
     componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
     finshedChange(){
               const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Login',params:{mine:true}}),
                  ]
                })
                 var resultFu = function(response){
                  if(!response.ErrorMsg){
                      removeStorage('login',function(error){
                         ToastAndroid.show('修改成功', ToastAndroid.SHORT);
                         _this.props.navigation.dispatch(resetAction)
                      })
                  }else{
                      ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
                  }
              };
      if(!this.state.oldPass){
        ToastAndroid.show('请输入旧密码', ToastAndroid.SHORT);
        return false;
      }else if (!this.state.newPass) {
        ToastAndroid.show('未输入新密码', ToastAndroid.SHORT);
        return false;
      }else if (!this.state.yesPass) {
        ToastAndroid.show('请再次输入', ToastAndroid.SHORT);
        return false;
      }else if( !(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.state.newPass)) || !(/^.{6,18}$/.test(this.state.newPass)) ){
          ToastAndroid.show('密码为6-18位字母、数字或符号组成，必须包含字母和数字', ToastAndroid.SHORT);
          return false;
      }else if (this.state.newPass!==this.state.yesPass) {
        ToastAndroid.show('两次密码不一致', ToastAndroid.SHORT);
        return false;
      }else {
          editPassWord({oldPassword: this.state.oldPass,newPassWord:this.state.newPass,yesPassWord:this.state.yesPass},resultFu)
      }
     }
     passCheck(){
       let resultFu=function(result){
          if(result.ErrorMsg){
            ToastAndroid.show(result.ErrorMsg, ToastAndroid.SHORT);
            _this.refs.passoldword.focus()
          }
       }
       if(!this.state.oldPass){
        ToastAndroid.show('请输入旧密码', ToastAndroid.SHORT);
        _this.refs.passoldword.focus()
        return false;
      }
        checkOldPassword({oldPassword: this.state.oldPass},resultFu)
     }

     render(){
       _this=this;
        _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "修改密码",
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
                       <Text style={styles.text}>旧的密码</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}}  onChangeText={this.oldPassChange.bind(this)} secureTextEntry={true} value={this.state.oldPass}  onBlur={()=>_this.passCheck()}  ref='passoldword'/>
                   </View>

                   <View style={styles.label}>
                       <Text style={styles.text}>新的密码</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={this.newPassChange.bind(this)} secureTextEntry={true} value={this.state.newPass} />
                   </View>

                   <View style={[styles.label,{borderBottomWidth:0}]}>
                       <Text style={styles.text}>再次输入</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={this.yesChange.bind(this)} secureTextEntry={true} value={this.state.yesPass} />
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
