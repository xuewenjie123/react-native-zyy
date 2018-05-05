'use strict';
import React, { Component, } from 'react';
import {Picker,View,Image,TouchableOpacity,ScrollView,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
// import { NavigationActions } from 'react-navigation'
import {sendMsg}  from '../../service/register';
import {confirmMobile}  from '../../service/login';
export default class ForgetPassWord extends Component {
    constructor(props) {
        super(props);
        this.timer=null;
        this.state = {
          telCodeGeneral:"",
          randNum:"获取验证码",
          fished:false,
          phone:this.props.navigation.state.params.phone,
          telphone:this.props.navigation.state.params.phone,
        };
     }
    componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});

       var phone=_state.phone;
       _this.setState({
         phone:phone.substring(0,3)+"****"+phone.slice(-4)
       })
     }
    componentWillUnmount(){
       this.timer&&clearInterval(this.timer)
     }

    stateChange(stadus){
         this.setState({
            randNum:stadus
         })
     }

    getRandNum(){
    var AlertMsg=function(result){
      if(result.httpCode==200&&!result.ErrorMsg){
        if(!isNaN(_this.state.randNum)){
                return false;
          }
           var stadus=60;
          _this.stateChange(60)
           _this.timer=setInterval(function(){
                 stadus-=1;
                 _this.stateChange(stadus)
                 if(stadus<0){
                 _this.stateChange('重新获取')
                     clearInterval(_this.timer)
                 }
          },1000)
      }else{
        ToastAndroid.show(result.ErrorMsg,ToastAndroid.SHORT);
      }
    }

       sendMsg({tmplId:44890,mobile:_this.state.telphone},AlertMsg);
     }


     finshedChange(text){
       this.setState({
         telCodeGeneral:text
       })
       if(text!==''){
         this.setState({
           fished:true
         })
       }else{
         this.setState({
           fished:false
         })
       }

     }
     nextPage(){
       if(_this.timer){
        clearInterval(_this.timer)
        _this.stateChange('获取验证码')
       }
     
       var resultFu=function(result){
         if(!result.ErrorMsg&&result.httpCode==200){
           _navigator.navigate("ResetPassWord",{userId:_this.props.navigation.state.params.userId,userType:_this.props.navigation.state.params.userType})
         }else{
          ToastAndroid.show(result.ErrorMsg,ToastAndroid.SHORT);
         }
       }
       
         confirmMobile({mobile:_state.telphone,verificationCode:_state.telCodeGeneral},resultFu)
    }


     render(){
       _this=this;
       _state=this.state;
        _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "忘记密码",
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

          <View style={styles.btngroup}>
                <Text style={styles.text1}>请输入{_state.phone}的短信验证码</Text>
          </View>

          <View style={styles.labelBox}>
               <View style={styles.label}>
                  <View style={styles.codeBox}>
                      <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>_this.finshedChange(text)} value={_this.state.telCodeGeneral} placeholder="请输入验证码"/>
                  </View>

                   <TouchableOpacity style={styles.getcode} onPress={()=>_this.getRandNum()}>
                           <Text style={styles.text1}>{_state.randNum}</Text>
                   </TouchableOpacity>
              </View>


                <TouchableOpacity style={_state.fished?styles.button:styles.disable} disabled={!_state.fished} onPress={()=>_this.nextPage()}>
                        <Text style={styles.loginbtn}>下一步</Text>
                </TouchableOpacity>
          </View>

      </View>
       )
     }
   }
