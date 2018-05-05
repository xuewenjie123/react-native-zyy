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
    alignItems:"center",
  },
  bookInfo:{
    backgroundColor:color.back1C,
    paddingTop:20,
    width:width,
    alignItems:"center",
  },
  bookcenter:{
    width:width-24,
    paddingBottom:10,
  },
  imgcenter:{
    alignItems:"center",
    width:width-24,
    paddingBottom:15,
  },
  text1:{
    fontSize:15,
    color:color.font3C,
  },
  text2:{
    fontSize:18,
    color:color.main1C,
  },
  bookSpace:{
    width:width-24,
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
  },
  text3:{
    fontSize:12,
    color:color.font2C,
    marginLeft:4,
    lineHeight:24,
    textDecorationLine:'line-through',
  },
  text4:{
    fontSize:12,
    color:color.main1C,
  },
  price:{
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
  },
  bar1: {
    marginTop:12,
    width: width,
    backgroundColor:color.back1C,
    alignItems:"center",
    height: 45,

  },
  bar2: {
    width: width-24,
    height: 45,
    // marginBottom: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: color.line1C,
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
    // marginBottom: -2,
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
  footer:{
    height:99*width/750,
    borderColor:color.border1c,
    borderTopWidth:0.5,
    width:width,
    flexDirection:"row",
  },
  btn1:{
    width:99*width/750,
    borderRightWidth:0.5,
    borderColor:color.border1c,
    alignItems:"center",
    justifyContent:"center",
  },
  btn2:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  btn3:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:color.main1C,
  },
  text7:{
    fontSize: 15,
    color: color.back1C,
  },
  text6:{
    fontSize: 15,
    color: color.font2C,
    fontWeight:'bold',
    marginRight:4,
  },
  contentViewStyle:{
      flex:1,
     flexDirection:'row',
     flexWrap:'wrap',
     width:width,
 },
 smallbox:{
   width:340/750*width,
   height:width*330/750,
   alignItems:"center",
   marginTop:15,
   marginRight:12
 },
 imgBox:{
   width:340/750*width,
   height:width*244/750,
   position:"relative",
 },
 videoImg:{
   width:340/750*width,
   height:width*244/750,
   borderWidth:1,
   borderColor:"#e1e1e1",
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
 cont_box: {
   marginTop:10,
   marginRight:10,
   width: width*330/750,
   height:width*496/750,
 },
 cont_text_a: {
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

});

module.exports = styles
