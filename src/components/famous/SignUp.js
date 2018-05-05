'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableOpacity,Text, Modal, TextInput,BackAndroid} from 'react-native';
import color from './../../constant/color';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


class SignUp extends Component {
  // componentWillMount(){
  //     BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid );
  // }
  //
  // componentUnWillMount(){
  //     BackAndroid.addEventListener('hardwareBackPress', this._onBackAndroid);
  // }
  // _onBackAndroid=()=>{
  //   var _this=this;
  //   console.log("啊我付款是点击福克斯的房间里看到说服力可视对讲六块腹肌打算离开房间德鲁克说减肥了肯定是")
  //   if(_this.props.visible){
  //       _this.props.onClose()
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      num:"",
      phone:"",
    }
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={_props.visible}
        onRequestClose={() => {_props.onClose()}}
        >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
          <TouchableOpacity style={{flex:1}} onPress={() => {_props.onClose()}}>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.container}>
            <Text style={[styles.text1,{marginBottom: 18}]}>预约信息</Text>
            <View style={styles.line}>
              <Text style={[styles.text1,{width: 45}]}>姓名</Text>
              <TextInput underlineColorAndroid="transparent" style={{color:'#333',flex: 1,fontSize:12,textAlign:'left',margin:0,padding:0,}}
                value={_state.name} onChangeText={(text)=>{_this.setState({name:text})}}/>
            </View>
            <View style={styles.line}>
              <Text style={[styles.text1,{width: 45}]}>人数</Text>
              <TextInput underlineColorAndroid="transparent" style={{color:'#333',flex: 1,fontSize:12,textAlign:'left',margin:0,padding:0,}}
                value={_state.num} keyboardType={"numeric"} onChangeText={(text)=>{_this.setState({num:text})}}/>
            </View>
            <View style={styles.line}>
              <Text style={[styles.text1,{width: 45}]}>电话</Text>
              <TextInput underlineColorAndroid="transparent" style={{color:'#333',flex: 1,fontSize:12,textAlign:'left',margin:0,padding:0,}}
                value={_state.phone} keyboardType={"numeric"} onChangeText={(text)=>{_this.setState({phone:text})}}/>
            </View>
            <View style={styles.box1}>
              <TouchableOpacity onPress={() => {_props.onClose()}}>
                <Image style={{width: 80, height: 24,}} source={require('./../../images/m-160-1.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 25}} onPress={() => {_props.onOk({name:_state.name,num:_state.num,phone:_state.phone});_this.setState({name:"",num:"",phone:""})}}>
                <Image style={{width: 80, height: 24,}} source={require('./../../images/m-160-2.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width:316,
    backgroundColor: color.back1C,
    borderRadius : 2,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    width:286,
    height:69*width/750,
    borderBottomWidth: 1,
    borderColor: color.line1C,
    borderStyle: "solid",
    flexDirection: 'row',
    alignItems: 'center',
  },
  box1: {
    width:286,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize:13,
    color: color.font1C,
  },
  text2: {
    fontSize:12,
    color:color.font3C,
  },
});

module.exports = SignUp
