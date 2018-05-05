'use strict';
import React, { Component, } from 'react';
import {Picker,View,Image,TouchableOpacity,ScrollView,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import {forgetPassWord} from '../../service/login'
import { NavigationActions } from 'react-navigation'
import {editData,}  from '../../service/editData.js';
export default class ForgetPassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          userType:"general",
          showModal:true,
          fished:false,
        };
     }
     componentDidMount(){
       BackHandler.addEventListener('hardwareBackPress', function(){});
     }
     finshedChange(text){
       this.setState({
         name:text
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

     onOkChange(){
       var resultFu=function(result){
         if(!result.ErrorMsg&&result.httpCode==200){
           _navigator.navigate("Verification",{phone:result.user.mobile,userId:result.user.id_,userType:_state.userType})
         }else{
          ToastAndroid.show(result.ErrorMsg,ToastAndroid.SHORT);
         }
       }
       forgetPassWord({userType:_state.userType,userName:_state.name},resultFu)
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
        {_state.showModal?
            <View style={styles.btngroup}>
               <TouchableOpacity onPress={()=> this.setState({showModal:true,userType:'general'})} style={styles.btngeneral}>
                    <Text style={styles.textgeneral}>普通用户</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.setState({showModal:false,userType:'expert'})} style={styles.btnexpert}>
                    <Text style={[styles.textgeneral,{color:color.main1C}]}>专家用户</Text>
                </TouchableOpacity>
           </View>
            :
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
        }

        <View style={styles.labelBox}>
           <View style={styles.label}>
              <Text style={styles.text}>请输入账号：</Text>
               <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>_this.finshedChange(text)} value={_this.state.name}/>
          </View>
            <TouchableOpacity style={_state.fished?styles.button:styles.disable} disabled={!_state.fished} onPress={()=>{_this.onOkChange()}}>
                    <Text style={styles.loginbtn}>下一步</Text>
            </TouchableOpacity>

        </View>









          </View>
       )
     }
   }
