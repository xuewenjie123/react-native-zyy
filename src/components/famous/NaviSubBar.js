'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TextInput,Text, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';

class NaviSubBar extends Component {
  render() {
    var subbar = this.props.subbar
    return (
      <View style={styles.bar1}>
        <View style={styles.bar2}>
            <TouchableOpacity style={(subbar == "introduction")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
              onPress={() => {this.props.changePage("introduction")}}>
              {(subbar == "introduction")?(<Image style={{width: 16, height: 16,marginRight: 6,}} source={require('../../images/icon-32-5.png')}/>):null}
              <Text style={(subbar == "introduction")?styles.onitem:styles.offitem}>简介</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(subbar == "literature")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
              onPress={() => {this.props.changePage("literature")}}>
              {(subbar == "literature")?(<Image style={{width: 16, height: 16,marginRight: 6,}} source={require('../../images/icon-32-5.png')}/>):null}
              <Text style={(subbar == "literature")?styles.onitem:styles.offitem}>文献</Text>
            </TouchableOpacity>
            <TouchableOpacity style={(subbar == "lecture")?styles.indexTouch:styles.indexTouch2} underlayColor='transparent'
              onPress={() => {this.props.changePage("lecture")}}>
              {(subbar == "lecture")?(<Image style={{width: 16, height: 16,marginRight: 6,}} source={require('../../images/icon-32-5.png')}/>):null}
              <Text style={(subbar == "lecture")?styles.onitem:styles.offitem}>讲座</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  bar1: {
    width: width-24,
    height: 45,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
  },
  bar2: {
    width: width-24,
    height: 45,
    marginBottom: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indexTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 45,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: color.main1C,
    marginBottom: -2,
  },
  indexTouch2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 45,
  },
  onitem: {
    fontSize: 15,
    color: color.main1C,
  },
  offitem: {
    fontSize: 15,
    color: color.font1C,
  },
});

module.exports = NaviSubBar
