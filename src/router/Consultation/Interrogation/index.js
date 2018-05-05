'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView,DeviceEventEmitter,RefreshControl, TouchableOpacity,Text, InteractionManager,ToastAndroid,ListView ,BackHandler} from 'react-native';//InteractionManager
var styles =require('./styles');
import { getQuestion, } from '../../../service/consultation';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../../components/common/WebViewAutoHeight';
import NavWait from '../../../components/common/NavWait';
import color from '../../../constant/color';
import {date2str} from '../../../constant/constants';
var _navigator,_this,_state,_props;

var archive = {
  title: "李时珍",
  section: "中医外科",
  hospital: "首都医科大学附属北京中医医院",
  intro: "<p>首都医科大学附属北京中医医院</p>",
}
var archivelist = [
  {question: true, time: "2018-09-21", make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
  {question: false, time: "2018-09-21", zan: true, make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
  {question: true, time: "2018-09-21", make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
  {question: false, time: "2018-09-21", zan: false, make: "最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上 还失眠，记忆力也下降了，是不是脑供血不足所致？",},
]

export default class ConsultationMy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingList:true,
      archivesId: 1,
      archive: archive,
      archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}),
      archivesNone:false,
      reset: true,
      total: 0,
      page: 1,
      size: 10,
      load: false,
      getList:[],
    }
  }
  componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
   _this.subscription= DeviceEventEmitter.addListener("changeInterrogationUI",function(){
    _this.setState({
      reset:true
    })
    getQuestion({page:1},_this.getQuestionResult)
  })
    InteractionManager.runAfterInteractions(() => {
        getQuestion({page:1},_this.getQuestionResult)
    });
  }
  componentWillUnmount(){
    _this.subscription.remove()
  }

  successResult(result){
    _this.setState({
      size:result.list.size,
      page:result.list.current,
      total:result.list.total,
      reset: false,
      loadingList:true,
      load:false,
    })
  }

  Failfunc(){
    _this.setState({
      loadingList:false,
      load:false,
    })
  }

  getQuestionResult(result){

    if(result.httpCode == 200&&result.list){
        if(!result.list.records.length){
          _this.Failfunc();
          return false
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
      _this.Failfunc()
    }
  }


  _renderRow(rowData,sectionID,rowID){
    return(
      <View style={styles.dat1} key={rowID}>
        <View style={styles.dat2}>
          <Image style={{width: 25, height: 25,marginRight:10,}} source={rowData.url?{uri:rowData.url}:require('../../../images/head_portrait.png')}></Image>
          <Text style={styles.cont_text2}>
            {rowData.userName}
          </Text>
        </View>
        <View style={styles.dat3}>
          <Image style={{width: 20, height: 20,marginRight: 13,marginLeft: 2,}} source={require('../../../images/icon-32-12.png')}></Image>
          <View style={styles.dat4}>
            <Text style={[styles.cont_text4,{marginBottom:10,}]}>
              {rowData.question}
            </Text>
            <View style={styles.dat5}>
              <Text style={styles.cont_text5}>
                {rowData.createTime?date2str(new Date(rowData.createTime.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm:ss"):""}
              </Text>
              <TouchableOpacity onPress={()=>_navigator.navigate("ConsultationDetail",{questionId:rowData.id_,Interrogation:true})}>
                <Text style={styles.cont_text5}>
                  {"查看详情 >> "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
  onRefresh(){
    _this.setState({
      reset:true
    })
    getQuestion({page:1},_this.getQuestionResult)
  }
  onEndReached(){
    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getQuestion({page:_state.page+1},_this.getQuestionResult);
    }
  }



  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "咨询问诊",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>


          {_state.loadingList?
            _state.getList.length?
              <ListView
                ref="ListView"
                pageSize={_state.size}
                dataSource={_state.archivelist}
                renderRow={_this._renderRow.bind(this)}
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
                  refreshControl={<RefreshControl
                                  refreshing={_state.load}
                                  onRefresh={()=>_this.onRefresh()}
                                  colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                                  title= {this.state.load? '刷新中....':'下拉刷新'}
                                />}
              />:<NavWait />
              :<View style={styles.noneBox}>
                  <Image style={{width: 143*width/750, height: 246*width/750,marginTop:272*width/750,marginBottom:80*width/750}} source={require('../../../images/question_none.png')}/>
                  <Text style={{fontSize:15,color:color.font2C,lineHeight:15,}}>还没有人向您提问哦</Text>
                </View>
          }

        </View>
      </View>
    )
  }
};
