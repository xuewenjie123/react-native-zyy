'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, Text,TouchableOpacity, ToastAndroid,InteractionManager,BackHandler} from 'react-native';
var styles =require('./styles');
import { selectById,collect,removeCollect,addLike,removeLike} from '../../../service/journalism';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from './../../../components/common/NavigatorTopBar';
import WebViewAutoHeight from './../../../components/common/WebViewAutoHeight';
import NavWait from './../../../components/common/NavWait';
import color from './../../../constant/color';
import *as wechat from 'react-native-wechat'
import { date2str, }  from '../../../constant/constants';
var _navigator,_this,_state,_props;
import {NavigationActions} from 'react-navigation';
import UShare from '../../../../share/share';  
import SharePlatform from '../../../../share/SharePlatform';  
var shareList = [
  {img: require('./../../../images/m-88-2.png'), title: "微信好友",id:1},
  {img: require('./../../../images/m-88-3.png'), title: "QQ",id:2},
  {img: require('./../../../images/m-88-1.png'), title: "微博",id:3},
]
import {getStorage} from '../../../constant/storage';
export default class JournalismDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivesId: this.props.navigation.state.params.archivesId,
      recommendList: [],
      archive:false,
      share: shareList,
      collect:false,
      collectSmall:false,
      isLike:"",
      isFind:false,
      isCollect:false,
      isFindSearch:false
    }
  }
  componentDidMount(){
    selectById({id:_state.archivesId},_this.selectByIdResult);
    if(_this.props.navigation.state.params.Find){
      _this.setState({
          isFind:true
      })
    }else if(_this.props.navigation.state.params.collect){
      _this.setState({
        isCollect:true
      })
    }else if(_this.props.navigation.state.params.FindSearch){
      _this.setState({
        isFindSearch:true
      })
    }
  }
  

  selectByIdResult(result){
    if(result.httpCode == 200){
      if(result.archive){
        // result.recommendList.sort(function(a,b){
        //   return new Date(b.publishTime.replace(/\-/g, "/")) - new Date(a.publishTime.replace(/\-/g, "/"))
        // })
        _this.setState({
          collectSmall:result.archive.collect,
          archive:result.archive,
          isLike:result.archive.like,
          recommendList:result.recommendList,
        })
      }

    }else{
      // ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  _tabCollectSmall(){
    getStorage("login",function(error,data){
      if(data){
        if (_this.state.collectSmall) {
          removeCollect(_state.archivesId,function(){
            _this.setState({
              collectSmall:!_this.state.collectSmall
            })
          })
        }else {
          collect({complexId:_state.archivesId,kind:1},function(){
            _this.setState({
              collectSmall:!_this.state.collectSmall
            })
          })
        }
      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })


  }

  _likeChange(){

    getStorage("login",function(error,data){
      if(data){
        var likeResult = function(response){
            if(response.httpCode == 200){
              _this.setState({
                isLike:!_this.state.isLike
              })
              selectById({id:_state.archivesId},_this.selectByIdResult);
            }
        };
        if (_this.state.isLike) {
          removeLike(_state.archivesId,likeResult)
        }else {
          addLike({archivesId:_state.archivesId},likeResult)
        }

      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })



  }

  // shareFrend(){
  //   wechat.isWXAppInstalled()
  //              .then((isInstalled) => {
  //                if (isInstalled) {
  //                  wechat.shareToTimeline({type: 'imageUrl',
  //                                         title: 'web image',
  //                                         description: 'share web image to time line',
  //                                         mediaTagName: 'email signature',
  //                                         messageAction: undefined,
  //                                         messageExt: undefined,
  //                                         imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'})
  //                  .catch((error) => {
  //                      ToastAndroid.show( "测试微信朋友圈分享文本" ,ToastAndroid.SHORT);
  //                  });
  //                } else {
  //                    ToastAndroid.show( '没有安装微信软件，请您安装微信之后再试' ,ToastAndroid.SHORT);
  //                }
  //              });
  // }

  resetBack(){
    const resetAction = NavigationActions.reset({
      index:1,
      actions:[
        NavigationActions.navigate({routeName: 'Find'}),
       NavigationActions.navigate({routeName: 'Journalism', params:{channelId:8}})
     ]
    })
    const resetAction2 = NavigationActions.reset({
      index:0,
      actions:[
       NavigationActions.navigate({routeName: 'Find'})
     ]
    })
    const resetAction3 = NavigationActions.reset({
      index:1,
      actions:[
       NavigationActions.navigate({routeName: 'Mine'}),
       NavigationActions.navigate({routeName: 'Collect'}),
     ]
    })
    const resetAction4 = NavigationActions.reset({
      index:2,
      actions:[
        NavigationActions.navigate({routeName: 'Find'}),
       NavigationActions.navigate({routeName: 'Search'}),
       NavigationActions.navigate({routeName: 'FindSearch'})
     ]
    })

    if(_this.props.navigation.state.params.Find){
      _navigator.dispatch(resetAction2)
    }else if(_this.props.navigation.state.params.collect){
      _navigator.dispatch(resetAction3)
    }else if(_this.props.navigation.state.params.FindSearch){
      _navigator.dispatch(resetAction4)
    }else{
      _navigator.dispatch(resetAction)
    }

  }

  share(id){
    var ThirdParty;
    switch(id){
      case 1:
        ThirdParty=SharePlatform.WECHAT
       break;
      case 2:
      ThirdParty=SharePlatform.QQ
       break;
       default:
       ThirdParty=SharePlatform.SINA
    }
    console.log(UShare)
    console.log(SharePlatform)
    UShare.share(_state.archive.title,_state.archive.content,'http://baidu.com','http://dev.umeng.com/images/tab2_1.png', ThirdParty,  
    (code, message) => {  
        console.log(code)
    }); 
  }

  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "详情",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.resetBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('./../../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      rightView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this._tabCollectSmall()}}>
          <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end",}}>
          {_state.collectSmall?(
            <Image style={{width: 16, height: 16,marginRight:10,}} source={require('./../../../images/collect_action.png')} />
          ):(
            <Image style={{width: 16, height: 14,marginRight:10,}} source={require('./../../../images/icon-36-1.png')} />
          )}
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            {_state.archive?(
              <View style={styles.cont}>
                <View style={styles.conttop}>
                  <Text style={[styles.cont_text1,{marginBottom:10,}]}>
                    {_state.archive.title}
                  </Text>
                  <Text style={[styles.cont_text2,{marginBottom:15,}]}>
                    {_state.archive.source?_state.archive.source+"   ":""}
                    {_state.archive.publishTime?date2str(new Date(_state.archive.publishTime.replace(/\-/g, "/")),"MM-dd hh:mm"):null}
                  </Text>
                  {_state.archive.imgurl?(<Image style={{width: width-24, resizeMode: "contain",marginBottom:30,}} source={{uri:_state.archive.imgurl}} />):null}
                  <View style={{marginBottom:25,}}>
                    <WebViewAutoHeight
                      style={{ width: width-24,}}
                      minHeight={180}
                      contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                      source={{html:"<body><div>"+_state.archive.content+"</div></body>"}}
                    />
                  </View>
                  <View style={styles.conttopin}>
                    <Text style={styles.cont_text2}>
                      {_state.archive.writer?"责任编辑："+_state.archive.writer:""}
                    </Text>
                    <TouchableOpacity style={styles.conttopin2} underlayColor='transparent' onPress={() => {_this._tabCollectSmall()}}>

                    {_state.collectSmall?(
                      <Image style={{width: 13, height: 13,marginRight:6,}} source={require('./../../../images/collect_small_icon.png')} />
                    ):(
                      <Image style={{width: 13, height: 13, marginRight: 6,}} source={require('./../../../images/icon-32-4.png')}></Image>
                    )}
                      <Text style={styles.cont_text2}>
                        {"收藏"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contbto}>
                  <View style={styles.contb1}>
                    <TouchableOpacity underlayColor='transparent' onPress={() => {_this._likeChange()}}>
                          <View style={styles.contb2}>
                            {_state.isLike?(
                              <Image style={{width: 16, height: 14,marginRight:10,}} source={require('./../../../images/icon-32-3.png')} />
                            ):(
                              <Image style={{width: 16, height: 14,marginRight:10,}} source={require('./../../../images/icon-32-2.png')} />
                            )}
                            <Text style={styles.cont_text4}>
                              {_state.archive.likesNum?_state.archive.likesNum+"人喜欢":"0人喜欢"}
                            </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {_state.share.length?(
                    <View style={styles.contc1}>
                      <View style={styles.contc2}>
                      </View>
                      <View style={styles.contc3}>
                        <Text style={styles.cont_text5}>
                          {"分享"}
                        </Text>
                      </View>
                      <View style={styles.contc2}>
                      </View>
                    </View>
                  ):null}
                  {_state.share.length?(
                    <View style={styles.contd1}>
                      {_state.share.map((d,index)=>(
                        <TouchableOpacity key={index} style={styles.contd2} onPress={()=>_this.share(d.id)}>
                          <Image style={{width: 44, height: 44,marginBottom:10,}} source={d.img} />
                          <Text style={styles.cont_text6}>
                            {d.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ):null}
                </View>
              </View>
            ):(<NavWait />)}
            {_state.recommendList.length?(
              <View style={styles.recom}>
                <View style={styles.recomtit}>
                  <Text style={styles.textSuggest}>
                    {"相关推荐"}
                  </Text>
                </View>
                <View style={styles.recombto}>
                  {_state.recommendList.map((d,index)=>(
                    <TouchableOpacity key={index} style={styles.recombtoitem}
                       onPress={(e)=>{_navigator.navigate("JournalismDetail",{archivesId:d.id_,Find:_state.isFind,collect:_state.isCollect,FindSearch:_state.isFindSearch})}}>
                      <View style={styles.recomcont}>
                        <Text style={styles.cont_text9} numberOfLines={2}>{d.title}</Text>
                        <View style={styles.recomcont2}>
                          <Text style={styles.cont_text8}>{d.source}</Text>
                          <Text style={styles.cont_text8}>{d.publishTime?date2str(new Date(d.publishTime.replace(/\-/g, "/")),"MM-dd hh:mm"):null}</Text>
                        </View>
                      </View>
                      <Image style={{width: 94, height: 64,marginLeft:20,}} source={d.url?{uri:d.url}:null} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ):null}
          </ScrollView>
        </View>
      </View>
    );
  }

};
