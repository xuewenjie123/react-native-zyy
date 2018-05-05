'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,DeviceEventEmitter,TextInput,ListView,ToastAndroid,Text,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import Lost from '../../components/common/Lost'
import NavWait from '../../components/common/NavWait';
import {queryAddress} from '../../service/address';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {deleteCartList,getCartList,addCart,getPlusNum,getReduceNum} from '../../service/boutique';
import { NavigationActions } from 'react-navigation';
  var addressInfo = [
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:1,},
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:12,},
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:13,},
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:14,},
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:15,},
    {imgurl: require('../../images/collect_book1.png'),title: "《齐民要术》图文精排版2017",section: "贾思勰",price: 36.9,number:1,id:16,},
  ];
var selCount=0;
export default class ShoppingCart extends Component {
    constructor(props) {
      super(props);
      var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
        dataSource: ds,
        loading:true,
        editAction:false,
        addressInfo:[],
        allShow:false,
        loadCart:true,
        cartList:true,
        repeat:true
        };
        this.select=[];
        this.subscriptAdd ="";
     }

     componentDidMount(){
      this.subscriptAdd= DeviceEventEmitter.addListener("changeShoppingCartUI",function(){
          getCartList({},_this.getCartListResult,_this.getFailResult)
       })
       getCartList({},_this.getCartListResult,_this.getFailResult)
     }
     componentWillUnmount(){
       this.subscriptAdd.remove()
     }
     getFailResult(){
       _this.setState({
         loadCart:false
       })
     }
     getCartListResult(result){

       if(result.httpCode==200){
         var list = result.cartList.map((d,index)=>{
           d.isShow=false;
           return d;
         })
          _this._setState(list)
          if(!result.cartList.length){
            _this.setState({
                cartList:false
            })
          }
       }else {
         _this.getFailResult()
       }
     }
     //编辑
     _editAction(){
       _this.setState({
         editAction:!_this.state.editAction
       })
       _this._setState(_state.addressInfo)
     }


     _setState(list){
       _this.setState({
         dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(list),
         addressInfo:list,
       })
     }
     //加数量
     addNum(index,id){
       var resultFu = function(result){
         if(result.httpCode==200){
           var list = _this.state.addressInfo.map((d,ind)=>{
             if(ind == index){
               d.number++;
             }
             return d;
           })
           _this._setState(list)
           _this.sumPrice()
         }
       }
       getPlusNum(id,resultFu)
     }

    //  减数量
    minusNum(index,id,row){
      var resultFu=function(result){
        if(result.httpCode==200){
          var list = _this.state.addressInfo.map((d,ind)=>{
            if(ind == index){
              if(d.number>1){
                d.number--;
              }
            }
            return d;
          })
          _this._setState(list)
          _this.sumPrice()
        }
      }
      if(_this.state.addressInfo[index].number>1){
        getReduceNum(id,resultFu)
      }else{
            var resultFu=function(result){
              if(result.httpCode==200){
                  getCartList({},_this.getCartListResult,_this.getFailResult)
                ToastAndroid.show("删除成功",ToastAndroid.SHORT)
              }
            }
            let list=[];
            let list_b=[];
            _this.state.addressInfo.map((d,ind)=>{
              if(d.id==id){
                list.push(d.id)
              }
            })
            deleteCartList(list,resultFu)
          }

     }

     _setAllShow(onoff){
       _this.setState({
         allShow:onoff
       })
     }

      isShowChange(index,data){
        if(!data.isShow){
          _this.select.push(data)
        }else{
            for(let i=0;i<_this.select.length;i++){
                if(_this.select[i].id==data.id){
                  _this.select.splice(i,1)
                }
            }
        }
        console.log(_this.select)
        var list = _this.state.addressInfo.map((d,ind)=>{
          if(ind == index){
            if(d.isShow){
              selCount--;
            }else{
              selCount++;
            }
            d.isShow = !d.isShow
          }
          return d;
        })
        _this._setState(list)
        _this.sumPrice()
        if(selCount==_this.state.addressInfo.length){
          _this._setAllShow(true)
        }else{
          _this._setAllShow(false)
        }

      }
      allShowChange(){

      
        var list = _this.state.addressInfo.map((d,ind)=>{
          if(_this.state.allShow){
              d.isShow = false
          }else{
              d.isShow = true
          }
            return d;
        })
        if(this.state.allShow){
          selCount=0
          _this.select=[]
        }else{
          _this.select=_this.state.addressInfo;
          selCount=_this.state.addressInfo.length
        }
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(list),
          addressInfo:list,
          allShow:!_this.state.allShow
        })
        this.sumPrice()
      }
      to1(num){
            return ''+Math.round(num * 100) / 100
      }
      sumPrice(){
        var PriceNum=0;
        for(var i = 0;i<_this.state.addressInfo.length;i++){
          if(_this.state.addressInfo[i].isShow==true){
            PriceNum+=_this.state.addressInfo[i].price*_this.state.addressInfo[i].number
          }
        }
        return this.to1(PriceNum);
      }
      rowPrice(id){
        return this.to1(_this.state.addressInfo[id].price*_this.state.addressInfo[id].number)
      }
      shopSth(){
        var resultFu=function(result){
          if(result.httpCode==200){
            getCartList({},_this.getCartListResult,_this.getFailResult)
            ToastAndroid.show("删除成功",ToastAndroid.SHORT)
          }
        }

        if(!_this.state.editAction){





          if(_this.select.length){
            _this.select.sort()
            for(let i=0;i<_this.select.length;i++){
                if(i!==_this.select.length-1&&_this.select[i].isVirtual!==_this.select[i+1].isVirtual){
                  ToastAndroid.show("不能同时添加虚拟商品和实体商品",ToastAndroid.SHORT)
                  return false
                }
            }
          }

          var price = _this.sumPrice();
          if(price>0){
            let list=[];
            _state.addressInfo.map((d,ind)=>{
                if(d.isShow){
                  list.push(d)
                }
            })
            console.log(list);
            _navigator.navigate('ConfirmOrder',{cartInfo:list,shopCart:true})
          }else{
            ToastAndroid.show("请选择你要结算的商品",ToastAndroid.SHORT)
          }
        }else{
          let list=[];
          var list_b=[];
          _this.state.addressInfo.map((d,ind)=>{
            if(d.isShow){
              list.push(d.id)
            }else{
              list_b.push(d)
            }
          })
          deleteCartList(list,resultFu)
        }
      }
      onpushRouter(){
        var resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Boutique'}),
            NavigationActions.navigate({routeName: 'BookDetail', params: {bookId:_this.props.navigation.state.params.bookId}}),
          ]
        })
        var resetAction2 = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Boutique'})
          ]
        })
        if(_this.props.navigation.state.params.OrderPay){
          _navigator.dispatch(resetAction2)
        }else{
          _navigator.dispatch(resetAction)
        }

      }
     render(){
       _this=this;
       _state=_this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "购物车",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => _this.onpushRouter()}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
         rightView: (
           <TouchableOpacity style={{flex: 1}}
             underlayColor='transparent'
             onPress={()=>_this._editAction()}
             >
             <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end"}}>
                <Text style={{fontSize:15,color:color.back1C}}>{_this.state.editAction?'完成':"编辑"}</Text>
             </View>
           </TouchableOpacity>
         ),
       };
       return(

         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
          {_state.loadCart?
            _state.addressInfo.length?
            <ListView
              alwaysBounce={true}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              initialListSize={10}
              style={{flex:1},_this.state.editAction?{}:{paddingTop:10}}
            />:
            _state.cartList?<NavWait />:<Lost  title={"您的购物车空空如也，快去添加吧"}/>
            :<Lost  title={"您访问的页面走丢了"}/>}


               <View style={styles.footer_btn}>
                   <TouchableOpacity style={styles.gorupf} onPress={()=>_this.allShowChange()}>
                        {_this.state.allShow?(
                            <Image source={require('../../images/radio_active.png')} style={styles.radio_active}/>
                        ):(
                            <View style={styles.radioInit}></View>
                        )}
                      <Text style={styles.footer_text1}> 全选</Text>

                   </TouchableOpacity>
                   <View style={styles.gorupf}>
                   {!_this.state.editAction?
                     <View style={styles.gorupf}>
                       <Text style={styles.footer_text1}>合计：</Text>
                       <Text style={styles.footer_text2}>￥{this.sumPrice()}</Text>
                     </View>
                     :null
                   }

                      <TouchableOpacity style={[styles.finsh_btn,_this.state.editAction?{backgroundColor:color.main1C,height:44}:null]} onPress={()=>_this.shopSth()}>
                        <Text style={styles.footer_text3}>{_this.state.editAction?'删除':'结算'}</Text>
                      </TouchableOpacity>
                   </View>
               </View>
        </View>
       )
     }
     onrestRouter(id,type){
        switch (type) {
          case 1:
            _navigator.navigate("BookDetail",{bookId:id,ShoppingCart:true})
            break;
          case 2:
            _navigator.navigate("AudioRecom",{audioId:id})
            break;
          case 3:
            _navigator.navigate("VideoInfo",{videoId:id})
            break;
          default:
            _navigator.navigate("BookDetail",{bookId:id,ShoppingCart:true})
        }
     }
     _renderRow(rowContent,sectionID,rowID,){

       return(
         <View style={styles.labelBox} key={rowID}>
             <View style={!this.state.editAction?{width:width-24,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomWidth:0.5,borderColor:color.boeder2c,height:181*width/750,}:{width:width-12,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomWidth:0.5,borderColor:color.boeder2c,height:181*width/750,}}>
                  <TouchableOpacity  onPress={()=>{_this.isShowChange(rowID,rowContent)}} style={{height:180*width/750,justifyContent:"center",width:width*50/750}}>
                  {rowContent.isShow?(
                      <Image source={require('../../images/radio_active.png')} style={styles.radio_active}/>
                  ):(
                      <View style={styles.radioInit}></View>
                  )}
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>{_this.onrestRouter(rowContent.productId,rowContent.type)}}>
                    <Image source={{uri:rowContent.imgUrl}} style={{width:140*width/750,height:140*width/750,}}/>
                  </TouchableOpacity>
                  <TouchableOpacity  style={styles.rightRow} onPress={()=>{_this.onrestRouter(rowContent.productId,rowContent.type)}}>
                    <View style={styles.textGroup}>
                       <Text style={styles.text1} numberOfLines={1}>{rowContent.goodsName}{rowContent.productName}</Text>
                       <Text style={styles.text2} numberOfLines={1}>著作：{rowContent.goodsDes}</Text>
                       <View style={styles.gorupText}>
                          <Text style={styles.footer_text2}>￥{rowContent.price}</Text>
                          <Text style={styles.text2}>×{rowContent.number}</Text>
                       </View>
                    </View>
                  </TouchableOpacity>


                  {_this.state.editAction?

                    <View style={styles.btnGroupRight}>
                    {!rowContent.isVirtual?
                        <TouchableOpacity  onPress={()=>{_this.addNum(rowID,rowContent.id)}} style={{width:88*width/750,flex:1,borderBottomWidth:0.5,borderColor:color.border1c,alignItems:"center",justifyContent:"center"}}>
                          <Text style={styles.textTop}>+</Text>
                        </TouchableOpacity>
                        :null}
                        <TouchableOpacity  onPress={()=>{_this.minusNum(rowID,rowContent.id,rowContent)}} style={{width:88*width/750,flex:1,alignItems:"center",justifyContent:"center"}}>
                          <Text style={rowContent.isShow?styles.textBotActive:styles.textBot}>—</Text>
                        </TouchableOpacity>
                    </View>
                    :null}



             </View>
         </View>

       )
     }
   }
