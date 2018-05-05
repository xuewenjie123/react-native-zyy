'use strict';
import React, { Component, } from 'react';
import { ScrollView,View,Image,TouchableHighlight,TouchableOpacity,BackHandler,StatusBar,Text,ToastAndroid,InteractionManager} from 'react-native';
import color from './../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
var _this,_navigator,_state;
import { NavigationActions } from 'react-navigation';
import {getUserInfo,myInfo} from '../../service/mine';
var lastBackPressed;
export default class Mine extends Component {
    constructor(props) {
        super(props);
      this.state = {
          type:"general",
          id:false,
          imgurl: undefined,
          userName:"请登录",
          loginLoading:false
      };
    }


    componentWillMount(){
      var _this=this
      getStorage("login",function(error,data){
          if(data){
            _this.setState({
                id:data.userId,
                type:data.userType,
                loginLoading:true
            })
            InteractionManager.runAfterInteractions(() => {
              myInfo("",_this.myInfoResult);
            });
          }
      })
    }
    _onBackAndroid() {
      if (lastBackPressed&&lastBackPressed + 2000 >= new Date().getTime()){
            return false
      }
      lastBackPressed=new Date().getTime()
        // ToastAndroid.show('连按两次退出应用',ToastAndroid.SHORT);
        // return true
   }
   componentWillReceiveProps(newProps){
    console.log("=====================")
    console.log(newProps)
    console.log("=====================")
  }
    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress',_this._onBackAndroid)
      //  const resetAction = NavigationActions.reset({
      //    index: 1,
      //    actions: [
      //      NavigationActions.navigate({ routeName: 'EditData'}),
      //      NavigationActions.navigate({ routeName: 'EditPassWord'})
      //    ]
      //  })
      //  this.props.navigation.dispatch(resetAction)



      //  getUserInfo()
      //   getStorage("login",function(error,data){
      //     console.log(data)
      //       if(!data.userId){
      //         _navigator.navigate("Login")
      //       }
      //   })
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
     _NavgateRouter(str,id){
       getStorage("login",function(error,data){
           if(data){
             _navigator.navigate(str,id)
           }else {
             ToastAndroid.show('请先登录',ToastAndroid.SHORT)
            _navigator.navigate('Login',{mine:true})
           }
       })
     }
     onpushLogin(){
       getStorage("login",function(error,data){
           if(data){
             return false
           }else {
             _navigator.navigate('Login',{mine:true})
           }
       })
     }

     //接口方法   包含设定this.state
     render(){
       _this=this;
       _state=_this.state;
       _navigator=_this.props.navigation;
       return(
        <ScrollView contentContainerStyle={styles.main}>
              {/*<StatusBar
                translucent={true}
                backgroundColor={"transparent"}
                barStyle="dark-content"
              />*/}
              <View style={styles.header_bar}>
                  <Image source={require('../../images/mine_header_bg.png')} style={styles.hbar_bg}/>
                  <TouchableOpacity style={styles.hbar_setbtn} onPress={()=>_this._NavgateRouter('Setting',{id_:_state.id,imgurl:_state.imgurl,userName:_state.userName})}>
                      <Image source={require('../../images/set_icon.png')} style={styles.set_icon}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.title_center} onPress={()=>_this.onpushLogin()} underlayColor="transparent" disabled={_state.id?true:false}>
                    <View style={{alignItems:"center"}}>
                      <View style={styles.title_person}>
                        <View style={styles.title_boder}>
                           <Image source={_state.imgurl?{uri: _state.imgurl}:require('../../images/head_portrait.png')} style={styles.title_img}/>
                        </View>
                      </View>
                    <Text style={styles.person_text}>{_state.userName}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
              {
                this.state.type=="expert"
                ?
                (
                  <View style={styles.que_box}>
                      <View style={styles.query_t}>
                            <TouchableOpacity style={styles.label} onPress={()=>_this._NavgateRouter('Interrogation',{id_:_state.id,mine:true})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/my_questions.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>咨询问诊</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            

                            <TouchableOpacity style={styles.label} onPress={() =>_this._NavgateRouter('ConsultationMy',{id_:_state.id,mine:true})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/my_questions.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>我的提问</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() => {_this._NavgateRouter("FamousDetail",{id_:_state.id,mine:true})}}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/my_wzone.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>我的空间</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.label,{borderBottomWidth:0}]} onPress={() => _this._NavgateRouter('MyBooks',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/mine_books.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>我的书架</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>
                      </View>


                      <View style={styles.query_t}>
                            <TouchableOpacity style={styles.label} onPress={()=>_this._NavgateRouter('OrderInquiry',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/my_oder_inquiry.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>订单查询</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() => _this._NavgateRouter('CustomerService',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/Mine_Records.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>售后记录</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() =>_this._NavgateRouter('MyPoints',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/mine_query.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>积分查询</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() => _this._NavgateRouter('Collect',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/mine_space.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>收藏中心</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>
                            <View style={[styles.label,{borderBottomWidth:0}]}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/version_s.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>版本号1.00</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </View>

                      </View>
                  </View>
                )
                :
                (
                  <View style={styles.que_box}>

                      <View style={styles.query_t}>
                        <TouchableOpacity style={styles.label} onPress={() =>_this._NavgateRouter('ConsultationMy',{id_:_state.id,mine:true})}>
                            <View style={styles.order_qy}>
                              <Image source={require('../../images/my_questions.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>我的提问</Text>
                            </View>
                            <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.label,{borderBottomWidth:0}]} onPress={() => _this._NavgateRouter('MyBooks',{id_:_state.id})}>
                            <View style={styles.order_qy}>
                              <Image source={require('../../images/mine_books.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>我的书架</Text>
                            </View>
                            <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                        </TouchableOpacity>
                  </View>

                      <View style={styles.query_t}>
                            <TouchableOpacity style={styles.label} onPress={() => _this._NavgateRouter('OrderInquiry',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/my_oder_inquiry.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>订单查询</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() => _this._NavgateRouter('CustomerService',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/Mine_Records.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>售后记录</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.label} onPress={() =>_this._NavgateRouter('MyPoints',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/mine_query.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>积分查询</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.label,{borderBottomWidth:0}]} onPress={() => _this._NavgateRouter('Collect',{id_:_state.id})}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/mine_space.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>收藏中心</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>
                      </View>

                      <View style={styles.query_t}>
                            <TouchableOpacity style={styles.label} onPress={() =>_navigator.navigate('CallUs')}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/Mine_tel.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>联系我们</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <View style={[styles.label,{borderBottomWidth:0}]}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/version_s.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>版本号1.00</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </View>
                      </View>

                  
                      
                  </View>
                )

              }

            </ScrollView>

       )
     }
   }
