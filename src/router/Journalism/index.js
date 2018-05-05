'use strict';
import React, { Component, } from 'react';
import { DeviceEventEmitter,View, Image, ScrollView,Text, TouchableOpacity, ToastAndroid, InteractionManager,TouchableHighlight,BackHandler} from 'react-native';

var styles =require('./styles');
import { list, archives, }  from '../../service/journalism';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import NavWait from '../../components/common/NavWait';
import ListModal from './list';
import color from '../../constant/color';
var _navigator,_this,_state,_props;


var lists=[
  {name:"全部新闻",id_:0},
  {name:"政务新闻",id_:1},
  {name:"行业热点",id_:2},
  {name:"重要活动",id_:3},
  {name:"科普视频",id_:4},
  {name:"养生常识",id_:5},
  {name:"中药方剂",id_:6},
  {name:"金牌中医",id_:7},
  {name:"视频",id_:8},
  {name:"其他",id_:9},
]
export default class Journalism extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list:[],
      channelId: this.props.navigation.state.params.channelId,
      onoff:true,
    }
  }

  componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function(){});
     InteractionManager.runAfterInteractions(() => {
      list("",_this.listResult);
    });
   }
   componentWillUnmount(){
    DeviceEventEmitter.emit("changeUI","来通知了")
  }
  _showBtns(){
    this.setState({
      onoff:!this.state.onoff
    })
    console.log(this.state.onoff)
  }
  listResult(result){
    if(result.httpCode == 200){
      if(result.list){
        var list = [{name:"全部新闻",id_:0}].concat(result.list)
        if(_state.channelId != ''){
          _this.setState({list:list,})
        }else{
          _this.setState({list:list,channelId: list[0].id_})
        }
      }
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  changechannel(id){
    _this.setState({channelId:id})
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "发现更多",
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
    let ListModalProps = {
      navigation:_navigator,
      channelId : _state.channelId,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>

                {
                _state.list.length?
                        _state.onoff?
                                  <View style={styles.paginShow}>
                                      <View style={styles.paginInfo}>
                                          <Text style={styles.paginText}>分类</Text>
                                          <TouchableHighlight style={styles.pushBtn} onPress={()=>_this._showBtns()} underlayColor="#fff" onLongPress={()=>_this._showBtns()}>
                                              <Image source={_state.onoff?require('../../images/pushArrowt.png'):require('../../images/pushArrowb.png')} style={{width:10,height:5}}/>
                                          </TouchableHighlight>
                                      </View>

                                      <View style={styles.paginCenter}>
                                          {_state.list.map((d,index)=>(
                                              <View style={styles.btnBox} key={index}>
                                                  <TouchableOpacity  style={(d.id_ == _state.channelId)?styles.paginActive:styles.paginGen} underlayColor='transparent'  onPress={() => {_this.changechannel(d.id_)}}>
                                                        <Text style={(d.id_ == _state.channelId)?styles.scrolltexton:styles.scrolltext} numberOfLines={1}>
                                                          {d.name}
                                                        </Text>
                                                  </TouchableOpacity>
                                              </View>
                                            ))}
                                      </View>
                                  </View>
                                  :
                               <View style={styles.scrollbar}>
                                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollview}>
                                    {_state.list.map((d,index)=>(
                                      <TouchableOpacity key={index} style={(d.id_ == _state.channelId)?styles.scrollitemon:styles.scrollitem} underlayColor='transparent'
                                        onPress={() => {_this.changechannel(d.id_)}}>
                                        <Text style={(d.id_ == _state.channelId)?styles.scrolltexton:styles.scrolltext}>
                                          {d.name}
                                        </Text>
                                      </TouchableOpacity>
                                    ))}
                                  </ScrollView>
                                  <TouchableHighlight style={[styles.pushBtn,{position:"absolute",right:0,top:0,}]} onPress={()=>_this._showBtns()} underlayColor="#fff">
                                      <Image source={_state.onoff?require('../../images/pushArrowt.png'):require('../../images/pushArrowb.png')} style={{width:10,height:5}}/>
                                  </TouchableHighlight>
                                </View>
                        :
                        null
                }
          {_state.list.length?(<ListModal {...ListModalProps}/>):(<NavWait />)}
        </View>
      </View>
    );
  }

};
