'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, DeviceEventEmitter,TouchableOpacity, ToastAndroid,Text, TextInput, BackHandler} from 'react-native';//InteractionManager
var styles =require('./styles');
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');

import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import color from '../../../constant/color';
var _navigator,_this,_state,_props;
import {getQuestion,setQuestion,getQueDetail} from '../../../service/consultation';
var lastBackPressed;
export default class Write extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivesId:this.props.navigation.state.params.famousId,
      contents:'',
    }
  }
  componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function(){});
     _this.refs.TextInput.focus();
   }
  _submit(){
    if (lastBackPressed&&lastBackPressed + 2000 >= new Date().getTime()){
         return false
      }
    lastBackPressed=new Date().getTime()
    _this.refs.TextInput.blur();
      var resultFu = function(response){
            if(response.httpCode ==  200){
              ToastAndroid.show('提交成功',ToastAndroid.SHORT)
              // _navigator.navigate('ConsultationDetail',{questionId:response.id,Talking:true})
              _navigator.goBack()
              DeviceEventEmitter.emit("changeConsulationDetail")
              DeviceEventEmitter.emit("changeTalking")
            }else{
              ToastAndroid.show(response.msg,ToastAndroid.SHORT)
            }
        }
    if(_state.contents===''){
      ToastAndroid.show('请输入您要提交的内容',ToastAndroid.SHORT);
      return false;
    }else {
      console.log(_state.archivesId)
      setQuestion({famousId:_state.archivesId,question:_state.contents},resultFu)
    }

  }

  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "咨询",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Text style={{fontSize:15,color: "#fff"}}>
              {"取消"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
      rightView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this._submit()}}>
          <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end",}}>
            <Text style={{fontSize:15,color: "#fff"}}>
              {"提交"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={[styles.main,{padding:12}]}>
          <TextInput ref={"TextInput"} underlineColorAndroid="transparent" autoFocus  multiline  maxLength={200} blurOnSubmit={true}
            style={{color:'#666666',height: height-120,fontSize:15,textAlign:'left',margin:0,padding:0,textAlignVertical: 'top'}}
            placeholder='请输入...' value={_state.contents} onChangeText={(text)=>{_this.setState({contents:text})}}/>
        </View>
      </View>
    );
  }

};
