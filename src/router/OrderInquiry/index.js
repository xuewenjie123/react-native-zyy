'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,DeviceEventEmitter,TextInput,ListView,Text,ScrollView,ToastAndroid,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import OrderModal from  '../../components/common/ModalCancel';
import YesModal from '../../components/common/ModalYes';
import NavWait from '../../components/common/NavWait';
import {getOrderList,confirmAddress,cancelOrder} from '../../service/orderInquiry';
import { date2str}  from '../../constant/constants';
export default class OrderInquiry extends Component {
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
        dataSource:ds,
        loading:true,
        types:"all",
        shipmentState:"",
        payState:"",
        state:"",
        list:[],
        visible:false,
        display:false,
        id_:"",
        YesId:""
        };
     }

     componentDidMount(){
      this.scription = DeviceEventEmitter.addListener("changeOrderInquiryUI",function(){
        getOrderList(_state.types,_this.resultFu)
      })
       getOrderList(_state.types,_this.resultFu)
     }
     componentWillUnmount(){
      this.scription.remove()
    }

     resultFu(result){

       if(result.httpCode==200){
          _this.setState({
              dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.myOrderList),
              list:result.myOrderList,
          })

          if(!result.myOrderList.length){
            _this.setState({
              loading:false
            })
          }
       }else{
         _this.setState({
           loading:false
         })
       }
     }

     _cancelOrder(){
       _this.setState({
         visible:false
       })
       var resultFu=function(result){
         if(result.httpCode==200){
           ToastAndroid.show("取消成功",ToastAndroid.SHORT)
            getOrderList(_this.state.types,_this.resultFu)
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

     getData(type){
       _this.setState({
         loading:true,
         list:[],
       })
        getOrderList(type,_this.resultFu)
       }

     changeData(type){
       _this.setState({
         types:type
       })
       _this.getData(type);
     }

     renderNoneView(){
       return(
            <View style={styles.noneGoods}>
              <Image source={require('../../images/order_none.png')} style={styles.none_img} />
              <Text style={styles.finsh_text}>目前还没有订单</Text>
           </View>
       )
     }

     countSum(list){
       var count=0;
        for(var i=0;i<list.length;i++){
            count+=list[i].number;
        }
      return count+"件";
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
             getOrderList(_this.state.types,_this.resultFu)
         }
       }
       confirmAddress(_this.state.YesId,resultFu)
     }

     showBtnChange(cart){
       switch (cart.state) {
         case 0:
            switch (cart.payState) {
              case 0:
                    return (
                      <TouchableOpacity style={styles.footRight} onPress={()=>_navigator.navigate('OrderPay',{orderId:cart.id,OrderInquiry:true})}>
                            <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                            <Text style={styles.yes_text}>去支付</Text>
                      </TouchableOpacity>
                    )
                    break;
              case 1:
                    switch (cart.shipmentState) {
                      case 1:
                          return (
                            <TouchableOpacity style={styles.footRight} onPress={()=>_this.showYes(cart.id)}>
                                  <Image source={require('../../images/small_yes.png')} style={styles.yes_btn} />
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
                            <TouchableOpacity style={styles.footRight} disabled={true}>
                                  <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                  <Text style={styles.yes_text}>已确认</Text>
                            </TouchableOpacity>
                          )
                      default:
                        let j=false;
                        for(let i=0;i<cart.orderDetails.length;i++){
                          if(cart.orderDetails[i].isVirtual){
                              j=true
                          }
                        }
                          if(j){
                            return (
                              <TouchableOpacity style={styles.footRight} disabled>
                                    <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                    <Text style={styles.yes_text}>待发货</Text>
                              </TouchableOpacity>
                            )
                          }else{
                            return (
                              <TouchableOpacity style={styles.footRight} onPress={()=>{_this._cancelYes(cart.id)}}>
                                    <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                                    <Text style={styles.yes_text}>取消订单</Text>
                              </TouchableOpacity>
                            )
                          }

                      }
                  break;
              case 2:
                return (
                  <TouchableOpacity style={styles.footRight} disabled={true}>
                        <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                        <Text style={styles.yes_text}>已退款</Text>
                  </TouchableOpacity>
                )
                break;
              default:
                return null

             }
           break;
         case 1:
              if(cart.payState==2){
                return (
                  <TouchableOpacity style={styles.footRight} disabled={true}>
                        <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                        <Text style={styles.yes_text}>已退款</Text>
                  </TouchableOpacity>
                )
              }else{
                return (
                  <TouchableOpacity style={styles.footRight} disabled={true}>
                        <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                        <Text style={styles.yes_text}>已完成</Text>
                  </TouchableOpacity>
                )
              }
           break;
         case 2:
           return (
             <TouchableOpacity style={styles.footRight} disabled={true}>
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
             <TouchableOpacity style={styles.footRight} disabled={true}>
                   <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                   <Text style={styles.yes_text}>售后中</Text>
             </TouchableOpacity>
           )
           break;

         default:
         return null

       }
     }



     _renderRow(list){

        return(
          <View style={styles.label_box}>
                 <View style={[styles.labels,{justifyContent:"space-between",height:36,alignItems:"center"}]}>
                   <Text style={styles.textGenneral}>订单编号:{list.orderNo}</Text>
                   <Text style={styles.textGenneral}>下单时间:{date2str(new Date(list.createTime.replace(/\-/g, "/")),"yyyy.MM.dd")}</Text>
                 </View>

                 <TouchableOpacity onPress={()=>{_navigator.navigate('OrderInfo',{id:list.id})}}>
               {
                 list.orderDetails.map((item,index)=>(
                   <View key={index} style={styles.orderRow}>
                     <View style={[styles.labels,{paddingTop:10,height:91,}]}>
                           <View style={styles.listLeft}>

                               <Image source={{uri:item.product.imgUrl}} style={styles.return_img}/>
                           </View>
                           <View style={styles.listRight}>

                                 <Text style={styles.name_text} numberOfLines={1}>{item.product.goodsName}{item.product.name}</Text>
                                 <Text style={[styles.textGenneral,{paddingTop:6}]} numberOfLines={2}>{item.product.goodsDes.replace(/[\r\n]/g,'')}</Text>
                               <View style={[styles.goods_info,{paddingTop:7}]}>
                                     <Text style={styles.textGenneral}>×{item.number+''}</Text>
                                     <Text style={styles.textPrice}>￥{item.totalAmount+""}</Text>
                                 </View>
                           </View>
                     </View>
                   </View>
                 ))
               }
               </TouchableOpacity>

                 <View style={[styles.labels,{justifyContent:"space-between",height:53,alignItems:"center"}]}>
                   <Text style={styles.f_text}>共计{_this.countSum(list.orderDetails)}件商品 合计{list.isVirtual?list.amount:list.totalAmount}元
                   </Text>
                   {_this.showBtnChange(list)}
                 </View>
          </View>
        )
      }
      onCloseModal(){
        _this.setState({
          visible:false,
          display:false
        })
      }

     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state=this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "订单查询",
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
       let OrderModalProps={
         visible:_state.visible,
         _navigator:_navigator,
         closeModal:function(){
           _this.onCloseModal()
         },
         _cancelOrder:function(){
           _this._cancelOrder()
         }
       };
       let YesModalProps = {
         display:_state.display,
         _navigator:_navigator,
         closeModal:function(){
           _this.onCloseModal()
         },
         _orderYes:function(){
           _this._orderYes()
         }
       };
       return(
         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         <View style={styles.order_header}>
            <TouchableOpacity style={[styles.info_btn,_state.types=='all'?styles.active:null]} onPress={()=>this.changeData('all')}>
              <Text style={[styles.orders_text,_state.types=='all'?styles.activeText:null]}>全部</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.info_btn,_state.types=='willPay'?styles.active:null]} onPress={()=>this.changeData('willPay')}>
              <Text style={[styles.orders_text,_state.types=='willPay'?styles.activeText:null]}>待付款</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.info_btn,_state.types=='paid'?styles.active:null]} onPress={()=>this.changeData('paid')}>
              <Text style={[styles.orders_text,_state.types=='paid'?styles.activeText:null]}>已付款</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.info_btn,_state.types=='willRecevid'?styles.active:null]} onPress={()=>this.changeData('willRecevid')}>
              <Text style={[styles.orders_text,_state.types=='willRecevid'?styles.activeText:null]}>待收货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.info_btn,_state.types=='Recevid'?styles.active:null]} onPress={()=>this.changeData('Recevid')}>
              <Text style={[styles.orders_text,_state.types=='Recevid'?styles.activeText:null]}>已完成</Text>
            </TouchableOpacity>
         </View>
            {
              _state.list.length?
               <ListView
                dataSource={_state.dataSource}
                renderRow={_this._renderRow.bind(_this)}
                initialListSize={10}
                enableEmptySections={true}
              />
              :_state.loading?<NavWait/>:this.renderNoneView()

            }
              <OrderModal {...OrderModalProps}/>
              <YesModal {...YesModalProps}/>
        </View>
       )
     }

   }
