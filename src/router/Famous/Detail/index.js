'use strict';
import React, { Component, } from 'react';
import { View, Image,Text, ScrollView, TouchableOpacity, DeviceEventEmitter,ToastAndroid,InteractionManager,BackHandler } from 'react-native';//InteractionManager
var styles =require('./styles');
var { selectById, getLiterature,getLecture,reserve} = require('../../../service/famous');
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import SwiperLecture from '../../../components/famous/SwiperLecture';
import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../../components/common/WebViewAutoHeight';
import NavWait from '../../../components/common/NavWait';
import NaviSubBar from '../../../components/famous/NaviSubBar';
import SignUp from '../../../components/famous/SignUp';
import color from '../../../constant/color';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../../constant/storage';
import { date2str, }  from '../../../constant/constants';
import {NavigationActions} from 'react-navigation';
var _navigator,_this,_state,_props,lastBackPressed;
import Lost from '../../../components/common/Lost'
var archive = {
  title: "李时珍",
  section: "中医外科",
  hospital: "首都医科大学附属北京中医医院",
  intro: "<p>首都医科大学附属北京中医医院</p>",
}
var lecture = {
  title: "李时珍",
  section: "中医外科",
  hospital: "首都医科大学附属北京中医医院",
  intro: "<p>首都医科大学附属北京中医医院</p>",
}

// var literature = [
//   {img: require('../../../images/z-92-1.png'), title: "后为楚王府奉祠正、皇家太医院判，去世后明朝廷敕封为“文林郎”。",},
//   {img: require('../../../images/z-92-2.png'), title: "后为楚王府奉祠正、皇家太医院判，去世后明朝廷敕封为“文林郎”。",},
//   {img: require('../../../images/z-92-3.png'), title: "后为楚王府奉祠正、皇家太医院判，去世后明朝廷敕封为“文林郎”。",},
// ]
var lecturelist = [
  {img: require('../../../images/z-148-1.png'), title: "千古中医故事《扁鹊》之扁鹊之谜 为楚王府奉祠正……", time: "2017-01-23", timeline: "23分钟",},
  {img: require('../../../images/z-148-2.png'), title: "千古中医故事《扁鹊》之扁鹊之谜 为楚王府奉祠正……", time: "2017-01-23",},
  {img: require('../../../images/z-148-1.png'), title: "千古中医故事《扁鹊》之扁鹊之谜 为楚王府奉祠正……", time: "2017-01-23",},
]

export default class FamousDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendList:[],
      archive: false,
      subbar: "introduction",
      literature: [],
      lecture: [],
      lecturelist:[],
      signUpVisible: false,
      onData: {},
      lectureId:"",
      allLecture:[],
      allLectureLoading:true,
      isSelf:false,
      famousId:this.props.navigation.state.params.id_
    }
  }


  // componentWillMount(){
  //     BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid );
  // }
  //
  // componentUnWillMount(){
  //     BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
  // }
  //
  // _onBackAndroid=()=>{
      // let now = new Date().getTime();
      // if(now - lastBackPressed < 2500) {
      //
      //     return false;
      // }
      // lastBackPressed = now;
      // ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
      // return true;
  // }

  componentDidMount(){
    getStorage("login",(error,data)=>{
      if(data&&data.userType=='expert'){
        if(data.userId==_state.famousId){
          _this.setState({
            isSelf:true
          })
        }
      }
    })
   BackHandler.addEventListener('hardwareBackPress', function(){});
     InteractionManager.runAfterInteractions(() => {
      selectById(_this.props.navigation.state.params.id_,_this.selectByIdResult)
      if(_this.props.navigation.state.params.lunbo){
        _this.setState({
          subbar:"lecture"
        })
        getLecture({id:_state.famousId},_this.lectureResult)
      }
     });
  }

  getChangePage(str){
    switch (str) {
      case "literature":
        getLiterature({id:_this.props.navigation.state.params.id_},_this.literatureResult)
        break;
    case "lecture":
        _this.setState({allLecture:[]});
        getLecture({id:_this.props.navigation.state.params.id_},_this.lectureResult)
        break;
      default:
        selectById(_this.props.navigation.state.params.id_,_this.selectByIdResult)
    }
  }
  selectByIdResult(result){
    if(result.httpCode == 200){
      if(result.famousObj)
      _this.setState({
        archive:result.famousObj,
      })

    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  literatureResult(result){
    if(result.httpCode == 200){
      if(result.list)
      _this.setState({
        literature:result.list.records,
      })
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  lectureResult(result){
    var listLecture=[];
    var lecturelist=[];

    if(result.httpCode == 200){
      if(result.list){
          if(result.list.records.length===0){
            _this.setState({
              allLectureLoading:false
            })
            return false
          }
      //  console.log(result.list)
      //  console.log(new Date(result.list.records[0].startTime))
        result.list.records.map((d,ind)=>{
          if(new Date(d.startTime.replace(/\-/g, "/"))>new Date()){
         
            listLecture.push(d)
          }else{
            lecturelist.push(d)
          }
        })
        _this.setState({
          allLecture:result.list.records,
          lecture:listLecture,
          lecturelist:lecturelist
        })
      }
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }

  reserveResult(result){
      if(result.httpCode == 200&&result.flag){
        ToastAndroid.show('预约成功', ToastAndroid.SHORT);
        getLecture({id:_this.props.navigation.state.params.id_},_this.lectureResult)
      }else{
         ToastAndroid.show('预约人数已达上限，预约失败',ToastAndroid.SHORT)
      }
  }
  _navigatorTalk(){

    getStorage("login",function(error,data){
      if(data){
        _navigator.navigate("Talking",{famousId:_this.props.navigation.state.params.id_})
      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })
  }

  onoffShow(id){
    getStorage("login",function(error,data){
      if(data){
        _this.setState({
          lectureId:id,
          signUpVisible: true
        })
      }else{
         ToastAndroid.show('请先登录',ToastAndroid.SHORT)
        _navigator.navigate('Login')
      }
    })

  }
  resetRouter(){
    _navigator.goBack()
    DeviceEventEmitter.emit("changeFamousUI")
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "名家空间",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.resetRouter()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    let NaviSubBarProps = {
      subbar: _state.subbar,
      changePage: function(str){
        _this.setState({subbar: str});
        _this.getChangePage(str);
      },
    }
    let SignUpProps = {
      visible: _state.signUpVisible,
      onData: _state.onData,
      onOk: function(json){
        if(!json.name){
            ToastAndroid.show('请输入姓名', ToastAndroid.SHORT);
            return false;
        }else if( !json.num ){
            ToastAndroid.show('请输入预约人数', ToastAndroid.SHORT);
            return false;
        }
        
        // else if( !(/^1[3|4|5|7|8][0-9]{9}$/.test(json.phone)) ){
        //     ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
        //     return false;
        // }
        _this.setState({signUpVisible: false})
        reserve({name:json.name,num:json.num,phone:json.phone,lectureId:_state.lectureId},_this.reserveResult)
      },
      onClose: function(){
        _this.setState({signUpVisible: false})
      },
    };
    if(_state.archive.section&&_state.archive.section.length>=3){
      _state.archive.section.length=3
      _state.archive.maxLimit = true
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <SignUp {...SignUpProps}/>
        <View style={styles.main}>
          {_state.archive?(
            <View style={styles.cont}>
              <View style={styles.imgborder}>
                <View style={styles.imgborder2}>
                  <Image style={{width: 50, height: 50,borderRadius: 50,}} source={_state.archive.url?{uri:_state.archive.url}:require('../../../images/head_portrait.png')}></Image>
                </View>
              </View>
              <View style={styles.cont2}>
                <View style={styles.cont3}>
                  <Text style={[styles.cont_text2,{marginRight:10,}]}>
                    {_state.archive.name}
                  </Text>
                  {_state.archive.section.length?
                    _state.archive.section.map((d,index)=>(
                      <View style={styles.cont4} key={index}>
                        <Text style={styles.cont_text3}>
                          {d}
                        </Text>
                      </View>
                    ))
                    :null}
                    {_state.archive.maxLimit?<Text style={styles.cont_text3}>......</Text>:null}
                </View>
                <Text style={styles.cont_text1}>
                  {_state.archive.hospital}
                </Text>
              </View>
            </View>
          ):(<NavWait />)}
          {_state.archive?(
            <View style={styles.rig}>
              <NaviSubBar {...NaviSubBarProps}/>
              <View style={styles.scrollcont}>
                {_this.getswichDom(_state.subbar)}

              </View>
            </View>
          ):null}

          {
            !_state.isSelf?
            _state.subbar !== "lecture"?(
              <View style={styles.rigbot}>
                <TouchableOpacity underlayColor='transparent'
                  onPress={() => {_this._navigatorTalk()}}>
                  <Image style={styles.imgback} source={require('../../../images/m-702-1.png')}>
                    <Text style={styles.cont_text4}>
                      在线咨询
                    </Text>
                  </Image>
                </TouchableOpacity>
              </View>
            ):(
              <View style={[styles.rigbotfiex,{width: 45, height: 45,}]}>
                <TouchableOpacity underlayColor='transparent'
                  onPress={() => {_this._navigatorTalk()}}>
                  <Image style={{width: 45, height: 45,}} source={require('../../../images/m-90-1.png')}></Image>
                </TouchableOpacity>
              </View>
            )
            :null
          }
        </View>
      </View>
    );
  }
  getswichDom(str){
    switch (str) {
      case "introduction":
      if(_state.archive.intro){
        return (
          <ScrollView>
            <View style={{marginBottom:20,}}>
              <WebViewAutoHeight
                style={{ width: width-24,}}
                minHeight={180}
                contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                source={{html:"<body><div style='color: #666;'>"+_state.archive.intro+"</div></body>"}}
              />
            </View>
          </ScrollView>
        )
      }

        break;
      case "literature":
        return _state.literature.length?(
          <ScrollView>
            <View style={styles.rig2}>
              {_state.literature.map((d,index)=>(
                <View style={styles.lite1} key={index}>
                  <Image style={{width: 46, height: 46,marginRight: 10,}} source={d.img?d.img:require('../../../images/z-92-1.png')}></Image>
                  <View style={styles.lite2}>
                    <View style={styles.lite2}>
                      <Text style={styles.cont_text6}>
                        {d.title}
                      </Text>
                    </View>
                    <View style={{width: width-80,height: 1,overflow: 'hidden'}}>
                      <View style={[styles.lite4,{width: width-80,height: 2,}]}>
                      </View>
                      <View style={{width: width-80,height: 1,marginTop:-1,backgroundColor: color.back1C}}>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        ):(
          <View style={styles.rig3}>
            <Image style={{width: 56, height: 47.5,marginBottom: 20,}} source={require('../../../images/m-112-1.png')}></Image>
            <Text style={styles.cont_text5}>
              {"暂时没有文献"}
            </Text>
          </View>
        )
        break;
      case "lecture":

        let SwiperLectureProps = {
          imglist: _state.lecture,
          onoffShow:function(id){
            _this.onoffShow(id)
          }
        };
        return (
          _state.allLecture.length?
          <ScrollView  contentContainerStyle={{width:width}}>
            <View style={styles.rig2}>

              {_state.lecture.length?
                <View>
                  <View style={styles.lecttop1}>
                      <Text style={styles.cont_text2}>讲座预告</Text>
                  </View>
                  <SwiperLecture {...SwiperLectureProps} />
                </View>
              :null}
              {_state.lecturelist.map((d,index)=>(
                <TouchableOpacity style={styles.lect1} key={index} onPress={()=>_navigator.navigate("VideoInfo",{Famous:true,videoId:d.id_})}>
                  <Image style={{width: 74, height: 74,marginRight: 10,}} source={d.img?d.img:require('../../../images/z-148-1.png')} />
                  <View style={styles.lect2}>
                    <Text style={styles.cont_text2}>
                      {d.title}
                    </Text>
                    <View style={styles.lect3}>
                      <Text style={styles.cont_text9}>
                        {d.startTime?date2str(new Date(d.startTime.replace(/\-/g, "/")),"yyyy年MM月dd日"):""}
                      </Text>
                      <View style={{flexDirection: 'row',alignItems: 'center',}}>
                        {d.timeline?(<Image style={{width: 12, height: 9,marginRight: 5,}} source={require('../../../images/icon-24-1.png')}/>):null}
                        {d.timeline?(<Text style={styles.cont_text9}>
                          {"时长："+d.timeline}
                        </Text>):null}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          :_state.allLectureLoading?<NavWait />:<Lost title={"暂时没有讲座"}/>
        )
        break;
      default:
    }
  }

};
