'use strict';
import React, { Component, } from 'react';
import { View, Image,DeviceEventEmitter,Text, ScrollView, TouchableOpacity,RefreshControl, ToastAndroid, InteractionManager,BackHandler} from 'react-native';
var styles =require('./styles');
import { information, knowledge, goldlist,focuslist,unitlist,Governewlist}  from '../../service/find';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavWait from '../../components/common/NavWait';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import SwiperBoxFind from '../../components/find/SwiperBoxFind';
import SwiperTwo from '../../components/find/SwiperTwo';
import Lost from '../../components/common/Lost';
var _navigator,_this,_state,_props;

import {getStorage} from '../../constant/storage';
var imglist = [
  {imgurl: require('./../../images/z-390-1.png'),},
  {imgurl: require('./../../images/z-390-2.png'),},
  {imgurl: require('../../images/z-390-3.png'),}
];
var list_a = [
  {imgurl: require('../../images/m-128-1.png'),title: "政务新闻",channelId:5,router: "Journalism",},
  {imgurl: require('../../images/m-128-2.png'),title: "科普知识",channelId:8,router: "Journalism",},
  {imgurl: require('../../images/m-128-3.png'),title: "金牌中医",channelId:18,router: "Journalism",},
  {imgurl: require('../../images/m-128-4.png'),title: "发现更多",channelId:"",router: "Journalism",},
];
// var list_b = [
//   {title: "国家中医药管理局召开直属机关优秀国家中医药管理局召开直属机关优秀",},
//   {title: "国家中医药管理局召开直属机关优秀……",},
//   {title: "国家中医药管理局召开直属机关优秀……",},
//   {title: "国家中医药管理局召开直属机关优秀……",},
// ];
// var list_c = [
//   {imgurl: require('./../../images/z-335-1.png'),title: "经常吃花生有哪些好处？",},
//   {imgurl: require('../../images/z-335-2.png'),title: "长期喝可乐会带来哪些可能 的危害？",},
// ];
// var list_d = [
//   {imgurl: require('../../images/z-335-3.png'),title: "罗宝林",section: "主任医师",intro: "擅长消化系统的调理，对肠胃",},
//   {imgurl: require('../../images/z-335-4.png'),title: "罗宝林",section: "主任医师",intro: "擅长消化系统的调理，对肠胃",},
//   {imgurl: require('../../images/z-335-5.png'),title: "罗宝林",section: "主任医师",intro: "擅长消化系统的调理，对肠胃",},
//   {imgurl: require('../../images/z-335-6.png'),title: "罗宝林",section: "主任医师",intro: "擅长消化系统的调理，对肠胃",},
// ];
var lastBackPressed;
export default class Find extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imglist: [],
      list_a: list_a,
      list_b: [],
      list_c: [],
      list_d: [],
      list_e:[],
      newlist:[],
      infoLoad_a:true,
      infoLoad_b:true,
      infoLoad_c:true,
      infoLoad_d:true,
      infoLoad_e:true,
      infoLoad_n:true,
      lunbo:1,
      load:false
    }
    this.lastBackPressed = 0;
  }



    // componentWillMount(){
    //   BackHandler.addEventListener('hardwareBackPress', ()=>{
    //     console.log(this.lastBackPressed);
    //       if (this.lastBackPressed&&this.lastBackPressed + 2000 >= new Date().getTime()){
    //         ToastAndroid.show('退出去吧',ToastAndroid.SHORT);
    //             return false
    //       }
    //         this.lastBackPressed=new Date().getTime()
    //         ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    //         return true
    //   });
    // }
    // componentUnWillMount(){
    //   BackHandler.addEventListener('hardwareBackPress', ()=>{
    //       if (this.lastBackPressed&&this.lastBackPressed + 2000 >= new Date().getTime()){
    //         ToastAndroid.show('退出去吧',ToastAndroid.SHORT);
    //             return false
    //       }
    //         this.lastBackPressed=new Date().getTime()
    //         ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    //         return true
    //   });
    // }
    _onBackAndroid() {
      if (lastBackPressed&&lastBackPressed + 2000 >= new Date().getTime()){
            return false
      }
      lastBackPressed=new Date().getTime()
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
       return true
   }
  
   componentWillUnmount(){
     console.log("我要刷新了")
   }

  componentDidMount(){
    // console.log(global["global_"])
    // global["global_"] = true;
    this.scription = DeviceEventEmitter.addListener("changeFindUI",function(){
      information("",_this.informationResult,_this.Failfunb);
      knowledge("",_this.knowledgeResult,_this.Failfunc);
      goldlist("",_this.goldlistResult,_this.Failfund);
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      unitlist({},_this.unitlistResult)
      Governewlist({},_this.GovernewlistResult,_this.Failfunn)
    })
     BackHandler.addEventListener('hardwareBackPress',_this._onBackAndroid)
    InteractionManager.runAfterInteractions(() => {
      information("",_this.informationResult,_this.Failfunb);
      knowledge("",_this.knowledgeResult,_this.Failfunc);
      goldlist("",_this.goldlistResult,_this.Failfund);
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      unitlist({},_this.unitlistResult)
      Governewlist({},_this.GovernewlistResult,_this.Failfunn)
    });
  }
  componentWillUnmount(){
    this.scription.remove()
  }

  GovernewlistResult(result){
    if(result.httpCode == 200&&result.affairsList){
      _this.setState({
        newlist:result.affairsList
      })
    }else{
      _this.Failfunn()
    }
  }
  Failfunn(){
    _this.setState({infoLoad_n:false,})
  }
  Failfune(){
    _this.setState({infoLoad_a:false,})
  }
  focuslistResult(result){
    if(result.httpCode == 200){
      result.list.length>10?result.list.splice(10,result.list.length-10):result.list
      _this.setState({
          imglist:result.list
      })
    }else{
      _this.Failfune()
    }
  }
  Failfunb(){
    _this.setState({infoLoad_b:false,})
  }
  Failfunc(){
    _this.setState({infoLoad_c:false,})
  }
  Failfund(){
    _this.setState({infoLoad_d:false,})
  }
  Failfune(){
    _this.setState({infoLoad_e:false,})
  }


  informationResult(result){
      console.log('informationResult')
    console.log(result)
    if(result.httpCode == 200){
      if(result.informationList){
        _this.setState({list_b:result.informationList,load:false})
        if(!result.informationList.length){
          _this.Failfunb()
        }
      }
      console.log(result.informationList);

    }else{
      _this.Failfunb()
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  knowledgeResult(result){
      console.log('knowledgeResult')
    if(result.httpCode == 200){
      if(result.knowledgeList){
        _this.setState({list_c:result.knowledgeList})
        if(!result.knowledgeList.length){
          _this.Failfunc()
        }
      }

    }else{
      _this.Failfunc()
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }

  goldlistResult(result){
      console.log('goldlistResult')
    if(result.httpCode == 200){
      if(result.list){
        _this.setState({list_d:result.list})
        if(!result.list.length){
          _this.Failfund()
        }
      }
    }else{
      _this.Failfund()
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }

  unitlistResult(result){
    console.log('unitlistResult')
    if(result.httpCode == 200){
      if(result.list){
        _this.setState({list_e:result.list})
        if(!result.list.length){
          _this.Failfune()
        }
      }
    }else{
      _this.Failfune()
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }

  }
  navigateSearch(){
    _navigator.navigate('Search',{type:1})
  }
  onRefresh(){
    information("",_this.informationResult,_this.Failfunb);
    knowledge("",_this.knowledgeResult,_this.Failfunc);
    goldlist("",_this.goldlistResult,_this.Failfund);
    focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
    unitlist({},_this.unitlistResult)
    Governewlist({},_this.GovernewlistResult,_this.Failfunn)
  }
  render() {
    _this = this;
    _state = this.state;
    _props = this.props;
    _navigator = this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "首页",
      rightView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.navigateSearch()}}>
          <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end"}}>
            <Image style={{width: 16, height: 16,}} source={require('../../images/icon-32-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    let SwiperBoxProps = {
      _navigator:_navigator,
      imglist: _state.imglist,

    }
    let SwiperTwoProps = {
      _navigator:_navigator,
      type:"find",
      imglist: _state.list_b,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView 
            contentContainerStyle={{width:width}}
            refreshControl={
                            <RefreshControl
                                refreshing={_state.load}
                                onRefresh={_this.onRefresh}
                                colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                                title= {this.state.load? '刷新中....':'下拉刷新'}
                            />
                    }
            >

            <View style={styles.image}>
            {_state.infoLoad_a?_state.imglist.length?(<SwiperBoxFind {...SwiperBoxProps}/>):<NavWait />:<Lost title={"服务器异常请稍后再试"}/>}
            </View>

            <View style={styles.list_a}>
              {_state.list_a.map((d,index)=>(
                <TouchableOpacity key={index} style={styles.info_a} underlayColor='transparent'
                  onPress={() => {_navigator.navigate(d.router,{channelId:d.channelId})}}>
                  <Image style={{width: 64, height: 62,marginBottom:8,}} source={d.imgurl}></Image>
                  <Text style={styles.text_a}>
                    {d.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          {_state.list_b.length?  <View style={styles.list_b}>
              <Image style={{width: 55, height: 17,marginLeft:9,marginRight:9,marginTop: 6,}} source={require('../../images/m-110-1.png')}></Image>
              <SwiperTwo {...SwiperTwoProps}/></View>:_state.infoLoad_b?<NavWait/>
          :<Lost  title={"您访问的页面走丢了"}/>}

          <View style={styles.cont_title}>
            <Image style={{width: width, height: 30,}} source={require('./../../images/governew.png')}></Image>
          </View>

          {_state.newlist.length?(<View style={styles.cont_list}>
            {_state.newlist.map((d,index)=>(
              <TouchableOpacity key={index} style={styles.cont_box} underlayColor='transparent'
                onPress={() => {_navigator.navigate("JournalismDetail",{archivesId:d.id_,Find:true,})}}>
                <Image style={styles.cont_images}  source={d.url?{uri: d.url}:d.imgurl}></Image>
                <Text style={styles.cont_text} numberOfLines={2}>
                  {d.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>):_state.infoLoad_n?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}
          {_state.newlist.length?(<TouchableOpacity style={styles.cont_bottom} underlayColor='transparent'
            onPress={() => {_navigator.navigate("Journalism",{channelId:5})}}>
            <Image style={{width: 76, height: 21,}} source={require('../../images/m-152-1.png')}></Image>
          </TouchableOpacity>):null}



          <View style={styles.cont_title}>
            <Image style={{width: width, height: 30,}} source={require('./../../images/knowledge.png')}></Image>
          </View>

            {_state.list_c.length?(<View style={styles.cont_list}>
              {_state.list_c.map((d,index)=>(
                <TouchableOpacity key={index} style={styles.cont_box} underlayColor='transparent'
                  onPress={() => {_navigator.navigate("JournalismDetail",{archivesId:d.id_,Find:true})}}>
                  <Image style={styles.cont_images} source={d.url?{uri: d.url}:d.imgurl}></Image>
                  <Text style={styles.cont_text} numberOfLines={2}>
                    {d.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>):_state.infoLoad_c?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}



            {_state.list_c.length?(<TouchableOpacity style={styles.cont_bottom} underlayColor='transparent'
              onPress={() => {_navigator.navigate("Journalism",{channelId:8})}}>
              <Image style={{width: 76, height: 21,}} source={require('../../images/m-152-1.png')}></Image>
            </TouchableOpacity>):null}


            <View style={styles.cont_title}>
              <Image style={{width: width, height: 30,}} source={require('../../images/doctor.png')}></Image>
            </View>


            {_state.list_d.length?(<View style={styles.cont_list}>
              {_state.list_d.map((d,index)=>(
                <TouchableOpacity key={index} style={styles.cont_box} underlayColor='transparent'
                  onPress={() => {_navigator.navigate("JournalismMedicineDetail",{channelId:18,archivesId:d.id_,Find:true})}}>
                  <Image style={styles.cont_images} source={d.url?{uri: d.url}:d.imgurl}></Image>
                  <View style={styles.cont_text_a}>
                    <Text style={styles.cont_text_a1}>
                      {d.title}
                    </Text>
                    <Text style={styles.cont_text_a2}>
                      {d.section}
                    </Text>
                  </View>
                  <Text style={styles.cont_text_a3} numberOfLines={1}>
                    {d.hospital}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>):_state.infoLoad_d?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}
            {_state.list_d.length?(<TouchableOpacity style={styles.cont_bottom} underlayColor='transparent'
              onPress={() => {_navigator.navigate("Journalism",{channelId:18})}}>
              <Image style={{width: 76, height: 21,}} source={require('../../images/m-152-1.png')}></Image>
            </TouchableOpacity>):null}

            <View style={styles.cont_title}>
              <Image style={{width: width, height: 30,}} source={require('../../images/workPlace.png')}></Image>
            </View>
            {_state.list_e.length?(<View style={styles.cont_list}>
              {_state.list_e.map((d,index)=>(
                <TouchableOpacity key={index} style={styles.cont_box} underlayColor='transparent'
                  onPress={() => {_navigator.navigate("Company",{id_:d.id_,Find:true})}}>
                      <Image style={styles.cont_images} source={d.url?{uri: d.url}:d.imgurl}></Image>
                  <View style={styles.cont_text_a}>
                    <Text style={styles.cont_text_a1} numberOfLines={1}>
                      {d.name}
                    </Text>
                    {/*<Text style={styles.cont_text_a2} numberOfLines={1}>
                      {d.phone}
                    </Text>*/}
                    <Text style={styles.cont_text_a2} numberOfLines={1}>
                      {d.phone}
                    </Text>
                  </View>
                  <Text style={styles.cont_text_a3} numberOfLines={1}>
                  {/*  {d.location.substring(0,d.location.indexOf("市"))+"市"}*/}
                  {d.location}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>):_state.infoLoad_e?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}
            {_state.list_e.length?(<TouchableOpacity style={styles.cont_bottom} underlayColor='transparent'
              onPress={() => {_navigator.navigate("Journalism",{channelId:19})}}>
              <Image style={{width: 76, height: 21,}} source={require('../../images/m-152-1.png')}></Image>
            </TouchableOpacity>):null}

            <View style={{width: width, height: 12,}}>
            </View>





          </ScrollView>
        </View>
      </View>
    );
  }

};
