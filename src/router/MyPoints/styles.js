'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';

const styles = StyleSheet.create({
 main: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    width:width,
    height:height,
  },
   main_label:{
    alignItems: 'center',
  },
  point_h: {
    width:width,
    height:297*width/750,
    position:"absolute",
    top:0,
  },
  point:{
    position:"relative",
    height:297*width/750,
    width:width,
    alignItems:"center",
    justifyContent:"center",
  },
  point_text:{
    fontSize:12,
    lineHeight:12,
    color:"#f79373",
  },
  point_num:{
    fontSize:24,
    lineHeight:38,
    color:color.main1C,
  },
  Record:{
    width:width,
    backgroundColor:color.mainBg2C,
    height:30,
    paddingLeft:12,
    alignItems:"flex-start",
    justifyContent:'center',
  },
  Record_text:{
    fontSize:12,
    color:color.font3C,
  },
  labels:{
    width:width-24,
    height:60,
    borderBottomWidth:1,
    borderColor:"#ddd",
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  lt_text:{
    paddingTop:15,
    fontSize:15,
    lineHeight:15,
    color:color.back3C,
  },
  lb_text:{
    paddingTop:12,
    fontSize:12,
    lineHeight:12,
    color:color.font2C,
  },
  lr_text:{
    paddingTop:18,
    fontSize:15,
    lineHeight:15,
    color:color.back3C,
  },
})

module.exports = styles;
