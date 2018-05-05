'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid,ListView,RefreshControl,Text,BackHandler} from 'react-native';//InteractionManager
var styles =require('./styles');
import { information, knowledge, goldlist } from '../../service/find';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavWait from '../../components/common/NavWait';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var _navigator,_this,_state,_props;
import {getAllVideoList} from '../../service/boutique';

export default class VideoList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
    this.state = {
      dataSource:ds,
      listVideo:[],
      loading:true,
      reset: true,
      total: 0,
      page: 1,
      size: 10,
      load: false,
    }
  }

  componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
     getAllVideoList({page:1},_this.getAllVideoListResult)
  }
  getAllVideoListResult(result){

   if(result.httpCode==200&&result.list.records.length){
     if(_state.reset){
      _this.setState({
        loading:false,
        listVideo:result.list.records,
        dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list.records),
        total: result.list.total,
        size: result.list.size,
        page: result.list.current,
        load: false,
        reset: false,
        start: false,
      })
    }else{
      _this.setState({
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.listVideo.concat(result.list.records)),
        listVideo: _state.listVideo.concat(result.list.records),
        total: result.list.total,
        page: result.list.current,
        load: false,
        loading:false,
      });
    }}else{
      _this.setState({
        loading:false,
        total: 0,
        page: 1,
        load: false,
        reset: false,
      })
    }
  }

  onEndReached(){
    console.log(_state.page,_state.size);
    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      getAllVideoList({page:_state.page+1},_this.getAllVideoListResult)
    }
  }
  onRefresh() {
    if(_state.reset){
      return false
    }
    _this.setState({
      reset:true,
      load:true
    })
    getAllVideoList({page:1},_this.getAllVideoListResult)
  }
  _renderRow(d){
    _this = this
    _navigator = _this.props.navigation;
     return(

       <TouchableOpacity style={styles.smallbox} underlayColor='transparent' onPress={()=>_navigator.navigate('VideoInfo',{videoId:d.id_,VideoList:true})} >
            <View style={styles.imgBox}>
                 <View style={styles.videoImg}><Image source={{uri:d.imgUrl}} style={{width:340/750*width,height:width*244/750,}}/></View>
                {/*<View style={styles.collecBack}></View>
                <View style={styles.collecBox}>
                  <Text style={styles.collection}>{d.collection}</Text>
                </View>*/}
            </View>

              <View style={styles.videoInfo}>
                  <Text style={styles.textName} numberOfLines={2}>{d.goodsName}{d.name}</Text>
              </View>

        </TouchableOpacity>
     )
   }
   renderNoneView(){
     return(
          <View style={styles.nonebooks}>
            <Image source={require('../../images/video_none.png')} style={styles.none_img} />
            <Text style={styles.finsh_text}>没有视频哦</Text>
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
      title: "视频列表",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }

    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
            <View style={styles.main}>
                  <ScrollView>
                              <View style={styles.box}>
                                    {_state.listVideo.length?(

                                        <ListView
                                          enableEmptySections={true}
                                          dataSource={this.state.dataSource}
                                          renderRow={this._renderRow.bind(this)}
                                          initialListSize={10}
                                          style={{width:width-24,}}
                                          contentContainerStyle={styles.contentViewStyle}
                                          scrollRenderAheadDistance={50}
                                          onEndReached={()=>_this.onEndReached()}
                                          onEndReachedThreshold={50}
                                          renderFooter={()=>(<View style={{width:width,paddingTop:15,justifyContent: 'center',alignItems: 'center',}}>
                                            <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                                              {_state.load? '努力加载中...' : '没有数据了'}
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
                                      ):_state.loading?<NavWait />:this.renderNoneView()  }
                              </View>
                  </ScrollView>
              </View>
          </View>
    );
  }

};
