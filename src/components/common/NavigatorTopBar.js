'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, Text,TextInput, TouchableOpacity, StatusBar, } from 'react-native';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';

class NavigatorTopBar extends Component {
  render() {
    var _props = this.props;
    return (_props.visible)?(
      <View style={styles.bar}>
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle="light-content"
        />
        <View style={styles.leftbar}>
          {_props.leftView?_props.leftView:null}
        </View>
        <View style={styles.titlebar}>
          <Text style={styles.title} numberOfLines={1}>
            {_props.title}
          </Text>
        </View>
        <View style={styles.rightbar}>
          {_props.rightView?_props.rightView:null}
        </View>
      </View>
    ):(
      <View style={styles.nobar}>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  nobar: {
    flex: 0,
  },
  bar: {
    width: width,
    height: 40+StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
    paddingBottom:10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.main1C,
  },
  leftbar: {
    height: 45,
    flex: 1,
  },
  titlebar: {
    height: 45,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: color.back1C,
    textAlign: 'center',
  },
  rightbar: {
    height: 45,
    flex: 1,
  },
});

export default NavigatorTopBar
