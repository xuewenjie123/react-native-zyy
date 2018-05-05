'use strict';
import React, { Component, } from 'react';
import { ScrollView,  View, Image, TextInput, Text,TouchableOpacity, ToastAndroid ,BackHandler} from 'react-native';
var styles =require('./styles');
import NavigatorTopBar from './../../components/common/NavigatorTopBar';
import color from './../../constant/color';
import { NavigationActions } from 'react-navigation'
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _navigator,_this,_state;

import { login } from '../../service/login';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      nameGeneral: '',
      nameExpert:'',
      passGeneral: '',
      passExpert: '',
      userType: 'general',
      showModal:true,
      fishedExpert:false,
      fishedGener:false,
    }
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function(){});
  }


  loginAction(){
    var resultFu = function(response){
      const resetAction = NavigationActions.reset({
        index:0,
        actions:[NavigationActions.navigate({ routeName: 'Mine'})]
      })
      const resetAction2 = NavigationActions.reset({
        index:0,
        actions:[NavigationActions.navigate({ routeName: 'Famous'})]
      })
      const resetAction3 = NavigationActions.reset({
        index:0,
        actions:[NavigationActions.navigate({ routeName: 'Find'})]
      })
       if(!response.ErrorMsg&&response.httpCode==200){
        setStorage("login",{userId: response.user.id_,userType:_this.state.userType},(error)=>{
          console.log(_this.props.navigation.state.params);
          if(_this.props.navigation.state.params){
              if(_this.props.navigation.state.params.Famous){
                _navigator.dispatch(resetAction2)
              }else if(_this.props.navigation.state.params.mine){
                _navigator.dispatch(resetAction)
              }else if(_this.props.navigation.state.params.Register){
                _navigator.dispatch(resetAction3)
              }
          }else{
            _navigator.dispatch(NavigationActions.back({key:_navigator.state.key}))
          }
        })
      }else{
      ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
        return false;
      }
    }
      if(this.state.userType=='general'){
        if(!_this.state.nameGeneral){
              ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
              return false;
            }else if(!_this.state.passGeneral){
              ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
              return false;
            }else{
              login({userName: _this.state.nameGeneral, password: _this.state.passGeneral,userType:this.state.userType},resultFu);

            }
     }else{
       if(!_this.state.nameExpert){
              ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
              return false;
            }else if(!_this.state.passExpert){
              ToastAndroid.show('请输入密码', ToastAndroid.SHORT);
              return false;
            }else{
              login({userName: _this.state.nameExpert, password: _this.state.passExpert,userType:this.state.userType},resultFu);
        }
     }

  }


  passZjChange(text){
    _this.setState({passExpert:text})
    if(_state.nameExpert!==''&&text!==''){
      this.setState({
        fishedExpert:true
      })
    }else{
      this.setState({
        fishedExpert:false
      })
    }
  }
  nameZjChange(text){
    _this.setState({nameExpert:text})
    if(text!==''&&_state.passExpert!==''){
      this.setState({
        fishedExpert:true
      })
    }else{
      this.setState({
        fishedExpert:false
      })
    }
  }


  passPtChange(text){
    _this.setState({
      passGeneral:text
    })
    if(_state.nameGeneral!==''&&text!==''){
      this.setState({
        fishedGener:true
      })
    }else{
      this.setState({
        fishedGener:false
      })
    }
  }
  namePtChange(text){
    _this.setState({nameGeneral:text})
    if(text!==''&&_state.passGeneral!==''){
      this.setState({
        fishedGener:true
      })
    }else{
      this.setState({
        fishedGener:false
      })
    }
  }

  render() {
    let NavigatorTopBarProps = {
            visible: true,
            title: "登录",
        }
    _this = this;
    _state=this.state;
    _navigator = this.props.navigation;
    return (
      <View style={styles.main}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
            {
                this.state.userType=='general'?(
                  <ScrollView style={styles.mainbt}>
                    <View style={styles.btngroup}>
                    <TouchableOpacity onPress={()=> this.setState({showModal:true,
                    userType:'general'})} style={styles.btngeneral}>
                            <Text style={styles.textgeneral}>普通用户</Text>
                        </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.setState({showModal:false,
                    userType:'expert'})} style={styles.btnexpert}>
                            <Text style={[styles.textgeneral,{color:color.main1C}]}>专家用户</Text>
                        </TouchableOpacity>
                    </View>
                  <View style={styles.labelBox}>
                    <View style={styles.label}>
                        <Text style={styles.text}>手机号/昵称/邮箱</Text>
                        <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=> _this.namePtChange(text)} value={_this.state.nameGeneral}/>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.text}>密码</Text>
                        <TextInput  underlineColorAndroid="transparent" style={{flex:1}}
                      onChangeText={(text)=> _this.passPtChange(text)} secureTextEntry={true}
                     value={this.state.passGeneral} />
                        <TouchableOpacity onPress={()=>_navigator.navigate('ForgetPassWord')}>
                            <Text style={[styles.froget,{borderBottomWidth:1}]}>忘记密码?</Text>
                        </TouchableOpacity>
                    </View>

                      <TouchableOpacity style={_state.fishedGener?styles.button:styles.disable}
                        onPress={()=>_this.loginAction()}>
                              <Text style={styles.loginbtn}>登录</Text>
                      </TouchableOpacity>

                    <TouchableOpacity onPress={()=>_navigator.navigate('Register')} style={styles.regbtn}>
                            <Text style={styles.regtext}>我要注册</Text>
                    </TouchableOpacity>
                  </View>
                  </ScrollView>)
                  :

                    (  <ScrollView style={styles.mainbt}>
                    <View style={styles.btngroup}>
                        <TouchableOpacity onPress={()=> this.setState({showModal:true,
                        userType:'general'})} style={styles.generalbtn}>
                            <Text style={[styles.textgeneral,{color:color.main1C}]}>普通用户</Text>
                        </TouchableOpacity>

                      <TouchableOpacity onPress={()=> this.setState({showModal:false,
                      userType:'expert'})} style={styles.expertbtn}>
                            <Text style={styles.textgeneral}>专家用户</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.labelBox}>
                     <View style={styles.label}>
                        <Text style={styles.text}>手机号/用户名/邮箱</Text>
                         <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>_this.nameZjChange(text)} value={this.state.nameExpert}/>
                    </View>
                     <View style={styles.label}>
                        <Text style={styles.text}>密码</Text>
                        <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>_this.passZjChange(text)} secureTextEntry={true}
                        value={this.state.passExpert}/>
                        <TouchableOpacity onPress={()=>_navigator.navigate('ForgetPassWord')}>
                            <Text style={[styles.froget,{borderBottomWidth:1}]}>忘记密码?</Text>
                        </TouchableOpacity>
                    </View>
                      <TouchableOpacity style={_state.fishedExpert?styles.button:styles.disable} onPress={()=>_this.loginAction()}>
                              <Text style={styles.loginbtn}>登录</Text>
                      </TouchableOpacity>

                    <TouchableOpacity onPress={()=>_navigator.navigate('Register')} style={styles.regbtn}>
                            <Text style={styles.regtext}>我要注册</Text>
                    </TouchableOpacity>
                    </View>
                  </ScrollView>
                )
          }
      </View>
    );
  }
};
