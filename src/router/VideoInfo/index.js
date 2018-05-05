
'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, TouchableOpacity,DeviceEventEmitter, ToastAndroid,Text,BackHandler,TouchableHighlight } from 'react-native';//InteractionManager
var styles =require('./styles');
import { information, knowledge, goldlist } from '../../service/find';
import Dimensions from 'Dimensions';
import NavWait from '../../components/common/NavWait';
import color from '../../constant/color';
var _navigator,_this,_state,_props;
import { Video, } from 'react-native-omplayer';
let {width,height} = Dimensions.get("window")
import Orientation from "react-native-orientation";
import {getAudioInfo} from '../../service/boutique';
import {getStorage} from '../../constant/storage';
import {NavigationActions} from 'react-navigation';
let lastBackPressed=0;
var list_b = [
  {imgurl: require('../../images/left_img1.png'),title: "第1讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:false},
  {imgurl: require('../../images/left_img2.png'),title: "第2讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:false},
  {imgurl: require('../../images/left_img1.png'),title: "第3讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:false},
  {imgurl: require('../../images/left_img2.png'),title: "第4讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:false},
  {imgurl: require('../../images/left_img1.png'),title: "第5讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:true},
  {imgurl: require('../../images/left_img2.png'),title: "第6讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:true},
  {imgurl: require('../../images/left_img1.png'),title: "第7讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:true},
  {imgurl: require('../../images/left_img2.png'),title: "第8讲：导论，中医学及中医理论",info:"时长：120分钟……",suo:true},
];
var list_a={
  title:"李德新教授专讲《中医基础理论》",
  info:"本书主要介绍中医学的基础理论和基本知识，包括中医学理论体系的形成和发展、基本特点、阴阳五行学说、藏象学说、精气血津液、经络学说、体质学说、病因病机学说、防治原则等内容。"
}

export default class VideoInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list_a:[],
      list_b:[],
      paused:false,
      videos: {},
      videoId:this.props.navigation.state.params.videoId,
      istouch:false,
      start:false,
      currentTime:0.0
    }
  }
  // componentWillMount() {
  //     // 判断横竖屏幕
  //     // var initial = Orientation.getInitialOrientation();
  //     // if (initial === 'PORTRAIT') {
  //     //   //do stuff
  //     // } else {
  //     //   //do other stuff
  //     // }
  //
  //     // 只允许竖屏
  //   //  Orientation.lockToPortrait();
  //     //只允许横屏
  //   //  Orientation.lockToLandscape();
  // }

  componentDidMount(){

    BackHandler.addEventListener('hardwareBackPress', function(){});
    getAudioInfo(_state.videoId,_this.getVideoInfoResult)
    if(_this.props.navigation.state.params.mine||_this.props.navigation.state.params.Famous){
      _this.setState({
        start:true
      })
    }
  }

  // componentUnWillMount(){
  //   this.refs.video.forceUpdate()
  //     // BackAndroid.addEventListener('hardwareBackPress', _this._onBackAndroid);
  // }
  // _onBackAndroid(){
  //   ToastAndroid.show(orentaion,ToastAndroid.SHORT);
  //
  //     ToastAndroid.show('true',ToastAndroid.SHORT);
  //   }else{
  //     _this.fullScreen()
  //     ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
  //     return false;
  //   }
  //
  // }

   getVideoInfoResult(result){
     if(result.httpCode==200&&result.productInfo){
        _this.setState({
          videos:result.productInfo
        })

     }

   }

 buyOrder(){
   getStorage("login",function(error,data){
     if(data){
        _navigator.navigate('ConfirmOrder',{cartInfo:[_state.videos],show:false})
     }else{
        ToastAndroid.show('请先登录',ToastAndroid.SHORT)
       _navigator.navigate('Login')
     }
   })

 }
 resetRouter(){
  
      _navigator.goBack()
      DeviceEventEmitter.emit("changeBoutiqueUI")
 }

 _onLoad(){
  _this.setState({
    istouch:true
  })
 }
  tabPause(){
    _this.setState({
      paused:!_state.paused,
    })
  }
  onProgress (data){
    console.log(data);
      if(data.currentTime>=30){
          if(!_state.start){
            _this.tabPause()
        ToastAndroid.show('试看结束,请先购买完整版',ToastAndroid.SHORT)
          return false;
        }
      }
      let val = parseInt(data.currentTime)
        this.setState({
            currentTime: data.currentTime
        })
    }
    onEnd(){
      _this.setState({
        paused:true,
        currentTime: 0
      })
    }
  //  {/* src="http://v.yoai.com/femme_tampon_tutorial.mp4" */}
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
     var videoUrl = this.state.videos.goodsUrl?this.state.videos.goodsUrl: "http://v.yoai.com/femme_tampon_tutorial.mp4"
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.backButton} onPress={()=>_this.resetRouter()}>
          <Image style={{width: 11, height: 22,}} source={require('./../../images/icon-44-1.png')}></Image>
        </TouchableOpacity>
         
            <Video
                src={"http://v.yoai.com/femme_tampon_tutorial.mp4"}
                paused={_state.paused}
                style={{width:width,height:(width * 9)/16}}
                onLoad={()=>_this._onLoad()}
                onProgress={(e)=>this.onProgress(e)}
                currentTime={_state.currentTime}
                onEnd={(e)=>this.onEnd(e)}
            />
      {!_state.istouch?<View style={{width:width,height:(width * 9)/16,backgroundColor:"#000",alignItems:"center",justifyContent:"center",position:"absolute",top:0,zIndex:1000000}}><Text style={{color:"#999"}}>视频正在加载...</Text></View>:null}
            
        <View style={styles.box}>
        {_state.videos?
          <ScrollView>
                <View style={styles.box_head}>
                  <Text style={[styles.cont_text_b1,{height:15,lineHeight:15,marginBottom:21,}]} numberOfLines={1}>
                  {_state.videos.goodsName}{_state.videos.name}
                  </Text>
                  <Text style={styles.cont_text_b4}>
                    {_state.videos.goodsDes}
                  </Text>
                </View>
          </ScrollView>
                    :
                    null
        }
        </View>

        {
          _state.videos?
          _state.start?
          <TouchableOpacity style={styles.button} onPress={()=>_this.tabPause()}>
                  <Text style={styles.loginbtn}>{_state.paused?"播放":"暂停"}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.button}
           onPress={()=>_this.buyOrder()}>
                  <Text style={styles.loginbtn}>购买</Text>
          </TouchableOpacity>
          :null
        }
      </View>
    );
  }

};
