'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,Text,ToastAndroid,InteractionManager,BackHandler} from 'react-native';
import NavigatorTopBar from './../../components/common/NavigatorTopBar';
import color from './../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import Modal from './ModalCancel';
import { emailFn ,getEmailInfo,unbindEmail} from '../../service/email';
export default class Email extends Component {
    constructor(props) {
        super(props);
        this.timer=null;
        this.state = {
        emailCode:"",
        emailState:"",
        visible:false,
        };
     }
     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
        InteractionManager.runAfterInteractions(() => {
           getEmailInfo({name:""},_this.emailInfoResult)
        });
     }

     emailInfoResult(result){
       if(result.httpCode == 200){
         if(result.user){
           _this.setState({
             email:result.user.email,
             emailState:result.user.emailBindingState,
           })
         }
       }else{
        result.errormsg?ToastAndroid.show(result.errormsg,ToastAndroid.SHORT):ToastAndroid.show(result.msg,ToastAndroid.SHORT)
       }
     }
   unbind(){
     _this.setState({
       visible:false
     })
     var resultFu = function(response){
       console.log(response);
         if(response.httpCode == 200){
           ToastAndroid.show("成功解除该邮箱绑定", ToastAndroid.SHORT);
           _this.setState({
             emailState:""
           })
         }
     };
     unbindEmail({},resultFu)
   }
     emailChange(text){
        this.setState({
            emailCode:text
        })
     }
     unbindModal(){
       _this.setState({
         visible:true
       })
     }
     sendMsg(){
       if (_this.state.emailState=="1") {
         return(
           <TouchableOpacity style={styles.sendActive} onPress={()=>_this.unbindModal()}>
              <Text style={styles.TextActive}>解除绑定</Text>
           </TouchableOpacity>
         )
       }else {
           return(
             <TouchableOpacity style={!_this.state.emailCode?styles.sendGenaral:styles.sendActive}  onPress={()=>_this.finshedChange()}>
                <Text style={!_this.state.emailCode?styles.TextGenaral:styles.TextActive}>发送</Text>
             </TouchableOpacity>
           )
         }
     }

     finshedChange(){
         var resultFu = function(response){
             console.log(response)
             if(response.httpCode==200&&!response.errormsg){
              ToastAndroid.show("邮件已发送成功，请注意查收",ToastAndroid.SHORT);
            }else{
              response.errormsg?ToastAndroid.show(response.errormsg,ToastAndroid.SHORT):ToastAndroid.show(response.msg,ToastAndroid.SHORT)
            }
         };

        if(!this.state.emailCode){
          ToastAndroid.show('请输入邮箱', ToastAndroid.SHORT);
          return false;
        }else if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(_this.state.emailCode))) {
          ToastAndroid.show('请输入正确的邮箱', ToastAndroid.SHORT);
          return false;
        }else if (this.state.emailCode.length>30) {
          ToastAndroid.show('请输入30位以内的邮箱', ToastAndroid.SHORT);
          return false;
        }else {
            emailFn(this.state.emailCode,resultFu)
        }
     }
     onCloseModal(){
       _this.setState({
         visible:false
       })
     }
     render(){
        _this=this;
        _navigator=this.props.navigation;
        _state=this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title:_this.state.emailState=="1"?"解除绑定 ":"绑定邮箱",
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
       let ModalProps={
         visible:_state.visible,
         _navigator:_navigator,
         closeModal:function(){
           _this.onCloseModal()
         },
         unbind:function(){
           _this.unbind()
         }
       }
       return(
         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>
             <View style={styles.label}>
                 {
                   _this.state.emailState=="1"

                   ?
                     <View style={styles.label_box}>
                         <Text style={styles.text}>邮箱</Text>
                           <Text style={{flex:1,paddingLeft:10}}>{_this.state.email}</Text>
                     </View>
                   :
                   <View style={styles.label_box}>
                       <Text style={styles.text}>邮箱</Text>
                         <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={this.emailChange.bind(this)} value={this.state.emailCode} placeholder="请输入您要绑定的邮箱" placeholderTextColor={color.font3C}/>
                   </View>
                  }
              </View>
              {_this.state.emailState==1?<View style={{flex:1}}></View>: <View style={styles.notice}>
                 <Text style={styles.notice_text}>提示：将会发送一封邮件到您的邮箱（有些邮件会进到垃圾箱内），
  邮件验证成功后，返回账户与安全页再次进到当前页即可完成绑定！</Text>
               </View>}

             {this.sendMsg()}
             <Modal {...ModalProps}/>
          </View>
       )
     }
   }
