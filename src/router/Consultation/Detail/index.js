'use strict';
import React, { Component, } from 'react';
import { View, Image,Text, ScrollView, DeviceEventEmitter,RefreshControl,TouchableOpacity, ToastAndroid, TextInput,BackHandler, ListView,InteractionManager} from 'react-native';//InteractionManager
var styles =require('./styles');
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../../constant/storage';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../../components/common/WebViewAutoHeight';
import NavWait from '../../../components/common/NavWait';
import color from '../../../constant/color';
import { date2str, }  from '../../../constant/constants';
var _navigator,_this,_state,_props;
import { NavigationActions } from 'react-navigation';
import { getQueDetail,addLaud,removeLaud}  from '../../../service/consultation';
// var archive = {
//   title: "李时珍",
//   section: "中医外科",
//   hospital: "首都医科大学附属北京中医医院",
//   intro: "<p>首都医科大学附属北京中医医院</p>",
//   id:2,
// }
// var archivelist = [
//   {question: true, time: "2018-09-21", make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
//   {question: false, time: "2018-09-21", zan: true, make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
//   {question: true, time: "2018-09-21", make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
//   {question: false, time: "2018-09-21", zan: false, make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
// ]
var lastBackPressed;
export default class ConsultationDetail extends Component {

  constructor(props) {
    super(props);
    var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
    this.state = {
      userType:null,
      questShow:false,
      questionId:this.props.navigation.state.params.questionId,
      lastId:"",
      archive:false,
      userObj:{},
      archivelist: ds,
      loadingList:true,
      reset: true,
      total: 0,
      page: 1,
      size: 10,
      load: false,
      getList:[],
      isMine:false,
      isSelf:false,
      Talking:false
    }
  }

  componentDidMount(){
    console.log(_this.props.navigation.state.params)
    // if(_this.props.navigation.state.params.Talking){
    //   _this.setState({
    //     Talking:true
    //   })
    // }
    _this.subscription=DeviceEventEmitter.addListener("changeConsulationDetail",function(){
      _this.setState({
        reset:true
      })
      getQueDetail({id:_state.questionId,page:1},_this.getQueDetailResult,_this.getFailResult);
  })
   BackHandler.addEventListener('hardwareBackPress', function(){});
    InteractionManager.runAfterInteractions(() => {
      getQueDetail({id:_state.questionId,page:1},_this.getQueDetailResult,_this.getFailResult);
    });
  }
  componentWillUnmount(){
    _this.subscription.remove()
  }
  getFailResult(){
    _this.setState({
      loadingList:false,
      getList: [],
      total: 0,
      page: 1,
      load: false,
      reset: false,
    })
  }
  successResult(result){
    _this.setState({
      archive:result.famousObj?result.famousObj:_state.archive,
      load: false,
      userObj:result.userObj?result.userObj:_state.userObj,
      size:result.list.size,
      page:result.list.current,
      total:result.list.total,
      reset: false,
      isMine:result.isMine,
      lastId:result.list.records[result.list.records.length-1].id_,
    })
  }

  getQueDetailResult(result){
    if(result.httpCode == 200){
      getStorage('login',function(error,data){
          if(data){
            _this.setState({
              userType:data.userType
            })
              if(result.famousObj){
                  if(data.userType=='expert'&&(data.userId==result.famousObj.id_)){
                    _this.setState({
                      isSelf:true
                    })
                }
              } 
          }
      })


      if(!result.list.records.length){
        _this.getFailResult()
      }
      if(_state.reset){
        _this.setState({
          getList:result.list.records,
          archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list.records),
        })
      }else{
        _this.setState({
          getList:_state.getList.concat(result.list.records),
          archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.getList.concat(result.list.records)),
        })
      }
      _this.successResult(result)
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
      _this.getFailResult()
    }
  }


  _tabZan(row,rowID,i){
    // if (lastBackPressed&&lastBackPressed + 1000 >= new Date().getTime()){
    //   ToastAndroid.show("亲，慢点",ToastAndroid.SHORT)
    //   return false
    // }
    // lastBackPressed=new Date().getTime()
  
    let resultFu=function(result){
      if(result.httpCode==200){
          var list = _state.getList
          // console.log(list)
          // console.log(rowID)
          // console.log(list[Number(rowID)])
          // console.log(list[Number(rowID)].replyList[i])
          list[Number(rowID)].replyList[i].laud = !list[Number(rowID)].replyList[i].laud;
          _this.setState({
            archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(list),
          })
      }
    }

    if (row.laud) {
      removeLaud(row.id_,resultFu);
    }else {
      addLaud({replyId:row.id_},resultFu);
    }
  }

  typeShow(){

    if((_state.userType=='general'&&_state.isMine)||(!_state.isSelf&&_state.isMine)){
      return (
       <TouchableOpacity underlayColor='transparent' onPress={() =>_navigator.navigate("SecondWrite",{famousId:_state.archive.id_,questionId:_state.questionId,isSelf:_state.isSelf,Talking:_state.Talking})} style={{alignItems:"center",justifyContent:"center"}}>
            <Image style={{width: 133*width/750, height: 48*width/750,alignItems:"center",justifyContent:"center",}} source={require('../../../images/small_yes.png')}>
                <Text style={[styles.cont_text2,{color:color.main1C}]}>追问</Text>
            </Image>
        </TouchableOpacity>
      )
    }else if(_state.userType=='expert'&&_state.isSelf){
      return (
        <TouchableOpacity underlayColor='transparent' onPress={() =>_navigator.navigate("SecondWrite",{questionId:_state.lastId,isSelf:_state.isSelf})} style={{alignItems:"center",justifyContent:"center"}}>
             <Image style={{width: 133*width/750, height: 48*width/750,alignItems:"center",justifyContent:"center",}} source={require('../../../images/small_yes.png')}>
                 <Text style={[styles.cont_text2,{color:color.main1C}]}>回复</Text>
             </Image>
         </TouchableOpacity>
      )
    }else{
      return  null
    }

  }
  _renderRow(d,sectionID,rowID){
        return (<View>
          <View style={styles.dat3}>
             <Image style={{width: 20, height: 20,marginRight: 13,marginLeft: 2,}} source={require('../../../images/icon-32-12.png')}></Image>
             <View style={styles.dat4}>
               <Text style={[styles.cont_text4,{marginBottom:10,}]}>
                 {d.question}
               </Text>
               <View style={styles.dat5}>
                 <Text style={styles.cont_text5}>
                   {date2str(new Date(d.createTime.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm:ss")}
                 </Text>
               </View>
           </View>
         </View>
         {d.replyList.length?
           d.replyList.map((c,i)=>(
           <View style={styles.dat3} key={i}>
                   <Image style={{width: 20, height: 20,marginRight: 13,marginLeft: 2,}} source={require('../../../images/icon-32-11.png')}></Image>
                   <View style={styles.dat4}>
                         <Text style={[styles.cont_text4,{marginBottom:10,}]}>{c.reply}</Text>
                         <View style={styles.dat5}>
                           <Text style={styles.cont_text5}>{date2str(new Date(c.createTime.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm:ss")}</Text>
                         </View>
                   </View>
                   {
                     _state.userType=='general'||!_state.isSelf?
                       <TouchableOpacity style={{flexDirection: 'row',alignItems: "center",}} onPress={() => {_this._tabZan(c,rowID,i)}}>
                         <View underlayColor='transparent'>
                           {c.laud?(
                             <Image style={{width: 16, height: 16,marginRight: 5,}} source={require('../../../images/icon-32-14.png')}></Image>
                           ):(
                             <Image style={{width: 16, height: 16,marginRight: 5,}} source={require('../../../images/icon-32-13.png')}></Image>
                           )}
                           </View>
                         <Text style={styles.cont_text5}>
                           {c.laud?"已赞":"点赞"}
                         </Text>
                       </TouchableOpacity>
                     :null
                   }
 
             </View>
         ))
         :  null}
        </View>) 
    
  }
  
      
    // }else{
    //   return(
    //     <View style={{width:width,marginTop:10,paddingLeft:12,}}>
    //         <Text style={{fontSize:18,color:"#ddd"}}>该问题未审核通过！</Text>
    //     </View>
    //   )
    // }
   
  
  onRefresh(){
    if(_state.reset){
      return false
    }
    _this.setState({
      reset:true,
      load:true
    })
    getQueDetail({id:_state.questionId,page:1},_this.getQueDetailResult,_this.getFailResult)
  }

  onEndReached(){
    if(_this.state.reset){
      return false
    }
    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getQueDetail({id:_state.questionId,page:_state.page+1},_this.getQueDetailResult,_this.getFailResult);
    }
  }
  resetRouter(){
    // let resetAction = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({routeName: 'Famous'}),
    //     NavigationActions.navigate({routeName: 'Consultation'}),
    //   ]
    // })
    // let resetAction2 = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({routeName: 'Famous'}),
    //     NavigationActions.navigate({routeName: 'FamousDetail',params:{id_:_state.archive.id_}}),
    //   ]
    // })
    // let resetAction3 = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({routeName: 'Mine'}),
    //     NavigationActions.navigate({routeName: 'ConsultationMy'}),
    //   ]
    // })
    // let resetAction4 = NavigationActions.reset({
    //   index: 1,
    //   actions: [
    //     NavigationActions.navigate({routeName: 'Mine'}),
    //     NavigationActions.navigate({routeName: 'Interrogation'}),
    //   ]
    // })
    // if(_this.props.navigation.state.params.Talking){
    //   _navigator.dispatch(resetAction2)
    // }else if(_this.props.navigation.state.params.My){
    //   _navigator.dispatch(resetAction3)
    // }else if(_this.props.navigation.state.params.Interrogation){
    //   _navigator.dispatch(resetAction4)
    // }else{
    //   _navigator.dispatch(resetAction)
      _navigator.goBack()
      DeviceEventEmitter.emit("changeConsulation")
      DeviceEventEmitter.emit("changeInterrogationUI")
      DeviceEventEmitter.emit("changeMyUI")
    
  }
  _renderHeader(){
    if(_state.archive.section&&_state.archive.section.length>=3){
      _state.archive.section.length=3
      _state.archive.maxLimit = true
    }
    return(
      <View style={styles.main2}>
        <View>
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
          <View style={styles.dat}></View>
          <View style={styles.dat2}>
            <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
              <Image style={{width: 25, height: 25,marginRight:10,borderRadius:12.5}} source={_state.userObj.url?{uri:_state.userObj.url}:require('../../../images/head_portrait.png')}></Image>
              <Text style={styles.cont_text2}>
                {_state.userObj.name}
              </Text>
            </View>
            {_this.typeShow()}
          </View>
        </View>
      </View>
    )
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "问题详情",
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
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>


          {_state.archive?
                  <ListView
                    renderHeader={_this._renderHeader.bind(_this)}
                    dataSource={_state.archivelist}
                    renderRow={_this._renderRow.bind(this)}
                    ref="ListView"
                    pageSize={_state.size}
                    initialListSize={_state.size}
                    scrollRenderAheadDistance={200}
                    onEndReached={()=>_this.onEndReached()}
                    onEndReachedThreshold={100}
                    enableEmptySections={true}
                    renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
                      <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                        {_state.load? '努力加载中....' : '已经到底了'}
                      </Text>
                    </View>)}
                    refreshControl={
                    <RefreshControl
                      refreshing={_state.load}
                      onRefresh={()=>_this.onRefresh()}
                      colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                      title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                    />
                  }
                      />
                :_state.loadingList?<NavWait />:null
                }
        </View>
      </View>
    );
  }
};
