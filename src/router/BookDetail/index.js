'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, Text,DeviceEventEmitter,TouchableOpacity, ToastAndroid ,ListView,BackHandler} from 'react-native';//InteractionManager
var styles =require('./styles');
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import {NavigationActions} from "react-navigation";
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../components/common/WebViewAutoHeight';
import NavWait from '../../components/common/NavWait';
import color from '../../constant/color';
import Lost from '../../components/common/Lost';
import { date2str, } from '../../constant/constants';
import {getbookInfo} from '../../service/boutique';
import {collect,removeCollect} from '../../service/collect';
import {getAllRef} from '../../service/bookDetail'
import {addCart,getPlusNum,getReduceNum} from '../../service/boutique';
var _navigator,_this,_state,_props;
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
    this.state = {
      bookId:this.props.navigation.state.params.bookId,
      subbar: "introduction",
      bookInfo:false,
      bookDes:false,
      activeCollect:false,
      list_d:ds,
      carShopNum:0,
      loadingBook:true,
      bookList:[],
      recommend:[],
      Collect:false
    }
  }
  componentDidMount(){
    if(_this.props.navigation.state.params.Collect){
      _this.setState({
        Collect:true
      })
    }
    BackHandler.addEventListener('hardwareBackPress', function(){});
    getbookInfo(_state.bookId,_this.getBookListResult,_this.getFailResult)
  }
  getFailResult(){
    _this.setState({
      loadingBook:false
    })
  }
  getBookListResult(result){
    _this.setState({
      bookInfo:[],
      bookDes:[],
    })
    var list=[];
    if(result.httpCode==200){
      result.productInfo.number="1";
      result.productInfo.productId=result.productInfo.id_;
      list.push(result.productInfo);
      _this.setState({
        activeCollect:result.productInfo.collect,
        bookInfo:result.productInfo,
        bookDes:result.productInfo,
        carShopNum:result.cartNum,
        bookList:list,
      })
      console.log(_state.bookList)
    }else{
      _this.getFailResult()
    }

  }

  _renderRow(d,sectionId,rowID){
     return(
       <TouchableOpacity key={rowID} style={styles.cont_box} underlayColor='transparent'
         onPress={() => {_navigator.navigate("BookDetail",{bookId:d.id_})}}>
         <Image style={{width:width*340/750, height: width*380/750,}}
           source={{uri:d.imgUrl}}></Image>

         <View style={[styles.cont_text_a,{height:25,alignItems:"flex-end"}]}>
           <Text style={styles.cont_text_a1} numberOfLines={1}>
             {d.goodsName}{d.name}
           </Text>
         </View>

         <View style={[styles.cont_text_a,{height:30,alignItems:"center"}]}>
           <Text style={styles.cont_text_a2}>
             {'￥'+d.price}
           </Text>
           <Text style={styles.cont_text_a3}>
             销量：{d.sales?""+d.sales:"0"}
           </Text>
         </View>
       </TouchableOpacity>

     )
     /*
     <TouchableOpacity style={styles.smallbox} underlayColor='transparent' onPress={()=>_navigation.navigate('BookDetail',{bookId:d.id_})}>
          <View style={styles.imgBox}>
               <View style={styles.videoImg}><Image source={d.imgUrl} style={{width:340/750*width,height:width*244/750,}}/></View>
          </View>

          <View style={styles.videoInfo}>
              <Text style={styles.textName} numberOfLines={2}>{d.name}</Text>
          </View>

      </TouchableOpacity>
      */
   }
  getChangePage(str){
    var resultFu = function(result){
      if(result.httpCode==200){
        _this.setState({
            recommend:result.list,
            list_d:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list),
        })
      }
    }
    if (str=="Recommend") {
      //为你推荐接口
      getAllRef(_state.bookId,resultFu)
    }
    else{
      getbookInfo(_state.bookId,_this.getBookListResult,_this.getFailResult)
    //  _this.forceUpdate();
    }
  }
  changePage(str){
      _this.setState({subbar: str,});
    _this.getChangePage(str);
  }


  jionCar(){
    var resultFu=function(result){
      if(result.httpCode==200){
        if(result.code==-1){
          ToastAndroid.show(result.errorMessage,ToastAndroid.SHORT)
          return false;
        }
        _this.setState({
          carShopNum:_this.state.carShopNum+1,
        })
        ToastAndroid.show("加入购物车成功",ToastAndroid.SHORT)
      }
    }

    getStorage("login",function(error,data){
      if(data){
        addCart(_state.bookInfo.id_,resultFu)
      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })

  }


  collectAction(){

    getStorage("login",function(error,data){
      if(data){
        if (_this.state.activeCollect) {
          removeCollect(_state.bookInfo.id_,function(){
            _this.setState({
              activeCollect:!_this.state.activeCollect
            })
          })
        }else {
          collect({complexId:_state.bookInfo.id_,kind:2},function(){
            _this.setState({
              activeCollect:!_this.state.activeCollect
            })
          })
        }

      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })
  }
  onpushRouter(str,json){
    getStorage("login",function(error,data){
      if(data){

        _navigator.navigate(str,json)

      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })

  }

  resetRouter(){
        _navigator.goBack()
        DeviceEventEmitter.emit("changeBoutiqueUI")
        DeviceEventEmitter.emit("changeCollectUI")
        DeviceEventEmitter.emit("changeBookstoreUI")
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title:_state.bookInfo.goodsName,
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.resetRouter()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      rightView:(
        <TouchableOpacity style={{flex: 1,justifyContent: "flex-end",paddingRight: 12,flexDirection: 'row',alignItems: 'center'}}
          underlayColor='transparent' onPress={()=>_this.onpushRouter("ShoppingCart",{bookId:_state.bookId})}>
          <View style={{width:57*width/750,height:50*width/750,position:"relative",justifyContent:"center",}}>
            <Image style={{width:32*width/600,height: 30*width/600}} source={require('../../images/shopCart.png')}></Image>
            <Image style={{width:32*width/750,height: 32*width/750,position:"absolute",top:-3,right:0,alignItems:"center",justifyContent:"center"}} source={require('../../images/shopBtn.png')}>
              <Text style={{fontSize:12,color:color.back1C}}>{_state.carShopNum}</Text>
            </Image>
          </View>
        </TouchableOpacity>
      ),
    }


    return (
      <View style={styles.main}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        {
          _state.loadingBook?
          _state.bookInfo?
          <View style={{flex:1}}>
          <ScrollView contentContainerStyle={{width:width}}>
          <View style={styles.bookInfo}>
            <View style={styles.bookcenter}>
              <View style={styles.imgcenter}>
                <Image source={{uri:_state.bookInfo.imgUrl}} style={{width:212*width/750,height:320*width/750}}/>
              </View>
                <Text style={styles.text1}>{_state.bookInfo.goodsName}{_state.bookInfo.name?_state.bookInfo.name:null}</Text>
                <View style={[styles.bookSpace,{marginTop:5,marginBottom:5}]}>
                  {_state.bookInfo.author?<Text style={styles.text1} numberOfLines={1}>作者：{_state.bookInfo.author?_state.bookInfo.author:null}</Text>:null}
                  {_state.bookInfo.version?<Text style={styles.text1} numberOfLines={1}>出版社：{_state.bookInfo.version?_state.bookInfo.version:null}</Text>:null}
                </View>
                <View style={styles.bookSpace}>
                    <View style={styles.price}>
                      <Text style={styles.text2}>￥{_state.bookInfo.price}</Text>
                      {/*<Text style={styles.text3}>{_state.bookInfo.price}</Text>*/}
                    </View>
                    {_state.bookInfo.isVirtual
                      ?<TouchableOpacity style={{justifyContent: "center",flexDirection: 'row',alignItems: 'center',width:94*width/750,height:34*width/750,borderWidth:1,borderColor:color.main1C,}} onPress={()=>_navigator.navigate('Epub',{bookInfo:_state.bookInfo})}>
                            <Text style={styles.text4}>试读</Text>
                      </TouchableOpacity>
                      :null}
                </View>
            </View>
          </View>

          <View style={styles.bar1}>
            <View style={styles.bar2}>
                <TouchableOpacity style={(_state.subbar == "introduction")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
                  onPress={() => {_this.changePage("introduction")}}>
                  <Text style={(_state.subbar == "introduction")?styles.onitem:styles.offitem}>图文详情</Text>
                </TouchableOpacity>
                <TouchableOpacity style={(_state.subbar == "Publication ")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
                  onPress={() => {_this.changePage("Publication")}}>
                  <Text style={(_state.subbar == "Publication")?styles.onitem:styles.offitem}>内容简介</Text>
                </TouchableOpacity>
                <TouchableOpacity style={(_state.subbar == "Recommend")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
                  onPress={() => {_this.changePage("Recommend")}}>
                  <Text style={(_state.subbar == "Recommend")?styles.onitem:styles.offitem}>为你推荐</Text>
                </TouchableOpacity>
            </View>
          </View>
          {_this.getswichDom(_state.subbar)}
          </ScrollView></View>
          :<NavWait />
          :<Lost title={"您访问的页面走丢了"}/> }

          {
            _state.bookInfo?
              _state.subbar != "Recommend"
              ?
              <View style={styles.footer}>
                  <TouchableOpacity style={styles.btn1} onPress={()=>_this.collectAction()}>
                      {_state.activeCollect?<Image source={require('../../images/acrtive_collac.png')} style={{width:36*width/750,height:36*width/750}}/>
                      :<Image source={require('../../images/cllact1.png')} style={{width:36*width/750,height:36*width/750}}/>}

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn2} onPress={()=>_this.jionCar()}>
                      <Text style={styles.text6}>+</Text>
                      <Text style={styles.text1}>加入购物车</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn3} onPress={()=>_this.onpushRouter("ConfirmOrder",{cartInfo:_state.bookList,Collect:_state.Collect})}>
                        <Text style={styles.text7}>立即购买</Text>
                  </TouchableOpacity>
              </View>
              :null
              :null
            }

      </View>
    );
  }
  getswichDom(str){

    switch (str) {
      case "Recommend":
              return (
                _state.recommend.length?
                  <ListView
                    enableEmptySections={true}
                    dataSource={_this.state.list_d}
                    renderRow={_this._renderRow.bind(_this)}
                    initialListSize={10}
                    style={{width:width-24,marginLeft:12,flex:1}}
                    contentContainerStyle={styles.contentViewStyle}
                  />
                  :
                <NavWait />
              )

        break;
      case "Publication":

        if(_state.bookInfo.goodsDes){
          return (
              <View style={{ width: width,paddingLeft:12,paddingRight:12,backgroundColor:color.back1C}}>
              <WebViewAutoHeight
                style={{ width: width-24,paddingRight:12,paddingLeft:12,}}
                minHeight={200}
                contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                source={{html:"<body><div style='color:#666;'>"+_state.bookInfo.goodsDes+"</div></body>"}}
              />
              </View>
              )
            }
        break;
      default:
      if(_state.bookDes.goodsDetail){
        return(
          <View style={{ width: width,paddingLeft:12,paddingRight:12,backgroundColor:color.back1C}}>
              <WebViewAutoHeight
                style={{ width: width-24,paddingRight:12,paddingLeft:12,}}
                minHeight={200}
                contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                source={{html:"<body><div style='color:#666;'>"+_state.bookDes.goodsDetail+"</div></body>"}}
              />
          </View>
        )
      }
    }
  }

}
