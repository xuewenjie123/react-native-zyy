// 'use strict';
// import React, { Component, } from 'react';
// import { StyleSheet, View, Image, TextInput, TouchableOpacity, } from 'react-native';
// import { TextFont } from '../../constant/text';
// var Dimensions = require('Dimensions');
// var { width, height } = Dimensions.get('window');
// import color from '../../constant/color';
//
// var _navigator;
// var list = {
//   find: require('../../images/icon-44-a1-1.png'),
//   findOn: require('../../images/icon-44-a1.png'),
//   famous: require('../../images/icon-44-a2-1.png'),
//   famousOn: require('../../images/icon-44-a2.png'),
//   boutique: require('../../images/icon-44-a3-1.png'),
//   boutiqueOn: require('../../images/icon-44-a3.png'),
//   mine: require('../../images/icon-44-a4-1.png'),
//   mineOn: require('../../images/icon-44-a4.png'),
// };
//
// class NaviBottomBar extends Component {
//   _onPushRouterFade(id,params){
//     if(id){
//       _navigator.push({
//         title:id,
//         id:id,
//         params:params,
//       });
//     }
//   }
//   render() {
//     _navigator = this.props._navigator;
//     return (
//       <View style={styles.bar}>
//         <View style={styles.indexbar}>
//           <TouchableOpacity
//             style={styles.indexTouch}
//             underlayColor='transparent'
//             onPress={() => {this._onPushRouterFade("Find")}}>
//             <View style={styles.inner}>
//               <Image style={{width: 22, height: 22,marginBottom:4,}} source={this.props.order == "find"?list.findOn:list.find}></Image>
//               <TextFont style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "find"?color.main1C:color.font1C }}>首页</TextFont>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.indexbar}>
//           <TouchableOpacity
//             style={styles.indexTouch}
//             underlayColor='transparent'
//             onPress={() => {this._onPushRouterFade("Famous")}}>
//             <View style={styles.inner}>
//               <Image style={{width: 22, height: 22,marginBottom:4,}} source={this.props.order == "famous"?list.famousOn:list.famous}></Image>
//               <TextFont style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "famous"?color.main1C:color.font1C }}>名家</TextFont>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.indexbar}>
//           <TouchableOpacity
//             style={styles.indexTouch}
//             underlayColor='transparent'
//             onPress={() => {this._onPushRouterFade("Boutique")}}>
//             <View style={styles.inner}>
//               <Image style={{width: 22, height: 22,marginBottom:4,}} source={this.props.order == "boutique"?list.boutiqueOn:list.boutique}></Image>
//               <TextFont style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "boutique"?color.main1C:color.font1C }}>精品</TextFont>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.indexbar}>
//           <TouchableOpacity
//             style={styles.indexTouch}
//             underlayColor='transparent'
//             onPress={() => {this._onPushRouterFade("Mine")}}>
//             <View style={styles.inner}>
//               <Image style={{width: 22, height: 22,marginBottom:4,}} source={this.props.order == "mine"?list.mineOn:list.mine}></Image>
//               <TextFont style={{ fontSize: 11, textAlign: 'center', color: this.props.order == "mine"?color.main1C:color.font1C }}>我的</TextFont>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   }
// };
//
// const styles = StyleSheet.create({
//   bar: {
//     width: width,
//     height: 49,
//     flexDirection: 'row',
//     backgroundColor: color.back1C,
//     borderTopWidth: 1,
//     borderColor: color.line1C,
//   },
//   indexbar: {
//     height: 49,
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   indexTouch: {
//   },
//   inner: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
//
// module.exports = NaviBottomBar
