'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity ,Text} from 'react-native';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';

class NaviSubBar extends Component {
  render() {
    var subbar = this.props.subbar
    return (
      <View style={styles.bar1}>
        <View style={styles.bar3}>
          <TouchableOpacity style={(subbar == "all")?styles.indexTouch:styles.indexTouch2} activeOpacity={1}
            onPress={() => {this.props.changePage("all")}}>
            {(subbar == "all")?(
              <Image style={{width: 16, height: 14,marginRight: 4,}} source={require('../../images/icon-32-9.png')}/>
            ):(
              <Image style={{width: 16, height: 14,marginRight: 4,}} source={require('../../images/icon-32-8.png')}/>
            )}
            <Text style={(subbar == "all")?styles.onitem:styles.offitem}>全部</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bar2}></View>
        <View style={styles.bar3}>
          <TouchableOpacity style={(subbar == "host")?styles.indexTouch:styles.indexTouch2} activeOpacity={1}
            onPress={() => {this.props.changePage("host")}}>
            {(subbar == "host")?(
              <Image style={{width: 14, height: 14,marginRight: 4,}} source={require('../../images/icon-28-2.png')}/>
            ):(
              <Image style={{width: 14, height: 14,marginRight: 4,}} source={require('../../images/icon-28-1.png')}/>
            )}
            <Text style={(subbar == "host")?styles.onitem:styles.offitem}>热度</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bar2}></View>
        <View style={styles.bar3}>
          <TouchableOpacity style={(subbar == "time")?styles.indexTouch:styles.indexTouch2} activeOpacity={1}
            onPress={() => {this.props.changePage("time")}}>
            {(subbar == "time")?(
              <Image style={{width: 16, height: 16,marginRight: 4,}} source={require('../../images/icon-32-7.png')}/>
            ):(
              <Image style={{width: 16, height: 16,marginRight: 4,}} source={require('../../images/icon-32-6.png')}/>
            )}
            <Text style={(subbar == "time")?styles.onitem:styles.offitem}>时间</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  bar1: {
    width: width,
    height: 45,
    backgroundColor: color.back1C,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar2: {
    width: 1,
    height: 10,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
  },
  bar3: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  indexTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: color.main1C,
  },
  indexTouch2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: color.back1C,
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
