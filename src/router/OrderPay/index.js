'use strict';
import React, { Component, } from 'react';
import { ScrollView,View,Image,TouchableOpacity,StatusBar,Text,ToastAndroid,InteractionManager,BackHandler} from 'react-native';
import color from './../../constant/color';
var styles =require('./styles');
import *as wechat from 'react-native-wechat'
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import {getStorage,setStorage,removeStorage} from '../../constant/storage';
var _this,_navigator,_state;
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import { NavigationActions } from 'react-navigation';
import Alipay from 'react-native-yunpeng-alipay'
import {getWechatPay,getAlipay} from '../../service/pay'
import {getUserInfo,myInfo} from '../../service/mine';
export default class OrderPay extends Component {
    constructor(props) {
        super(props);
      this.state = {
          id:this.props.navigation.state.params.orderId,
      };
    }

  componentDidMount(){
         wechat.registerApp('your appid')
     }


     wechatPay(){
       var resultFu = function(result){
         if(result.httpCode==200){
             wechat.isWXAppInstalled()

              .then( ( isInstalled ) => {

                   if ( isInstalled ) {
                     wechat.pay({
                       partnerId: '',  // 商家向财付通申请的商家id
                       prepayId: '',   // 预支付订单
                       nonceStr: '',   // 随机串，防重发
                       timeStamp: '',  // 时间戳，防重发
                       package: '',    // 商家根据财付通文档填写的数据和签名
                       sign: ''        // 商家根据微信开放平台文档对数据做的签名
                   }).then(()=>{ToastAndroid.show( '您已经下载微信' ,ToastAndroid.SHORT);}).catch(()=>{ToastAndroid.show( '失败了' ,ToastAndroid.SHORT);})
                   } else {
                     ToastAndroid.show( '没有安装微信软件，请您安装微信之后再试' ,ToastAndroid.SHORT);
                   }
               } );
         }
       }
       getWechatPay(_state.id,resultFu)

     }
     zfbPay(){

         var resultFu=function(response){
           if(response.httpCode==200){
               Alipay.pay(response.aliResponse).then(result => {
                 console.log("result is ", result);
                 })
                 .catch(error => {
                 console.log(error);

                 });
           }
         }

         getAlipay(_state.id,resultFu)


      }

      onpushRouter(){
        if(_this.props.navigation.state.params.cartInfo){
          let id = this.props.navigation.state.params.cartInfo[0].id_;
          let type = this.props.navigation.state.params.cartInfo[0].type;
          const resetAction1 = NavigationActions.reset({
            index:1,
            actions:[
              NavigationActions.navigate({routeName: 'Boutique'}),
             NavigationActions.navigate({routeName: 'BookDetail', params:{bookId:id}}),
           ]
          })
          const resetAction2 = NavigationActions.reset({
            index:1,
            actions:[
              NavigationActions.navigate({routeName: 'Boutique'}),
             NavigationActions.navigate({routeName: 'AudioRecom', params:{audioId:id}})
           ]
          })
          const resetAction3 = NavigationActions.reset({
            index:1,
            actions:[
              NavigationActions.navigate({routeName: 'Boutique'}),
             NavigationActions.navigate({routeName: 'VideoInfo', params:{videoId:id}}),
           ]
          })
          const resetAction4 = NavigationActions.reset({
            index:1,
            actions:[
              NavigationActions.navigate({routeName: 'Boutique'}),
             NavigationActions.navigate({routeName: 'ShoppingCart', params:{OrderPay:true}})
           ]
          })

          console.log(this.props.navigation.state.params.cartInfo[0].type);
          if(this.props.navigation.state.params.cartShop){
            _navigator.dispatch(resetAction4)
          }else{
            switch (type) {
              case 1:
               _navigator.dispatch(resetAction1)
                break;
              case 2:
                _navigator.dispatch(resetAction2)
                break;
              case 3:
                _navigator.dispatch(resetAction3)
                break;
              default:
                _navigator.dispatch(resetAction4)
            }
          }
        }else{
          const resetAction5 = NavigationActions.reset({
            index:1,
            actions:[
              NavigationActions.navigate({routeName: 'Mine'}),
             NavigationActions.navigate({routeName: 'OrderInquiry'})
           ]
          })
            _navigator.dispatch(resetAction5)
        }
      }

     render(){
       _this=this;
       _state=_this.state;
       _navigator=_this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "收银台",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.onpushRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
        <View style={styles.main}>
                  <NavigatorTopBar {...NavigatorTopBarProps}/>
                  <ScrollView style={styles.que_box}>
                      <View style={styles.query_t}>
                            <TouchableOpacity style={styles.label} onPress={()=>_this.wechatPay()}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/wechat.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>微信支付</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.label,{borderBottomWidth:0}]} onPress={() => _this.zfbPay()}>
                                <View style={styles.order_qy}>
                                  <Image source={require('../../images/zfbclick.png')} style={styles.mine_icon_l}/><Text style={styles.order_text}>支付宝支付</Text>
                                </View>
                                <Image source={require('../../images/register-icon.png')} style={styles.mine_icon_r}/>
                            </TouchableOpacity>

                            <View style={{padding:20}}>
                              <Text>请选择您的支付方式</Text>
                            </View>
                      </View>


                  </ScrollView>

            </View>

       )
     }
   }
