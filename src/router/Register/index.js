'use strict';
import React, { Component, } from 'react';
import {ScrollView,Picker, View, Image, Dimensions,TouchableOpacity,Modal ,TextInput,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from './../../components/common/NavigatorTopBar';
import color from './../../constant/color';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import {setStorage} from '../../constant/storage';
import { registerGeneral,registerExpert,sendMsg}  from '../../service/register';
import {selectOptionList}  from '../../service/editData';
import ModalDropdown from 'react-native-modal-dropdown';
import List from '../../components/common/sectionList'
export default class Register extends Component {
    constructor(props) {
    super(props);
        this.timer=null;
        this.state={
            showModal:false,
            type:'general',
            stadus:false,
            randNumGeneral:'获取验证码',
            randNumExpert:'获取验证码',
            nameExpert:'',//专家用户名
            name:"",//专家姓名
            sexGennal:"男",
            yesPassGeneral:"",//普通确认密码
            yesPassExpert:"",//专家确认密码
            sexExpert:'男',//专家性別
            telExpert:null,//专家电話
            hospitalExpert:'',//专家医院
            departmentExpert:[],//专家科室
            titleExpert:'',//专家头衔
            telCodeExpert:'',//专家验证码
            passExpert:'',//专家密码

            nameGeneral:'',//普通昵称
            telGeneral:null,//普通电話
            telCodeGeneral:'',//普通验证码
            passGeneral:'',//普通密码
            sectionList:[],
            visible:false,
            sectionIds:[],
            displayExpert:"男",
            displayGenner:"女"
        }
     }

     componentWillUnmount(){
       this.timer&&clearInterval(this.timer)
     }
     componentDidMount(){
       selectOptionList("section",_this.selectOptionListResult)
        BackHandler.addEventListener('hardwareBackPress', function(){});
      }
      selectOptionListResult(result){
        if (result.httpCode == 200) {
          _this.setState({
            sectionList:result.sectionList,
           })
        }
      }
    regisite(){
      _this.stateGeneralChange('获取验证码');
      _this.stateExpertChange('获取验证码');
      clearInterval(_this.timer);
      const resetAction = NavigationActions.reset({
         index: 0,
         actions: [
           NavigationActions.navigate({ routeName: 'Find'})
         ]
       })
      var resultFu = function(response){
          if(response.httpCode&&!response.ErrorMsg){
              if(_this.state.type=='general'){
                setStorage("login",{userId: response.user.id_,userType:_this.state.type},(error)=>{
                  ToastAndroid.show('注册成功', ToastAndroid.SHORT);
                    _this.props.navigation.dispatch(resetAction)
                })
              }else{
                ToastAndroid.show('请在审核后进行登录', ToastAndroid.SHORT);
                _this.props.navigation.navigate("Login",{Register:true})
              }

              // AsyncStorage.setItem("main",JSON.stringify(response.data),()=>{
          }else{
              //声明消息 不做操作
              ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
          }

      };

      if(this.state.type=='general'){
          // console.log(this.state.nameGeneral);
          // console.log(this.state.telGeneral);
          // console.log(this.state.telCodeGeneral);

              if(!this.state.nameGeneral){
              ToastAndroid.show('请输入昵称', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.telGeneral){
              ToastAndroid.show('请输入电话', ToastAndroid.SHORT);
              return false;
          }else if( !(/^1[3|4|5|7|8][0-9]{9}$/.test(this.state.telGeneral)) ){
              ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.telCodeGeneral){
              ToastAndroid.show('请输入手机验证码', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.passGeneral){
              ToastAndroid.show('请设置密码', ToastAndroid.SHORT);
              return false;
          }else if( !(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.state.passGeneral)) || !(/^.{6,18}$/.test(this.state.passGeneral)) ){
              ToastAndroid.show('6-18位字母、数字或符号组成，必须包含字母和数字', ToastAndroid.SHORT);
              return false;
          }else if (this.state.passGeneral!==this.state.yesPassGeneral) {
            ToastAndroid.show('两次密码不一致', ToastAndroid.SHORT);
            return false;
          }else{
              registerGeneral({userName: this.state.nameGeneral,sex:_this.state.sexGennal, password: this.state.passGeneral,mobile:this.state.telGeneral,verificationCode:this.state.telCodeGeneral},resultFu);
          }
      }else{

          if(!this.state.nameExpert){
          ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
          return false;
          }else if(!this.state.name){
            ToastAndroid.show('请输入姓名', ToastAndroid.SHORT);
            return false;
         }else if(!this.state.sexExpert){
              ToastAndroid.show('请选择性别', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.telExpert){
              ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
              return false;
          }else if( !(/^1[3|4|5|7|8][0-9]{9}$/.test(this.state.telExpert)) ){
              ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.telCodeExpert){
              ToastAndroid.show('请输入手机验证码', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.passExpert){
              ToastAndroid.show('请设置密码', ToastAndroid.SHORT);
              return false;
          }else if( !(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(this.state.passExpert)) || !(/^.{6,18}$/.test(this.state.passExpert)) ){
            ToastAndroid.show('6-18位字母、数字或符号组成，必须包含字母和数字', ToastAndroid.SHORT);
            return false;
            }else if (this.state.passExpert!==this.state.yesPassExpert) {
                ToastAndroid.show('两次密码不一致', ToastAndroid.SHORT);
                return false;
            }else if(!this.state.hospitalExpert){
              ToastAndroid.show('请输入单位', ToastAndroid.SHORT);
              return false;
          }else if(!this.state.departmentExpert.length){
              ToastAndroid.show('请输入学科', ToastAndroid.SHORT);
              return false;
          }
        //   else if(!this.state.titleExpert){
        //       ToastAndroid.show('请输入头衔', ToastAndroid.SHORT);
        //       return false;
        //   }
          else{
              registerExpert({username: this.state.nameExpert,name:_this.state.name,password: this.state.passExpert, mobile: this.state.telExpert,sex:this.state.sexExpert,hospital:this.state.hospitalExpert,sectionIds:this.state.sectionIds,jobTitle:this.state.titleExpert,verificationCode:this.state.telCodeExpert},resultFu);
          }
      };
    }
    stateGeneralChange(stadus){
        this.setState({
                randNumGeneral:stadus
        })
    }
    stateExpertChange(stadus){
      this.setState({
              randNumExpert:stadus
      })
    }
    getRandNum(){
        var _this = this;
        var AlertMsg=function(response){
          console.log(response)
          if(!response.ErrorMsg){
            ToastAndroid.show('验证码已发送至您的手机，请注意查收', ToastAndroid.SHORT);
                    var stadus=60;
                    if(_this.state.type=='general'){
                        _this.stateGeneralChange(60);
                        _this.timer=setInterval(function(){
                            stadus-=1;
                            _this.stateGeneralChange(stadus);
                            if(stadus<0){
                              _this.stateGeneralChange('获取验证码')
                              clearInterval(_this.timer)
                            }
                        },1000)
                    }else{
                      _this.stateExpertChange(60);
                      _this.timer=setInterval(function(){
                          stadus-=1;
                          _this.stateExpertChange(stadus);
                          if(stadus<0){
                            _this.stateExpertChange('获取验证码')
                              clearInterval(_this.timer)
                          }
                      },1000)
                    }
          }else{
            //声明消息 不做操作
            ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
            return false;
          }
        }


        if(_this.state.type=='general'){
                if(!isNaN(_this.state.randNumGeneral)){
                   return false;
                }
                if(!_this.state.telGeneral){
                    ToastAndroid.show('请输入电话', ToastAndroid.SHORT);
                    return false;
                }else if( !(/^1[34578]\d{9}$/.test(_this.state.telGeneral)) ){
                    ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
                    return false;
                };
                sendMsg({tmplId:44888,mobile:_this.state.telGeneral},AlertMsg);
        }else if(_this.state.type=='expert'){

            if(!isNaN(_this.state.randNumExpert)){
                return false;
            };
            if(!_this.state.telExpert){
                ToastAndroid.show('请输入电话', ToastAndroid.SHORT);
                return false;
            }else if( !(/^1[34578]\d{9}$/.test(_this.state.telExpert)) ){
                ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
                return false;
            };
            sendMsg({tmplId:44888,mobile:_this.state.telExpert},AlertMsg);
        }

    }
    onCloseModal(id,text){
      _this.setState({
        visible:false,
        departmentExpert:text,
        sectionIds:id
      })
    }
    onShowModal(){
      _this.setState({
        visible:true
      })
    }
    selectSex(index,value){

        _this.setState({
            sexExpert:value,
            sexGennal:value
        })
    }
    render() {
      _this = this;
      _state = this.state;
      _navigator=this.props.navigation;
        let NavigatorTopBarProps = {
            visible: true,
            title: "注册",
        }
        let ListModalProps={
          visible:_state.visible,
          _navigator:_navigator,
          closeModal:function(id,text){
            _this.onCloseModal(id,text)
          },
          sectionList:_state.sectionList
        };
        return(
            <View style={styles.main}>
                <NavigatorTopBar {...NavigatorTopBarProps}/>
               {
                 _this.state.showModal?
                 (
                    <ScrollView style={{flex:1,width:width,}}>
                    <View style={{flex:1,alignItems:"center"}}>
                        <View style={styles.btngroup}>
                            <TouchableOpacity onPress={()=> _this.setState({showModal:false,
                            type:'general'})} style={styles.generalbtn}>
                                <Text style={[styles.text,{color:color.main1C}]}>普通用户</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.expertbtn}>
                                <Text style={[styles.text,{color:color.back1C}]}>专家用户</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.label}>
                              <Text style={styles.text}>用户名</Text>
                              <TextInput underlineColorAndroid="transparent" style={{flex:1}}  maxLength = {20} onChangeText={(text) => _this.setState({nameExpert:text})}
                              value={_this.state.nameExpert}/>
                        </View>

                       <View style={styles.label}>
                            <Text style={styles.text}>姓名</Text>
                            <TextInput underlineColorAndroid="transparent" style={{flex:1}} maxLength = {20} onChangeText={(text) => _this.setState({name:text})}
                            value={_this.state.name}/>
                            <TouchableOpacity style={styles.gettrue_name}>
                                <Text style={styles.name}>实名制</Text>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.label}>
                        <Text style={styles.text}>性别</Text>
                        <ModalDropdown style={{flex:1,paddingLeft:30*width/750}} options={['男', '女']} dropdownStyle={{width:width-30*width/750-71,alignItems:"center",height:200*width/750}} onSelect={(index,value)=>_this.selectSex(index,value)} dropdownTextStyle={{fontSize:15,borderBottomWidth:0.5,width:width-30*width/750-71,height:100*width/750}} defaultValue="请选择性别" textStyle={{fontSize:15}}/>
                        <Image source={require('../../images/register-icon.png')} style={styles.regicon}/>
                    </View>
                      <View style={styles.label}>
                            <Text style={styles.text}>手机号</Text>
                            <TextInput underlineColorAndroid="transparent" style={{flex:1}}  maxLength = {11} onChangeText={(text) => _this.setState({telExpert:text})}
                            value={_this.state.telExpert}/>
                        </View>
                       <View style={styles.label}>
                          <Text style={styles.text}>手机验证码</Text>
                          <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text) => _this.setState({telCodeExpert:text})}
                          value={_this.state.telCodeExpert}/>
                          <TouchableOpacity style={styles.getnumbtn} onPress={() => _this.getRandNum()}>
                              <Text style={styles.getnumtext}>{_this.state.randNumExpert}</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={styles.label}>
                          <Text style={styles.text}>设置密码</Text>
                          <TextInput underlineColorAndroid="transparent" style={{flex:1}}  secureTextEntry={true} onChangeText={(text) => _this.setState({passExpert:text})} value={_this.state.passExpert}/>
                      </View>
                      <View style={styles.label}>
                                <Text style={styles.text}>确认密码</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}}  secureTextEntry={true} onChangeText={(text) => _this.setState({yesPassExpert:text})} value={_this.state.yesPassExpert}/>
                      </View>

                       <View style={styles.label}>
                            <Text style={styles.text}>单位</Text>
                            <TextInput underlineColorAndroid="transparent" style={{flex:1}}
                            onChangeText={(text) => _this.setState({hospitalExpert:text})}
                             value={_this.state.hospitalExpert}/>
                         <Image source={require('../../images/register-icon.png')} style={styles.regicon}/>
                       </View>

                       <TouchableOpacity style={styles.label} onPress={()=>_this.onShowModal()}>
                             <Text style={styles.text}>学科</Text>
                             <View style={styles.depart}><Text style={styles.text_d} numberOfLines={1}>{_state.departmentExpert?_state.departmentExpert.length?_state.departmentExpert.join("、"):null:null}</Text></View>
                           <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                       </TouchableOpacity>

                         <View style={styles.label}>
                            <Text style={styles.text}>头衔</Text>
                           <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text) => _this.setState({titleExpert:text})} value={_this.state.titleExpert}/>
                        </View>
                          <TouchableOpacity style={styles.button} onPress={_this.regisite.bind(_this)}>
                                <Text>完成</Text>
                            </TouchableOpacity>

                        <TouchableOpacity onPress={()=>_this.props.navigation.navigate("Login",{Register:true})} style={styles.direclogin}>
                                <Text style={[styles.regtext,{color:color.font1C,marginRight:8}]}>已注册</Text>
                                <Text style={styles.regtext}>直接登录</Text>
                        </TouchableOpacity>
                        </View>
                    </ScrollView>

                    )
                     :
                    (
                        <ScrollView style={{flex:1}}>
                          <View style={{flex:1,alignItems:"center"}}>
                            <View style={styles.btngroup}>
                                <TouchableOpacity style={styles.btngeneral}>
                                    <Text style={[styles.text,{color:color.back1C}]}>普通用户</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => _this.setState({showModal:true,type:'expert',})} style={styles.btnexpert}>
                                    <Text style={[styles.text,{color:color.main1C}]}>专家用户</Text>
                                </TouchableOpacity>
                            </View>

                             <View style={styles.label}>
                                <Text style={styles.text}>昵称</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}} maxLength = {20} onChangeText={(text) => _this.setState({nameGeneral:text})}
                                value={_this.state.nameGeneral}/>
                            </View>

                            <View style={styles.label}>
                                <Text style={styles.text}>性别</Text>
                                <ModalDropdown style={{flex:1,paddingLeft:30*width/750}} options={['男', '女']} dropdownStyle={{width:width-30*width/750-71,alignItems:"center",height:200*width/750}} onSelect={(index,value)=>_this.selectSex(index,value)} dropdownTextStyle={{fontSize:15,borderBottomWidth:0.5,width:width-30*width/750-71,height:100*width/750}} defaultValue="请选择性别" textStyle={{fontSize:15}}/>

                          {/*  <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={_this.sexChange.bind(_this)} value={_this.state.sexExpert}/>*/}
                                <Image source={require('../../images/register-icon.png')} style={styles.regicon}/>
                                </View>

                            <View style={styles.label}>
                                <Text style={styles.text}>手机号</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text) => _this.setState({telGeneral:text})}
                                value={_this.state.telGeneral}/>
                            </View>

                            <View style={styles.label}>
                                <Text style={styles.text}>手机验证码</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text) => _this.setState({telCodeGeneral:text})}
                                value={_this.state.telCodeGeneral}/>
                                <TouchableOpacity style={styles.getnumbtn} onPress={() => _this.getRandNum()}>
                                    <Text style={styles.getnumtext}>{_this.state.randNumGeneral}</Text>
                                </TouchableOpacity>
                             </View>

                            <View style={styles.label}>
                                <Text style={styles.text}>设置密码</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}}  secureTextEntry={true} onChangeText={(text) => _this.setState({passGeneral:text})} value={_this.state.passGeneral}/>
                            </View>
                            <View style={styles.label}>
                                <Text style={styles.text}>确认密码</Text>
                                <TextInput underlineColorAndroid="transparent" style={{flex:1}}  secureTextEntry={true} onChangeText={(text) => _this.setState({yesPassGeneral:text})} value={_this.state.yesPassGeneral}/>
                            </View>

                            <TouchableOpacity style={styles.button} onPress={()=>_this.regisite()}>
                              <Text>完成</Text>
                            </TouchableOpacity>

                        <TouchableOpacity onPress={()=>_this.props.navigation.navigate("Login",{Register:true})} style={styles.direclogin}>
                                <Text style={[styles.regtext,{color:color.font1C,marginRight:8}]}>已注册</Text>
                                <Text style={styles.regtext}>直接登录</Text>
                        </TouchableOpacity>
                          </View>
                        </ScrollView>)
                      }
                {_state.sectionList.length?<List {...ListModalProps}/>:null}
                </View>
        )
    }
}
