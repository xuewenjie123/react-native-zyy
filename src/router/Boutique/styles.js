'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.mainBg2C,
    flexDirection: 'column',
    padding: 0,
  },
  box:{
    backgroundColor:color.back1C,
    marginBottom:12,
    width:width,
    alignItems:"center",
    justifyContent:"center",
  },
  rowSpace:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:width-24,
    height:90*width/750,
    borderBottomWidth:0.5,
    borderColor:color.boeder2c,
  },
  text_a: {
    fontSize: 12,
    color: color.font3C,
  },

  rowsRcenter:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:85*width/750,
  },
  leftBace:{
    flexDirection:"row",
    alignItems:"center",
  },
  rightBace:{
    flexDirection:"row",
    alignItems:"center",
  },
  rows_c: {
    width:width-24,
    flexDirection: 'row',
    justifyContent:"space-around",
    alignItems:"center",
  },
  text_b: {
    fontSize: 15,
    color: color.back3C,
  },
  cont_list: {
    width: width-24,
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: 'wrap',
  },
  cont_box: {
    marginTop:10,
    width: width*340/750,
    height:width*496/750,
  },
  cont_text_a: {
    width: width*340/750,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  cont_text_a1: {
    fontSize: 13,
    color: color.back3C,
  },
  cont_text_a2: {
    fontSize: 18,
    color: color.main1C,
  },
  cont_text_a3: {
    fontSize: 12,
    color: color.font2C,
  },
  cont_list_b:{
    width:width-24,
    height:width*159/750,
    alignItems:"center",
    borderTopWidth:0.5,
    borderColor:color.boeder2c,
    flexDirection:"row",
  },
  cont_text_b:{
    paddingLeft:10,
    justifyContent:"space-around",
    height: width*98/750,
    width:width-24-width*144/750-10,
  },
  cont_text_b1: {
    fontSize: 15,
    color: color.back3C,
  },
  cont_text_b2: {
    fontSize: 13,
    color: color.font2C,
  //  paddingLeft:5,
  },
  list_c:{
    flexDirection: 'row',
    width:width-17,
    flexWrap: 'wrap',
    paddingBottom:10,
  },
  cont_list_c:{
    width:width*170/750,
    height:width*50/750,
    borderWidth:0.5,
    borderColor:color.border1c,
    alignItems:"center",
    justifyContent:"center",
    marginLeft:7*width/750,
    marginBottom:10,
  },
  text_c: {
    fontSize: 15,
    color: color.font2C,
  },



  videoBox:{
    width:width-30,
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
  },
  smallbox:{
    width:340/750*width,
    height:width*330/750,
    alignItems:"center",
    marginTop:15,
  },
  imgBox:{
    width:340/750*width,
    height:width*244/750,
    position:"relative",
  },
  videoImg:{
    width:340/750*width,
    height:width*244/750,
  },
  collecBack:{
    width:40,
    height:20,
    position:"absolute",
    right:0,
    bottom:0,
    backgroundColor:"#000",
    opacity:0.5,
  },
  collecBox:{
    width:40,
    height:20,
    position:"absolute",
    right:0,
    bottom:0,
    justifyContent:"center",
    alignItems:"center",
  },
  collection:{
    fontSize:12,
    color:color.font4C,
  },
  videoInfo:{
    backgroundColor:color.back4C,
    width:340/750*width,
    height:width*86/750,
  },
  textName:{
    fontSize:13,
    color:color.back3C,
  },


});

module.exports = styles
