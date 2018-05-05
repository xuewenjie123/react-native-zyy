'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Modal,Text, TextInput,} from 'react-native';
import color from './../../constant/color';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


class TryOrBuy extends Component {

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
        onRequestClose={() => {}}
        >
        <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity:0.7,}}>
          <TouchableOpacity style={{flex:1}} onPress={() => {_props.onClose()}}>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.container}>
            <Text style={[styles.text1,{marginBottom: 18}]}>温馨提示</Text>

            <View style={styles.box_none}>
              <Text style={styles.text5}>您还没有购买本音频</Text>
            </View>

            <View style={styles.box1}>
              <TouchableOpacity onPress={() => {_props.onClose()}}>
                <Image style={{width: 84, height: 24,alignItems:"center",justifyContent:"center"}} source={require('./../../images/tryLids.png')}>
                  <Text style={styles.text3}>试听</Text>
                </Image>
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 25,backgroundColor:color.main1C,width:84,height:24,alignItems:"center",justifyContent:"center"}} onPress={() => {_props.onOk({name:_state.name,num:_state.num,phone:_state.phone})}}>
                <Image style={{width: 80, height: 22,alignItems:"center",justifyContent:"center"}} source={require('./../../images/clickbook2.png')}>
                  <Text style={styles.text4}>购买</Text>
                </Image>
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
  box_none:{
    height:190*width/750,
    justifyContent:"center",
    alignItems:"center",
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
  text3:{
    fontSize:14,
    color:color.main1C,
  },
  text4:{
    fontSize:14,
    color:color.back1C,
  },
  text5:{
    fontSize:14,
    color:color.font2C,
  }
});
export default TryOrBuy
