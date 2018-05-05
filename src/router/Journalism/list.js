'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView,Text, TouchableOpacity, ListView,ToastAndroid,RefreshControl, InteractionManager} from 'react-native';

var styles =require('./styles');
import NavWait from '../../components/common/NavWait';
import { archives} from '../../service/journalism';
import { date2str,} from '../../constant/constants';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';
var _navigator,_this,_state,_props;

export default class JournalismList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      getList: [],
      total: 0,
      page: 1,
      size: 10,
      load: true,
      selectCondition: "",
      reset: true,
      start: true,
      channelId: this.props.channelId,
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      if(_this.props.channelId===""){
        archives({channelId:0,page:1},_this.updata);
      }else{
        archives({channelId:_state.channelId+"",page:1},_this.updata);
      }

    });
  }
  componentWillReceiveProps(newProps){
    if(newProps.channelId !== this.state.channelId){
      this.setState({channelId:newProps.channelId,reset:true})
      archives({channelId:newProps.channelId+"",page:1},_this.updata);
    }
  }
  updata(result){
    if(result.httpCode == 200 && result.list){
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
    // console.log(_state.page*_state.size);
    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      archives({channelId:_state.channelId+"",page:_state.page+1},_this.updata);
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {_state.start?(
          <NavWait />
        ):(
          <ListView
            pageSize={_state.size}
            dataSource={_state.dataSource}
            renderRow={_this._renderRow.bind(_this)}
            initialListSize={_state.size}
            scrollRenderAheadDistance={200}
            onEndReached={_this.onEndReached.bind(_this)}
            onEndReachedThreshold={50}
            enableEmptySections={true}
            renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
              <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                {_state.load? '努力加载中。。。' : ""}
              </Text>
            </View>)}
            refreshControl={
              <RefreshControl
                refreshing={_state.load}
                onRefresh={_this.onSearch}
              />
            }
          />
        )}
      </View>
    );
  }
  _renderRow(rowData,sectionID,rowID,){
    return(
      <View key={rowID} style={styles.list_box}>
      <View style={styles.list_boxin}>
        <TouchableOpacity style={styles.list_touch} onPress={(e)=>{_this._onPushRouter(rowData.id_)}}>
          <View style={styles.list_cont}>
            <Text style={styles.list_text1} numberOfLines={2}>{rowData.title?rowData.title:rowData.name}</Text>
            <View style={styles.list_contin}>
              <Text style={styles.list_text2} numberOfLines={2}>{rowData.source?rowData.source:rowData.hospital?rowData.hospital:rowData.name?rowData.location:null}</Text>
              <Text style={styles.list_text2}>{rowData.publishTime?date2str(new Date(rowData.publishTime.replace(/\-/g, "/")),"MM-dd hh:mm"):rowData.phone?rowData.phone:rowData.section}</Text>
            </View>
          </View>
          <Image style={{width: 94, height: 64,marginLeft:20,}} source={rowData.url?{uri:rowData.url}:null} />
        </TouchableOpacity>
      </View>
      </View>
    )
  }
  _onPushRouter(index){
    console.log(_state.channelId)
    if(_state.channelId == 18){
      _navigator.navigate("JournalismMedicineDetail",{archivesId:index,channelId: _state.channelId,})
    }else if(_state.channelId==19){
      _navigator.navigate("Company",{id_:index})
    }else{
      _navigator.navigate("JournalismDetail",{archivesId:index,channelId: _state.channelId,})
    }
  };
}
