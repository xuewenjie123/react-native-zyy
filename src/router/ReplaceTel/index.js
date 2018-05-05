'use strict';
import React, { Component, } from 'react';
import {View,BackHandler,Image,TouchableOpacity,TextInput,Text,ToastAndroid,InteractionManager,TouchableWithoutFeedback} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
var _navigator,_this,_state;
import { replaceTel,sendMsg,checkMobile,getMobileByUserId} from '../../service/replaceTel';
let { width, height } = Dimensions.get('window');
export default class ReplaceTel extends Component {
    constructor(props) {
        super(props);
        this.timer=null;
        this.state = {
          telNumber:'',
          telCode:'',
          oldMobile:'',
          randNum:'获取验证码',
          isExistMobile:false,
        };
     };
     componentWillUnmount(){
       this.timer&&clearInterval(this.timer)
     }
     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
       InteractionManager.runAfterInteractions(() => {
         getMobileByUserId("",_this.getMobileResult);
       });
     }
     getMobileResult(result){
       console.log(result)
       if(result.httpCode == 200){
         if(result.mobile){
           _this.setState({oldMobile:result.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')})
         }
       }else{
         ToastAndroid.show(result.msg,ToastAndroid.SHORT)
       }
     }
     stateChange(stadus){
       console.log(stadus);
         this.setState({
                 randNum:stadus
         })
     }

     getRandNum(){
         var _this = this;
         var AlertMsg=function(response){
           console.log(response)
           if (!_state.isExistMobile) {
             if(!response.ErrorMsg){
               ToastAndroid.show('验证码已发送至您的手机，请注意查收', ToastAndroid.SHORT);
                       var stadus=60;
                       _this.stateChange(60);
                       _this.timer=setInterval(function(){
                         stadus-=1;
                        _this.stateChange(stadus);
                          if(stadus<0){
                            _this.stateChange('获取验证码')
                            clearInterval(_this.timer)
                           }
                     },1000)
             }else{
               //声明消息 不做操作
               ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
               return false;
             }
           }else {
             ToastAndroid.show('该手机号已注册过,请更换手机号码', ToastAndroid.SHORT);
           }

         }

        if(!isNaN(_this.state.randNum)){
              return false;
         }
        if(!_this.state.telNumber){
              ToastAndroid.show('请输入电话', ToastAndroid.SHORT);
              return false;
        }else if( !(/^1[34578]\d{9}$/.test(_this.state.telNumber)) ){
              ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
              return false;
        };
        sendMsg({tmplId:44892,mobile:_this.state.telNumber},AlertMsg);
     }

     telCheck(number){
       var resultFu=function(result){
         if(result.isExistMobile){
             ToastAndroid.show('该手机号已注册过,请更换手机号码', ToastAndroid.SHORT);
         }
         _this.setState({
                 isExistMobile:result.isExistMobile
         })
       }
       checkMobile(_state.telNumber,resultFu)
      }
     telChange(text){
        this.setState({
            telNumber:text
        })
     }
     telCodeChange(text){
       this.setState({
           telCode:text
       })
     }
     mo(){
       this.refs.mob.blur()
     }
     finshedChange(){
      clearInterval(this.timer);
      _this.stateChange("获取验证码");
       var resultFu = function(response){
           console.log(response)
           if(!response.ErrorMsg&&response.httpCode==200){
               // global.sendSocketMsg("init",{userId: response.data.id})
               //跳转到首页 并清除路由信息 并保存登录信息
               ToastAndroid.show('修改成功', ToastAndroid.SHORT);
               // AsyncStorage.setItem("main",JSON.stringify(response.data),()=>{
               _navigator.navigate("Security");
           }else{
               //声明消息 不做操作
               ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
           }
       };

      if(!this.state.telNumber){
        ToastAndroid.show('请输入要变更的手机号码', ToastAndroid.SHORT);
        return false;
      }else if (!this.state.telCode) {
        ToastAndroid.show('请输入验证码', ToastAndroid.SHORT);
        return false;
      }else {
          replaceTel({mobile: this.state.telNumber,verificationCode:this.state.telCode},resultFu)
      }

     }

     render(){
        _this=this;
        _state = this.state;
        _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "更改手机",
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
           <TouchableWithoutFeedback onPress={()=>_this.mo()}>
           <View style={styles.main}>

             <NavigatorTopBar {...NavigatorTopBarProps}/>

             <View style={styles.change_box}>
                   <View style={styles.label}>
                      <View style={[styles.text_box,{marginRight:10}]}>
                         <Text style={styles.text}>当前手机号</Text>
                      </View>
                       <Text style={[styles.text,{color:color.main1C}]}>{_state.oldMobile}</Text>
                   </View>

                   <View style={styles.label}>
                     <View style={[styles.text_box,{marginRight:10}]}>
                       <Text style={styles.text}>国家/地区</Text>
                     </View>
                        <Text style={[styles.text,{color:color.font3C}]}>中国</Text>
                   </View>

                   <View style={styles.label}>
                      <View style={[styles.text_box,{borderRightWidth:1,borderColor:color.border1c}]}>
                         <Text style={styles.text}>+86</Text>
                      </View>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1,paddingLeft:10}}
                       onBlur={this.telCheck.bind(this)}  ref='mob'
                       onChangeText={this.telChange.bind(this)} value={this.state.telNumber} placeholder="请输入新手机号" placeholderTextColor={color.font3C} />
                   </View>
                   <View style={[styles.label,{borderBottomWidth:0}]}>
                       <View style={styles.text_box}>
                          <Text style={styles.text}> 验 证 码 </Text>
                       </View>
                            <TextInput underlineColorAndroid="transparent" style={{flex:1,paddingLeft:10}} onChangeText={this.telCodeChange.bind(this)} value={this.state.telCode} placeholder="请输入验证码" placeholderTextColor={color.font3C}/>

                            <TouchableOpacity style={styles.getnumbtn} onPress={this.getRandNum.bind(this)}>
                                <Text style={styles.getnumtext}>{this.state.randNum}</Text>
                            </TouchableOpacity>
                   </View>
             </View>

             <View style={styles.notice}>
               <Text style={styles.notice_text}>注更换手机后，下次登录使用新手机号</Text>
             </View>

             <TouchableOpacity style={styles.button} onPress={this.finshedChange.bind(this)}>
                   <Image source={require('../../images/edit_fished.png')} style={styles.btn_bg}/>
                   <Text style={styles.yes_btn}>确定</Text>
             </TouchableOpacity>

             </View>
             </TouchableWithoutFeedback>
          </View>
       )
     }
   }
