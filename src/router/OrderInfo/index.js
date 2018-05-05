'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,DeviceEventEmitter,ListView,ScrollView,ToastAndroid,Text,BackHandler} from 'react-native';
import NavWait from '../../components/common/NavWait';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import OrderModal from  '../../components/common/ModalCancel';
import YesModal from '../../components/common/ModalYes';
import {getShipment,getAddress,confirmAddress,cancelOrder,getOrder} from '../../service/orderInquiry';
import { date2str, }  from '../../constant/constants';
import { NavigationActions } from 'react-navigation';

export default class OrderInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address:"",
        orderState:{},
        show:false,
        shipmentInfo:{shipmentTime:false},
        hasProviduco:false,
        visible:false,
        id_:"",
        id:this.props.navigation.state.params.id,
        display:false
        };
     }

     countSum(list){
       var count=0;
        for(var i=0;i<list.length;i++){
            count+=list[i].number;
        }
      return count;
     }
     showShipMent(){
       switch (_state.list.state) {
         case 0:
              if(_state.list.payState==0){
                  return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>待支付</Text></View>)
              }else if(_state.list.payState==1){
                  switch (_state.list.shipmentState) {
                    case 0:
                      return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>待发货</Text></View>)
                      break;
                    case 2:
                      return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>待发货</Text></View>)
                      break;
                    case 4:
                      return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已完成</Text></View>)
                      break;
                    default:
                      return null
                  }
              }else if(_state.list.payState==2){
                return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已退款</Text></View>)
              }
           break;
         case 1:
            if(_state.list.payState==2){
              return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已退款</Text></View>)
            }else{
              return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已完成</Text></View>)
            }
           break;
         case 2:
             return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已作废</Text></View>)
           break;
         case 3:
            return (<View style={styles.orderNoState}><Text style={styles.orderNoText}>已取消</Text></View>)
           break;
         default:
         return null
       }
     }

     orderResult(result){
       if(result.httpCode==200){
          getAddress(result.orderVo.addressId,_this.addressResult)      
          getShipment(result.orderVo.id,_this.shipResult)
          _this.setState({
            list:result.orderVo
          })
          console.log("----------------------------------")
          console.log(result.orderVo)
          var orderDetails=result.orderVo.orderDetails;
          for(let i=0;i<orderDetails.length;i++){
             if(orderDetails[i].isVirtual){
               _this.setState({
                   hasProviduco:true
               })
             }
          }
          if((result.orderVo.state==4)||(result.orderVo.state==0&&result.orderVo.payState==1&&(result.orderVo.shipmentState==1||result.orderVo.shipmentState==3))){
            //getShipment(_state.list.id,_this.shipResult)
            _this.setState({
              show:true,
            })
         }
       }
     }
     componentDidMount(){
       getOrder(_state.id,_this.orderResult)
       console.log('====================================')
     }




     shipResult(result){
       if(result.httpCode==200){
          //显示正在配送  和快递方式  快递单号
          console.log("-------------");
          console.log(result);
          _this.setState({
            //show:true,
            shipmentInfo:result.orderShipment
          })
       }
     }
     addressResult(result){
       if(result.httpCode==200){
         _this.setState({
           address:result.address
         })
       }
    }


     showYes(id){
       _this.setState({
         display:true,
         YesId:id
       })
     }

     _orderYes(){
       _this.setState({
         display:false
       })
       var resultFu=function(result){
         if(result.httpCode==200){
            var list=_state.list;
            list.shipmentState=4;
            list.state=1;
            _this.setState({
              list:list
            })
           _navigator.goBack()
           DeviceEventEmitter.emit("changeOrderInquiryUI")
         }
       }
       confirmAddress(_state.YesId,resultFu)
     }

     _cancelOrder(){
       _this.setState({
         visible:false
       })
       var resultFu=function(result){
         if(result.httpCode==200){
           var list=_state.list;
           list.state=3;
           _this.setState({
             list:list
           })
           ToastAndroid.show("取消成功",ToastAndroid.SHORT)
           _navigator.goBack()
           DeviceEventEmitter.emit("changeOrderInquiryUI")
         }
       }
       cancelOrder(_state.id_,resultFu)
     }

     _cancelYes(id){
       _this.setState({
         visible:true,
         id_:id
       })
     }
     showBtnChange(cart){
       switch (cart.state) {
         case 0:
            switch (cart.payState) {
              case 0:
                    return (
                      <View style={{flex:1,width:width,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity style={[styles.footRight,{marginRight:10}]}  onPress={()=>_navigator.navigate('OrderPay',{orderId:_state.list.id,OrderInquiry:true})}>
                              <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                              <Text style={styles.yes_text}>去支付</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footRight} onPress={()=>{_this._cancelYes(cart.id)}}>
                              <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                              <Text style={styles.yes_text}>取消订单</Text>
                        </TouchableOpacity>
                      </View>
                    )
                    break;
              case 1:
                    switch (cart.shipmentState) {
                      case 1:
                          return (
                            <TouchableOpacity style={styles.footRight} onPress={()=>_this.showYes(cart.id)}>
                                  <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                  <Text style={styles.yes_text}>确认收货</Text>
                            </TouchableOpacity>
                          )
                          break;
                      case 3:
                        return (
                          <TouchableOpacity style={styles.footRight}>
                                <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                <Text style={styles.yes_text}>退货</Text>
                          </TouchableOpacity>
                        )
                        break;
                      case 4:
                          return (
                            <TouchableOpacity style={styles.footRight}>
                                  <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                  <Text style={styles.yes_text}>已确认</Text>
                            </TouchableOpacity>
                          )
                          break;
                      default:
                              if(_state.hasProviduco){
                                return (
                                        <TouchableOpacity style={styles.footRight} onPress={()=>_navigator.goBack()}>
                                            <Text style={styles.yes_text}>返回上级</Text>
                                        </TouchableOpacity>
                                      )
                              }else{
                                return (
                                  <TouchableOpacity style={styles.footRight} onPress={()=>_this._cancelYes(cart.id)}>
                                        <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                        <Text style={styles.yes_text}>取消订单</Text>
                                  </TouchableOpacity>
                                )
                              }

                      }
                  break;
              case 2:
                return (
                  <TouchableOpacity style={styles.footRight}>
                        <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                        <Text style={styles.yes_text}>已退款</Text>
                  </TouchableOpacity>
                )
                break;
              default:
                return  (
                          <TouchableOpacity style={styles.footRight} onPress={()=>_navigator.goBack()}>
                              <Text style={styles.yes_text}>返回上级</Text>
                          </TouchableOpacity>
                        )

            }
           break;
         case 1:
             if(cart.payState==2){
               return (
                 <TouchableOpacity style={styles.footRight} disabled>
                       <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                       <Text style={styles.yes_text}>已退款</Text>
                 </TouchableOpacity>
               )
             }else{
               return (
                 <TouchableOpacity style={styles.footRight} disabled>
                       <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                       <Text style={styles.yes_text}>已完成</Text>
                 </TouchableOpacity>
               )
             }
           break;
         case 2:
           return (
             <TouchableOpacity style={styles.footRight} disabled>
                   <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                   <Text style={styles.yes_text}>已作废</Text>
             </TouchableOpacity>
           )
           break;
         case 3:
           return (
             <TouchableOpacity style={styles.footRight} disabled={true}>
                   <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                   <Text style={styles.yes_text}>已取消</Text>
             </TouchableOpacity>
           )
           break;
         case 4:
           return (
             <TouchableOpacity style={styles.footRight} disabled>
                   <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                   <Text style={styles.yes_text}>售后中</Text>
             </TouchableOpacity>
           )
           break;

         default:
         return null

       }

     }
     itemOrder(list){
        if(list.state==0&&list.payState==1&&list.shipmentState==1&&!list.product.isVirtual){
          return (
            <TouchableOpacity style={styles.afterService} onPress={()=>_navigator.navigate("ReturnOrder",{list:list})}>
              <Text style={styles.afterText}>售后</Text>
            </TouchableOpacity>
          )
        }else{
          return null
        }
     }
     onCloseModal(){
       _this.setState({
         visible:false,
         display:false,
       })
     }
     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state=this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "订单详情 ",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_navigator.goBack();}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       let OrderModalProps={
         visible:_state.visible,
         _navigator:_navigator,
         closeModal:function(){
           _this.onCloseModal()
         },
         _cancelOrder:function(){
           _this._cancelOrder()
         }
       }
       let YesModalProps = {
         display:_state.display,
         _navigator:_navigator,
         closeModal:function(){
           _this.onCloseModal()
         },
         _orderYes:function(){
           _this._orderYes()
         }
       }
       console.log(_state.list)
       return(
         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>
        {_state.list?
          <ScrollView>
            {_state.show?
             <View style={[styles.label_box,{marginTop:0,height:56,paddingTop:5,paddingBottom:5,}]}>
                    <View style={[styles.labels,{justifyContent:"space-between"}]}>

                          <View style={styles.giveState}>
                              <Image source={require('../../images/Distribution_icon.png')} style={styles.Distribution_icon}/>
                              <View style={styles.giveInfo}>
                                    <Text style={styles.headText}>{"物流信息"}</Text>
                                    <Text style={styles.headText}>快递单号：{_state.shipmentInfo.expressNumber}</Text>
                              </View>
                          </View>

                          <Text style={styles.headText}>{_state.shipmentInfo.expressCompany}</Text>
                    </View>
             </View>:null}
             {!_state.list.isVirtual?
               (<View>
                 {_this.showShipMent()}
                <View style={[styles.label_box,{marginTop:0,}]}>

                         <View style={[styles.labels,{justifyContent:"space-between",position:"relative"}]}>
                             <Image source={require('../../images/place_icon.png')} style={styles.adress_icon}/>
                             <View style={styles.right_head}>
                                 <View style={styles.r_head_t}>
                                     <Text style={styles.headText}>收件人：{_state.address?_state.address.name:null}</Text>
                                     <Text style={styles.headText}>电话：{_state.address?_state.address.phone.substring(0,3)+"***"+_state.address.phone.slice(-4):null}</Text>
                                 </View>
                                 <View style={styles.adress_info_box}>
                                   <Text style={[styles.headText,{lineHeight:16}]}>收货地址：{_state.address?_state.address.provinceName:null}{_state.address?_state.address.cityName:null}{_state.address?_state.address.countyName:null}{_state.address?_state.address.detail:null}</Text>
                                 </View>
                           </View>
                         </View>
                </View>
            </View>):null}


             <View style={styles.label_box}>

                    <View style={[styles.labels,{justifyContent:"space-between",height:36,alignItems:"center"}]}>
                      <Text style={styles.textGenneral}>订单编号：{this.state.list.orderNo}</Text>
                    </View>

                  {
                    this.state.list.orderDetails.map((item,index)=>(
                      <View key={index} style={styles.orderRow}>
                        <View style={[styles.labels,{paddingTop:10,height:100,}]}>
                              <View style={styles.listLeft}>
                                  <Image source={{uri:item.product.imgUrl}} style={styles.return_img}/>
                              </View>
                              <View style={styles.listRight}>
                                <View style={styles.goods_info}>
                                    <Text style={styles.name_text}>{item.product.goodsName}</Text>
                                    <Text style={styles.textPrice}>￥{item.totalAmount}</Text>
                                </View>

                                  <Text style={[styles.textGenneral,{paddingTop:6}]} numberOfLines={2}>{item.product.goodsDes.replace(/[\r\n]/g,'')}</Text>
                                  <View style={[styles.goods_info,{paddingTop:7,}]}>
                                        <Text style={styles.textGenneral}>×{item.number}</Text>
                                        {_this.itemOrder(item)}
                                    </View>
                              </View>
                        </View>
                      </View>
                    ))
                  }

                    <View style={[styles.labels,{height:26}]}>
                      <Text style={styles.f_text}>共计{_this.countSum(_this.state.list.orderDetails)}件商品 合计{_this.state.list.amount}
                      </Text>
                    </View>

                    <View style={[styles.labels,{height:22,justifyContent:"space-between",}]}>
                        <Text style={styles.freightText_l}>运费</Text>
                        <Text style={styles.freightText_r}>￥{this.state.list.shipmentFee}元</Text>
                    </View>

                    <View style={[styles.labels,{justifyContent:"space-between",height:30}]}>
                        <Text style={styles.payText_l}>实付款</Text>
                        <Text style={styles.payText_r}>￥{this.state.list.totalAmount}</Text>
                    </View>

                  {/*
                     <View style={styles.tel_box}>
                      <Image source={require('../../images/tel_icon.png')} style={styles.tel_btn}/>
                      <Text style={styles.telBussText}>联系商家</Text>
                    </View>
                    */}
             </View>

             <View style={[styles.label_box,{height:77,justifyContent:"center",alignItems:"center"}]}>
                 <View style={styles.date_box}>
                  {_state.list.createTime?<Text style={styles.dateText}>创建时间：{date2str(new Date(_state.list.createTime.replace(/\-/g, "/")),"yyyy.MM.dd hh:mm:ss")}</Text>:null}
                  {_state.list.payTime?<Text style={styles.dateText}>付款时间：{date2str(new Date(_state.list.payTime.replace(/\-/g, "/")),"yyyy.MM.dd hh:mm:ss")}</Text>:null}
                  {_state.shipmentInfo?_state.shipmentInfo.shipmentTime?<Text style={styles.dateText}>发货时间：{date2str(new Date(_state.shipmentInfo.shipmentTime.replace(/\-/g, "/")),"yyyy.MM.dd hh:mm:ss")}</Text>:null:null}
                </View>
             </View>

             <View style={[styles.label_box,{justifyContent:"center",height:50,borderColor:"#dedbd7",borderTopWidth:1,borderBottomWidth:0,}]}>
              {_this.showBtnChange(_state.list)}
             </View>
              </ScrollView>
               :<NavWait/>}
              <OrderModal {...OrderModalProps}/>
              <YesModal {...YesModalProps}/>
        </View>
       )
     }
   }
