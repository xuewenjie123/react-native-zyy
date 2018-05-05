'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from './../../constant/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    width:width,
    height:height,
    backgroundColor: color.mainBg2C,
  },
  label:{
    width:width,
    height:46,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    borderBottomWidth:1,
    borderColor:"#eae8e3",
    backgroundColor:color.back1C,
    marginTop:15,
  },
  label_box:{
    width:width-24,
    height:46,
    flexDirection:"row",
    alignItems:"center",

  },
  text:{
    fontSize:15,
    color:color.back3C,
  },
  getnumbtn:{
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:25,
    backgroundColor:'#b9b9b9',
  },
   getnumtext:{
    fontSize:12,
    color:color.back1C,
  },
  notice:{
    flex:1,
    marginTop:15,
    paddingLeft:12,
    alignItems:"center",
  },
  notice_text:{
    fontSize:14,
    lineHeight:25,
    color:color.font1C,
  },
  sendGenaral:{
    width:width,
    height:44,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#dddddd"
  },
  sendActive:{
    width:width,
    height:44,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:color.main1C,
  },
  TextGenaral:{
    fontSize:15,
    color:"#bbb",
  },
  TextActive:{
    fontSize:15,
    color:color.font4C,
  }
})

module.exports = styles;
