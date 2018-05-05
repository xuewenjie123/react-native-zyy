'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView,DeviceEventEmitter, Text,TouchableOpacity, ToastAndroid, ListView, RefreshControl, BackHandler,InteractionManager} from 'react-native';
var styles =require('./styles');
import Lost from '../../components/common/Lost';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import NaviSubBar from '../../components/consultation/NaviSubBar';
import NavWait from '../../components/common/NavWait';
import color from '../../constant/color';
import { date2str, } from '../../constant/constants';
var _navigator,_this,_state,_props;
import { getListQuestion } from '../../service/consultation';
var list_a = [
  {imgurl: require('../../images/m-128-1.png'),title: "大夫您好，我最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上还失眠，记忆力也下降了，是不是脑供血不足所致？",
    name:"张仲景",router: "Journalism",section: "中医内科",time:"2017-12-13",},
  {imgurl: require('../../images/m-128-2.png'),title: "大夫您好，我最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上还失眠，记忆力也下降了，是不是脑供血不足所致？",
    name:"张仲景",router: "Journalism",section: "中医内科",time:"2017-12-13",},
  {imgurl: require('../../images/m-128-3.png'),title: "大夫您好，我最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上还失眠，记忆力也下降了，是不是脑供血不足所致？",
    name:"张仲景",router: "Journalism",section: "中医内科",time:"2017-12-13",},
  {imgurl: require('../../images/m-128-4.png'),title: "大夫您好，我最近总是睡不醒的感觉，白天发困，昏昏沉沉的，晚上还失眠，记忆力也下降了，是不是脑供血不足所致？",
    name:"张仲景",router: "Journalism",section: "中医内科",time:"2017-12-13",},
];

export default class Consultation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list_a: [],
      subbar: "all",

      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      getList: [],
      total: 0,
      page: 1,
      size: 10,
      load: false,
      selectCondition: "",
      reset: true,
      start: true,
      loadingList:true,
      //channelId: this.props.channelId,
    }
  }
  componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
   _this.subscription=DeviceEventEmitter.addListener("changeConsulation",function(){
        _this.setState({
          reset:true
        })
       getListQuestion({page:1},_this.updata,_this.getFailResult);
   })
    InteractionManager.runAfterInteractions(() => {
        getListQuestion({page:1},_this.updata,_this.getFailResult);
    });
  }
  componentWillUnmount(){
    _this.subscription.remove()
  }
  getFailResult(){
    _this.setState({
      loadingList:false
    })
  }

  updata(result){
    if(result.httpCode == 200 && result.list){
      if(!result.list.records.length){
        _this.setState({loadingList:false});return false
      }
      if(_state.reset){
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.list.records),
          getList: result.list.records,
          total: result.list.total,
          size: result.list.size,
          page: result.list.current,
          load: false,
          reset: false,
          start: false,
        });
      }else{
        _this.setState({
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.getList.concat(result.list.records)),
          getList: _state.getList.concat(result.list.records),
          total: result.list.total,
          page: result.list.current,
          load: false,
        });
      }
    }else{
      _this.setState({
        loadingList:false,
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
        getList: [],
        total: 0,
        page: 1,
        load: false,
        reset: false,
      });
    }
  }
  onEndReached(){

    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      if(_state.subbar=="host"){
        getListQuestion({page:_state.page+1,orderBy:"viewNum"},_this.updata);
      }else{
        getListQuestion({page:_state.page+1},_this.updata);
      }
     
      
    }
  }
  onRefresh() {
    if(_this.state.reset){
      return false
    }
    _this.setState({
      reset:true,
      load:true
    })
    if(_state.subbar=="host"){
      getListQuestion({page:1,orderBy:"viewNum"},_this.updata);
    }else{
      getListQuestion({page:1},_this.updata);
    }
   
 }


  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "问题列表",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    let NaviSubBarProps = {
      subbar: _state.subbar,
      changePage: function(str){
        _this.setState({
          subbar: str,
          reset: true,
        })
        if(str==="host"){
          getListQuestion({page:1,orderBy:"viewNum"},_this.updata);
        }else{
          getListQuestion({page:1},_this.updata);
        }
        if(_this.refs.ListView){
          _this.refs.ListView.scrollTo({x:0,y:0,animated:true})
        }
      },
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <NaviSubBar {...NaviSubBarProps}/>
        <View style={styles.main}>
          {_state.getList.length?
            <ListView
              ref="ListView"
              pageSize={_state.size}
              dataSource={_state.dataSource}
              renderRow={_this._renderRow.bind(this)}
              initialListSize={_state.size}
              scrollRenderAheadDistance={200}
              onEndReached={()=>_this.onEndReached()}
              onEndReachedThreshold={50}
              enableEmptySections={true}
              renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
                <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                  {_state.load? '努力加载中...' : '已经到底了'}
                </Text>
              </View>)}
                refreshControl={
                <RefreshControl
                  refreshing={_state.load}
                  onRefresh={_this.onRefresh.bind(_this)}
                  colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                  title= {this.state.load? '刷新中....':'下拉刷新'}
                />
              }
            />
            :
            _state.loadingList?<NavWait />:<Lost  title={"还没有人提过问题哦"}/>

          }
        </View>
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    if(rowData.section.length>=3){
        rowData.section.length=3;
        rowData.maxLimit = true
    }
    return(
      <TouchableOpacity key={rowID} style={[styles.item_box,rowID==0?{marginTop: 20,}:{}]}
        onPress={(e)=>{_navigator.navigate("ConsultationDetail",{questionId:rowData.id_,returnPage:true})}}>
        <Text style={[styles.text1,{marginBottom: 15,}]} numberOfLines={3}>{rowData.question}</Text>
        <View style={styles.item1}>
          <View style={[styles.imgborder,{marginRight: 5,}]}>
            <View style={styles.imgborder2}>
              <Image style={{width: 22, height: 22,borderRadius: 22,}} source={rowData.url?{uri:rowData.url}:require('../../images/z-100-1.png')}></Image>
            </View>
          </View>
          <Text style={[styles.text2,{marginRight: 5,}]}>
            {rowData.famousName}
          </Text>
          {rowData.section.length?
            rowData.section.map((d,index)=>(
              <View style={styles.item2} key={index}>
                <Text style={styles.text3}>
                  {d}
                </Text>
              </View>
            ))
            :null}
              {rowData.maxLimit?<Text style={styles.text3}>......</Text>:null}
        </View>
        <Text style={[styles.text4,{marginBottom: 10,}]} numberOfLines={2}>{rowData.reply?rowData.reply:"专家暂未回复！"}</Text>
        <View style={[styles.item3,{marginBottom: 10,}]}>
        </View>
        <View style={styles.item4}>
          <Text style={styles.text5}>
            {rowData.createTime?date2str(new Date(rowData.createTime.replace(/\-/g, "/")),"yyyy-MM-dd hh:mm"):""}
          </Text>
          <Text style={styles.text5}>
            {rowData.viewNum?(rowData.viewNum+""):"0"}人看过 | 点赞{rowData.laudNum+""}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

};
