'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ScrollView,Text,TouchableWithoutFeedback,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import Slider from "react-native-slider";
var videoList=[
    {
      videoName:"字里藏医 - 上部",
      writer:"徐海滨"
    },
    {
      videoName:"字里藏医 - 中部",
      writer:"徐海滨"
    },
    {
      videoName:"字里藏医 - 下部",
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
export default class VideoPlayer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list:videoList,
        songs: [],   //歌曲id数据源
        playOnoff:false,
        play_key:{},
        currentIndex:0,    //当前第几首
        pause:false,       //歌曲播放/暂停
        currentTime: 0.0,   //当前时间
        sliderValue: 0,    //Slide的value
        duration: 0,     //歌曲时间
        };
     }

     //换歌时恢复进度条 和起始时间
      recover = () =>{
          this.setState({
              sliderValue:0,
              currentTime: 0.0
          })
      }


     componentDidMount(){
       BackHandler.addEventListener('hardwareBackPress', function(){});  
     }



     onProgress (data){
       //console.log(data)
       let val = parseInt(data.currentTime)
         this.setState({
             sliderValue: val,
             currentTime: data.currentTime
         })
    }

    onLoad(data){
        var sumTime=parseInt(data.duration)
        this.setState({ duration: sumTime });
   }


     getlistitem(index){
         this.setState({
           play_key: index,
         })
     }
     changePause(){
       _this.setState({
         paused:!_this.state.paused,
       })
     }
     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state = this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "我的合辑",
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
       return(
         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>

         {_state.list.length?

           <ScrollView>

                <View style={{width:width,height:516*width/750,borderColor:color.hBorder1x,borderBottomWidth:2,}}>

                  <View style={styles.h_box_r}>
                    <Image source={require('../../images/playing.gif')} style={{width:8,height:12,}}/>
                  </View>

                  <Image style={{width:width,height:516*width/750}} source={require('../../images/audio-1.png')}></Image>
                  <View style={{opacity:0.3,position:"absolute",width:width,height:516*width/750,backgroundColor:"#fff"}}>
                  </View>
                  <View style={{position:"absolute",width:width,height:516*width/750,}}>
                      <Image source={require('../../images/mark.png')} style={{width:width,height:516*width/750,alignItems:"center",}}>
                            <Image source={require('../../images/playcenter.png')} style={{width:292*width/750,height:292*width/750,alignItems:"center",justifyContent:"center",marginTop:60*width/750,}}>
                                  <Image source={require('../../images/audio-1.png') } style={{width:152*width/750,height:152*width/750,borderRadius:76*width/750,alignItems:"center",justifyContent:"center"}}>
                                  </Image>
                            </Image>
                            {_state.paused?<Image source={require('../../images/Play-round.png') } style={{position:"absolute",top:180*width/750,width:31*width/750*1.5,height:31*width/750*1.5}}/>
                            :<Image source={require('../../images/Pause-round.png') } style={{position:"absolute",top:180*width/750,width:31*width/750*1.5,height:31*width/750*1.5}}/>}
                            <TouchableWithoutFeedback onPress={()=>_this.changePause()} ><View style={{position:"absolute",zIndex:100,backgroundColor:"#000",top:60*width/750,width:292*width/750,height:292*width/750,borderRadius:146,opacity:0}}></View></TouchableWithoutFeedback>

                            <Text style={styles.textTitle1}>《字里藏医》-上部</Text>
                            <Text style={styles.textTitle2}>徐海滨</Text>
                            <View style={styles.date_box1}>
                              <Text style={styles.textTitle2}>{formatTime(_state.sliderValue)}</Text>
                              <Text style={styles.textTitle2}>{formatTime(_state.duration)}</Text>
                            </View>
                      </Image>
                  </View>


                 <Video source={{uri:"http://www.strong-link.cn/1.mp3"}}
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
                        onEnd={this.onEnd}
                        onError={this.videoError}
                        onBuffer={this.onBuffer}
                        onTimedMetadata={this.onTimedMetadata}
                        style={{width:width,height:515*width/750,}}/>

                 </View>


               <View style={styles.slideBox}>

                 <Slider
                 {...this.props}
                 onValueChange={(value) => this.setState({currentTime:value})}
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


               <View style={styles.t_mBox}>
                  <View style={styles.t_box}>
                      <View style={styles.t_box_l}>
                          <Text style={styles.text1}>全部音频 </Text>
                          <Text style={styles.text2}> (共{""+_state.list.length}个音频)</Text>
                      </View>
                      <Text style={styles.text3}>多选</Text>
                  </View>
                </View>


                <View style={styles.box}>
                  {
                    _state.list.map((d,index)=>(
                       <View style={styles.playListBox} key={index}>
                          <View style={styles.playList}>
                              <TouchableOpacity style={styles.play_btn} onPress={() => {_this.getlistitem(index)}}>

                                    {index!=_state.play_key?<View style={{width:16,height:45,alignItems:"center",justifyContent:"center"}}><Text style={styles.text2}>{index+1}</Text></View>
                                                           :<Image source={require('../../images/acitve_audio.png')} style={{width:16,height:16}}/>
                                    }
                                    <View style={styles.leftRow}>
                                      <Text style={ index==_state.play_key? styles.activeText:styles.text4}>{d.videoName}</Text>
                                      <Text style={styles.text2}>{d.writer}</Text>
                                    </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.cancelBtn}>
                                <Text style={[styles.text2,{fontSize:16}]}>×</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                      ))
                   }

                   </View>
                </ScrollView>




           :<NavWait/>}


        </View>
       )
     }

   }
