'use strict';
import React, { Component, } from 'react';
import { View,Image,DeviceEventEmitter,TouchableOpacity,TextInput,ListView,ToastAndroid,ScrollView,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import {queryAddress,selectAddress} from '../../service/address';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {selectDefault,addOrder} from '../../service/ConfirmOrder';
import ListModalWrite from './list'
import {NavigationActions} from 'react-navigation';
export default class ConfirmOrder extends Component {
  constructor(props){
    super(props);
      var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state={
        dataSource: ds.cloneWithRows(this.props.navigation.state.params.cartInfo),
        shopInfo:this.props.navigation.state.params.cartInfo,
        orderInfo:[],
        yunPrice:"免运费",
        visible:false,
        talkContent:"",
        shipmentFee:0,
        idInfo:0,
        haveAddress:true,
        show:true
      }
  }

  _onSubmit(){
    var resultFu = function(response){
          if(response.httpCode ==  200){
            if(_this.props.navigation.state.params.shopCart){
                _navigator.navigate('OrderPay',{orderId:response.orderId,cartInfo:_state.shopInfo,cartShop:true})
            }else{
              _navigator.navigate('OrderPay',{orderId:response.orderId,cartInfo:_state.shopInfo})
            }

          }else{
            ToastAndroid.show("订单提交异常，请稍后再试",ToastAndroid.SHORT)
          }
      }
    var json={};
    if(_this.props.navigation.state.params.shopCart){
      json.cartIds=[];
      for(let i=0;i<_state.shopInfo.length;i++){
        json.cartIds.push(_state.shopInfo[i].id)
      }
    }
    json.addressId=_state.orderInfo.id;
    json.payType=0;
    json.des=_state.talkContent;
    json.orderDetails=[];
    json.shipmentFee=_state.shipmentFee;
    json.isVirtual=_state.shopInfo[0].isVirtual;
    for(let i=0;i<_state.shopInfo.length;i++){
    json.orderDetails.push({number:_state.shopInfo[i].number,isVirtual:_state.shopInfo[i].isVirtual,productId:_state.shopInfo[i].productId})
    }
    if(_state.shopInfo[0].isVirtual===false){
      if(!_state.orderInfo.id){
        ToastAndroid.show("请添加地址",ToastAndroid.SHORT)
        return false
      }
    }
    addOrder(json,resultFu)
  }
  componentDidMount(){
    if(this.props.navigation.state.params.talkContent){
      this.setState({
        talkContent:this.props.navigation.state.params.talkContent,
      })
     }
     console.log(_state.shopInfo);
   BackHandler.addEventListener('hardwareBackPress', function(){DeviceEventEmitter.emit("changeShoppingCartUI")});
  // console.log(this.props.navigation.state.params.cartInfo);
    if(this.props.navigation.state.params.show===false){
      let listCart = _state.shopInfo
          listCart[0].productId=listCart[0].id_;
          listCart[0].number=1;
          listCart[0].isVirtual=true
        _this.setState({
          show:false,
          shopInfo:listCart
        })
    }
    if(_state.shopInfo[0].isVirtual){
      _this.setState({
        show:false,
      })
    }
    let PriceNum=0;
    var resultFu=function(result){
      if(result.httpCode==200){
        if(result.address){
          console.log("+============")
          _this.setState({
            orderInfo:result.address,
            haveAddress:true,
            show:true
          })
        }else{
          _this.setState({
            haveAddress:false
          })
        }

      }

      for(var i = 0;i<_this.state.shopInfo.length;i++){
          PriceNum+=_this.state.shopInfo[i].price*_this.state.shopInfo[i].number
      }

      if(_this.state.shopInfo[0].isVirtual){
        _this.setState({
          shipmentFee:0
        })
        return false
      }
      if(_this.to1(PriceNum)*1>=99){
        if(_state.orderInfo.provinceId==27||result.address.provinceId==32||result.address.provinceId==4000||result.address.provinceId==5000||result.address.provinceId==6000){
          _this.setState({
            shipmentFee:result.address.shipmentFee?parseFloat(result.address.shipmentFee):0
          })
        }else{
          _this.setState({
            shipmentFee:0
          })
        }
      }else{
        _this.setState({
          shipmentFee:result.address?result.address.shipmentFee?parseFloat(result.address.shipmentFee):0:0
        })
      }
    }

    this.subscriptAdd= DeviceEventEmitter.addListener("changeConfirmOrderUI",function(json){//注册
      selectAddress(json.id,resultFu)
      _this.setState({
        idInfo:json.index
      })
    }) 
    selectDefault({},resultFu)
  }
  componentWillUnmount(){
    this.subscriptAdd.remove()
  }



  to1(num){
        return ''+Math.round(num * 100) / 100
  }
  sumNumeber(){
    var sumNumber=0;
    for(var i = 0;i<_this.state.shopInfo.length;i++){
        sumNumber+=(_this.state.shopInfo[i].number)*1
    }
    return sumNumber;
  }
  songWay(){
    var PriceNum=0;
    if(_this.state.shopInfo[0].isVirtual){
      return "运费0元"
    }
    for(var i = 0;i<_this.state.shopInfo.length;i++){
        PriceNum+=_this.state.shopInfo[i].price*_this.state.shopInfo[i].number
    }

    if(_this.to1(PriceNum)>=99){
        if(_state.orderInfo.provinceId==27||_state.orderInfo.provinceId==32||_state.orderInfo.provinceId==4000||_state.orderInfo.provinceId==5000||_state.orderInfo.provinceId==6000){
            return "运费"+(_state.orderInfo.shipmentFee?parseFloat(_state.orderInfo.shipmentFee):0)+"元";
          }
      return "免运费"
    }else{
      return "运费"+(_state.orderInfo.shipmentFee?parseFloat(_state.orderInfo.shipmentFee):0)+"元"
    }
  }

  sumPrice(){
    var PriceNum=0;
    for(var i = 0;i<_this.state.shopInfo.length;i++){
        PriceNum+=_this.state.shopInfo[i].price*_this.state.shopInfo[i].number
    }
      if(_state.shopInfo[0].isVirtual) {
          return  _this.to1(PriceNum)*1+"元"
      }

    if(_this.to1(PriceNum)*1>=99){
      if(_state.orderInfo.provinceId){
        if(_state.orderInfo.provinceId==27||_state.orderInfo.provinceId==32||_state.orderInfo.provinceId==4000||_state.orderInfo.provinceId==5000||_state.orderInfo.provinceId==6000){
          return _this.to1(PriceNum)*1+(_state.orderInfo.shipmentFee?parseFloat(_state.orderInfo.shipmentFee):0);
        }else{
          return  _this.to1(PriceNum)*1
        }
      }

    }else{
      return _this.to1(PriceNum)*1+(_state.orderInfo.shipmentFee?parseFloat(_state.orderInfo.shipmentFee):0);
    }
  }
  _renderRow(rowContent,sectionID,rowID){
    return(
      <View style={styles.label_box} key={rowID}>
          <Image source={{uri:rowContent.imgUrl}} style={{width:140*width/750,height:140*width/750,marginRight:10}}/>
          <View style={styles.rightRow}>
            <View style={styles.textGroup}>
               <Text style={styles.text4} numberOfLines={1}>{rowContent.goodsName}{rowContent.name}</Text>
               <Text style={styles.text5} numberOfLines={1}>{rowContent.goodsDes}</Text>
               <View style={styles.gorupText}>
                  <Text style={styles.footer_text2}>￥{rowContent.price}</Text>
                  <Text style={styles.text4}>×{rowContent.number}</Text>
               </View>
            </View>
          </View>
      </View>
    )
  }
  onpushRouter(){
    _navigator.navigate('SelectAddress',{cartInfo:this.props.navigation.state.params.cartInfo,idInfo:_this.state.idInfo,talkContent:_this.state.talkContent})
  }

  onBackRouter(){
    _navigator.goBack()
    DeviceEventEmitter.emit("changeShoppingCartUI")
    // if(_this.props.navigation.state.params.Collect){
    //   _navigator.goBack()
    // }
    // else{
    //   let id = this.props.navigation.state.params.cartInfo[0].id_;
    //   let type = this.props.navigation.state.params.cartInfo[0].type;
    //   const resetAction1 = NavigationActions.reset({
    //     index:1,
    //     actions:[
    //      NavigationActions.navigate({routeName: 'Boutique'}),
    //       NavigationActions.navigate({routeName: 'BookDetail', params:{bookId:id}})
    //    ]
    //   })
    //   const resetAction2 = NavigationActions.reset({
    //     index:1,
    //     actions:[
    //      NavigationActions.navigate({routeName: 'Boutique'}),
    //       NavigationActions.navigate({routeName: 'AudioRecom', params:{audioId:id}})
    //    ]
    //   })
    //   const resetAction3 = NavigationActions.reset({
    //     index:1,
    //     actions:[
    //      NavigationActions.navigate({routeName: 'Boutique'}),
    //       NavigationActions.navigate({routeName: 'VideoInfo', params:{videoId:id}})
    //    ]
    //   })
    //   const resetAction4 = NavigationActions.reset({
    //     index:1,
    //     actions:[
    //     NavigationActions.navigate({routeName: 'Boutique'}),
    //      NavigationActions.navigate({routeName: 'ShoppingCart', params:{OrderPay:true}})
    //    ]
    //   })
    //     switch (type) {
    //       case 1:
    //        _navigator.dispatch(resetAction1)
    //         break;
    //       case 2:
    //         _navigator.dispatch(resetAction2)
    //         break;
    //       case 3:
    //         _navigator.dispatch(resetAction3)
    //         break;
    //       default:
    //         _navigator.dispatch(resetAction4)
    //     }
    // }

  }

  onShowModal(){
    if(!_state.haveAddress){
      ToastAndroid.show("请先选择地址后留言",ToastAndroid.SHORT)
      return false
    }
    _this.setState({
      visible:true
    })
  }
  closeModal(text){
    _this.setState({
      visible:false,
      talkContent:text,
    })
  }
  render(){
    _this=this;
    _navigator=this.props.navigation;
    _state=this.state;
    let NavigatorTopBarProps = {
        visible: true,
        title: "确认订单",
        leftView: (
          <TouchableOpacity style={{flex: 1}}
            underlayColor='transparent'
            onPress={() => {_this.onBackRouter()}}>
            <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
              <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
            </View>
          </TouchableOpacity>
        ),
    };
    let ListModalProps = {
      visible:_state.visible,
      closeModal:function(text){_this.closeModal(text)}
    }
    return(
      <View style={styles.main}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <ScrollView style={styles.contents}>

    {_state.show?
      <View style={styles.addressInfo}>
            {
              _state.haveAddress
              ?
              <TouchableOpacity style={styles.addressInfo} onPress={()=>_this.onpushRouter()}>
                  <Image source={require('../../images/yesorder.png')} style={{width:width,height:36*width/750,}}/>
                  <View style={[styles.addressCenter,{alignItems:"flex-start",paddingTop:5,paddingRight:84*width/750,height:70*width/height}]}>
                      <Text style={styles.text1}>收件人：{_state.orderInfo.name}</Text>
                      <Text style={styles.text2}>{_state.orderInfo.phone}</Text>
                  </View>
                  <View style={styles.addressCenter}>
                      <Image source={require('../../images/place_icon.png')} style={{width:12,height:12}}/>
                      <View style={styles.textBox}>
                          <Text style={styles.text3} numberOfLines={2}>{_state.orderInfo.provinceName}{_state.orderInfo.cityName}{_state.orderInfo.countyName}{_state.orderInfo.detail}</Text>
                      </View>
                      <View style={styles.imgBox}>
                          <Image source={require('../../images/register-icon.png')} style={{width:23*width/750,height:21*width/750}}/>
                      </View>
                  </View>
                  <Image source={require('../../images/orderyes.png')} style={{width:width,height:36*width/750,position:"absolute",bottom:0,}}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>_this.onpushRouter()}>
                <Text style={{fontSize:18,marginTop:100*width/750,}} numberOfLines={1}>去添加收货地址</Text>
            </TouchableOpacity>
          }
    </View>  :
      null}

            <View style={styles.orderInfo}>
                <ListView
                  alwaysBounce={true}
                  dataSource={_this.state.dataSource}
                  renderRow={_this._renderRow.bind(_this)}
                  initialListSize={10}
                  style={{flex:1}}
                  contentContainerStyle={styles.container}
                />
                <View style={styles.bigBtnBox} underlayColor='transparent' onPress={() => {}}>
                  <View style={styles.btn_box}>
                    <Text style={styles.text4}>支付方式</Text>
                    <Text style={styles.textR}>在线支付</Text>
                  </View>
                </View>

                <View style={styles.bigBtnBox} underlayColor='transparent' onPress={() => {}}>
                  <View style={styles.btn_box}>
                    <Text style={styles.text4}>配送方式</Text>
                    <Text style={styles.textR}>{_this.songWay()}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.bigBtnBox} underlayColor='transparent' onPress={() => {_this.onShowModal()}}>
                  <View style={styles.btn_box}>
                    <Text style={styles.text4}>卖家留言</Text>
                    <Text style={[styles.textR,{marginLeft:30}]} numberOfLines={1}>{_state.talkContent}</Text>
                  </View>
                </TouchableOpacity>
            </View>
        </ScrollView>



        <View style={styles.footer_btn}>
            <View style={styles.gorupf}>
               <Text style={styles.footer_text1}>合计：</Text>
               <Text style={styles.footer_text2}>{_this.sumPrice()}</Text>
            </View>

            <View style={styles.gorupf}>
                <Text style={styles.footer_text1}>共{_this.sumNumeber()}件商品</Text>
                 <TouchableOpacity style={styles.finsh_btn} onPress={()=>{_this._onSubmit()}}>
                   <Text style={styles.footer_text3}>提交</Text>
                 </TouchableOpacity>
            </View>
            <ListModalWrite {...ListModalProps}/>
        </View>
      </View>
    )
  }
}
