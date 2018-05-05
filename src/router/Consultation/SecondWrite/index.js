'use strict';
import React, { Component, } from 'react';
import { View, Image, DeviceEventEmitter,ScrollView, TouchableOpacity, ToastAndroid,Text, TextInput, BackHandler} from 'react-native';//InteractionManager
import styles from './styles';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../../constant/storage';
import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import color from '../../../constant/color';
var _navigator,_this,_state,_props;
import {getQuestion,setQuestion,getQueDetail,setReply} from '../../../service/consultation';
var lastBackPressed;
export default class Write extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivesId:this.props.navigation.state.params.famousId,
      contents:'',
      quesWay:'',
      questionId:this.props.navigation.state.params.questionId,
      userType:'expert',
      isSelf:this.props.navigation.state.params.isSelf
    }
  }
  componentDidMount(){
    console.log(_state.isSelf);
   BackHandler.addEventListener('hardwareBackPress', function(){});
    getStorage('login',function(error,data){
        if(data){
            if(data.userType=="expert"&&_state.isSelf){
                _this.setState({
                  quesWay:"回复",
                  userType:'expert'
                })
            }else{
              _this.setState({
                quesWay:"追问",
                userType:'general'
              })
            }
        }
    })
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
              // _navigator.navigate('ConsultationDetail',{questionId:response.id,Talking:_this.props.navigation.state.params.Talking})
              _navigator.goBack()
              DeviceEventEmitter.emit("changeConsulationDetail")
            }else{
              ToastAndroid.show(response.msg,ToastAndroid.SHORT)
            }
        }
    if(_state.contents===''){
      ToastAndroid.show('请输入您要提交的内容',ToastAndroid.SHORT);
      return false;
    }else {
      console.log(_state.archivesId)
          if(_state.userType=="expert"){
              setReply({reply:_state.contents,questionId:_state.questionId},resultFu)
          }else{
              setQuestion({famousId:_state.archivesId,question:_state.contents,quesId:_state.questionId},resultFu)
          }
    }

  }

  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title:_state.quesWay,
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
