'use strict';
import React, { Component, } from 'react';
import { View,Image,Text,DeviceEventEmitter,TouchableOpacity,ToastAndroid,TextInput,ScrollView,TouchableWithoutFeedback,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import Video from 'react-native-video'
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import Slider from "react-native-slider";
import SignUp from '../../components/audioRecom/tryOrBuy';
import {getAudioInfo} from '../../service/boutique';
import {getStorage} from '../../constant/storage';
import {NavigationActions} from 'react-navigation'
var videoList=[
    {
      videoName:"字里藏医 - 上部",
      writer:"徐海滨"
    },
];
function formatTime(time) {
       let min = Math.floor(time / 60)
       let second = parseInt(time - min * 60)
       min = min >= 10 ? min : '0' + min
       second = second >= 10 ? second : '0' + second
       return min + ':' + second
   }
export default class AudioRecom extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audioId:this.props.navigation.state.params.audioId,
        list:videoList,
        playOnoff:false,
        songs: [],   //歌曲id数据源
        play_key:{},
        signUpVisible:false,
        currentIndex:0,    //当前第几首
        paused:true,       //歌曲播放/暂停
        currentTime: 0.0,   //当前时间
        sliderValue: 0,    //Slide的value
        duration: 0.0,
         loading:true,
         audioInfo:[],
         start:false,
        };
     }
     componentDidMount(){
       getAudioInfo(_state.audioId,_this.getAudioInfoResult,_this.getFailResult)
       BackHandler.addEventListener('hardwareBackPress', function(){  
          DeviceEventEmitter.emit("changeBoutiqueUI")
          DeviceEventEmitter.emit("changeMyAudioUI")
          DeviceEventEmitter.emit("changeAudioListUI")
      });
        if(_this.props.navigation.state.params.mine){
          _this.setState({
            start:true
          })
        }
     }

     getFailResult(){}
     getAudioInfoResult(result){
       if(result.httpCode==200){
         _this.setState({
           loading:false,
           audioInfo:result.productInfo,
         })
       }
     }

     getlistitem(index){

         this.setState({
           play_key: index,
         })

     }
    recover = () =>{
        this.setState({
            sliderValue:0,
            currentTime: 0.0
        })
    }

     onProgress(data){
       console.log(data);
         if(data.currentTime>=30){
             if(!_state.start){
            _this.setState({
              paused:true,
              currentTime: 0
            })
            ToastAndroid.show('试听结束,请先购买完整版',ToastAndroid.SHORT)
             return false;
            }
         }
         let val = parseInt(data.currentTime)
           this.setState({
               sliderValue: val,
               currentTime: data.currentTime
           })

    }

    onLoad(data){
      console.log(data);
        var sumTime=parseInt(data.duration)
        this.setState({ duration: sumTime });
   }
   onEnd(){
     _this.setState({
       paused:true,
       currentTime: 0.0
     })
   }

     changePause(){
       console.log(_this.state.paused)
       _this.setState({
         paused:!_this.state.paused,
       })
     }
     buyOrder(){
       getStorage("login",function(error,data){
         if(data){
           _navigator.navigate('ConfirmOrder',{cartInfo:[_state.audioInfo],show:false})
         }else{
            ToastAndroid.show('请先登录',ToastAndroid.SHORT)
           _navigator.navigate('Login')
         }
       })
     }
     resetRouter(){
          _navigator.goBack();
          DeviceEventEmitter.emit("changeBoutiqueUI")
          DeviceEventEmitter.emit("changeMyAudioUI")
          DeviceEventEmitter.emit("changeAudioListUI")
     }
     render(){
       _this=this;
       _navigator=this.props.navigation;
       _state = this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "音乐详情",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.resetRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       let NaviSubBarProps = {
         subbar: _state.subbar,
         changePage: function(str){
           _this.setState({subbar: str});
           _this.getChangePage(str);
         },
       }
     let SignUpProps = {
       visible: _state.signUpVisible,
       onOk: function(json){
         _this.setState({signUpVisible: false})

       },
       onClose: function(){
         _this.setState({signUpVisible: false})
       },
     }
       return(
         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         <SignUp {...SignUpProps}/>
         {!_state.loading?

           <ScrollView>
              <View style={{width:width,height:516*width/750,borderColor:color.hBorder1x,borderBottomWidth:2,}}>

                <View style={styles.h_box_r}>
                {!_state.paused?<Image source={require('../../images/playing.gif')} style={{width:8,height:12,}}/>:<Image source={require('../../images/playstate.png')} style={{width:8,height:12,}}/>}
                </View>

                <Image style={{width:width,height:516*width/750}} source={{uri:_state.audioInfo.imgUrl}}></Image>
                <View style={{opacity:0.3,position:"absolute",width:width,height:516*width/750,backgroundColor:"#fff"}}>
                </View>
                <View style={{position:"absolute",width:width,height:516*width/750,}}>
                    <Image source={require('../../images/mark.png')} style={{width:width,height:516*width/750,alignItems:"center",}}>
                          <Image source={require('../../images/playcenter.png')} style={{width:292*width/750,height:292*width/750,alignItems:"center",justifyContent:"center",marginTop:60*width/750,}}>
                                <Image source={{uri:_state.audioInfo.imgUrl} } style={{width:152*width/750,height:152*width/750,borderRadius:76*width/750}}>
                                </Image>
                          </Image>
                          {_state.paused?<Image source={require('../../images/Play-round.png') } style={{position:"absolute",top:180*width/750,width:31*width/750*1.5,height:31*width/750*1.5}}/>
                          :<Image source={require('../../images/Pause-round.png') } style={{position:"absolute",top:180*width/750,width:31*width/750*1.5,height:31*width/750*1.5}}/>}

                          <TouchableWithoutFeedback onPress={()=>_this.changePause()} ><View style={{position:"absolute",zIndex:100,backgroundColor:"#000",top:60*width/750,width:292*width/750,height:292*width/750,borderRadius:146,opacity:0}}></View></TouchableWithoutFeedback>

                          <Text style={styles.textTitle1}>{_state.audioInfo.goodsName}{_state.audioInfo.name}</Text>
                          <View style={styles.date_box1}>
                            <Text style={styles.textTitle2}>{formatTime(_state.sliderValue)}</Text>
                            <Text style={styles.textTitle2}>{formatTime(_state.duration)}</Text>
                          </View>
                    </Image>
                </View>
                {/* "http://www.strong-link.cn/1.mp3" */}
               <Video source={{
                 uri:"http://59.110.21.16/M00/00/1E/Chv2uFm3bGKAX-O6ADlnB60e0gY198.mp3"
}}
                       ref="video"
                       rate={1.0}
                       volume={1.0}
                       muted={false}
                       paused={_state.paused}
                       resizeMode="cover"
                       repeat={true}
                       playInBackground={false}
                       playWhenInactive={false}
                       ignoreSilentSwitch={"ignore"}
                       progressUpdateInterval={250.0}
                       onLoadStart={this.loadStart}
                       onLoad={(e) => this.onLoad(e)}
                       onProgress={(e)=>this.onProgress(e)}
                       onEnd={(e)=>this.onEnd(e)}
                       onError={this.videoError}
                       onBuffer={this.onBuffer}
                       onTimedMetadata={this.onTimedMetadata}
                       style={{width:width,height:515*width/750,}}/>
               </View>

               <View style={styles.slideBox}>
                 <Slider
                 {...this.props}
                 onValueChange={(value) => this.setState({sliderValue:value,currentTime:value})}
                 maximumTrackTintColor={'#7d756f'}
                 minimumTrackTintColor={color.main1C}
                 thumbTintColor={color.main1C}
                 thumbStyle={{width:20*width/750,height:20*width/750,borderRadius:10*width/750}}
                 trackStyle={{height:4}}
                 maximumValue={_state.duration}
                 minimumValue={0}
                 step={1}
                 onSlidingComplete={(value) => {this.refs.video.seek(value)}}
                 value={_state.sliderValue}
                />
               </View>

               <View style={styles.box}>
                     <View style={styles.box_head}>
                       <Text style={[styles.cont_text_b1,{height:15,lineHeight:15,marginBottom:21,}]} numberOfLines={1}>
                         {_state.audioInfo.goodsName}{_state.audioInfo.name}
                       </Text>
                       <Text style={styles.cont_text_b4}>
                         {_state.audioInfo.goodsDes}
                       </Text>
                     </View>
               </View>


              </ScrollView>




           :<NavWait/>}

           {
             _state.start?
             <TouchableOpacity style={styles.button} onPress={()=>_this.changePause()} >
                     <Text style={styles.loginbtn}>{_state.paused?"播放":"暂停"}</Text>
             </TouchableOpacity>
             :
             <TouchableOpacity style={styles.button}
              onPress={()=>_this.buyOrder()}>
                     <Text style={styles.loginbtn}>购买</Text>
             </TouchableOpacity>
           }

        </View>
       )
     }

   }
