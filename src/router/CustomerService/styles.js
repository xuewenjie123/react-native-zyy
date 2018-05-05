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
    backgroundColor: color.mainBg2C,
  },
  address_loadbox:{
    width:width,
    height:width*532/750,
    paddingTop:width*266/750,
    alignItems:"center",
  },
  load_img:{
    width:167,
    height:width*202/750,
  },
  load_text:{
    fontSize:14,
    color:color.font2C,
    lineHeight:32,
  },
  label_box:{
    width:width,
    alignItems:"center",
    backgroundColor:color.back1C,
    marginTop:10,
    borderBottomWidth:1,
    borderColor:"#eae8e3",
  },
  labels:{
    width:width-24,
    flexDirection:"row",
  },
  textGenneral:{
    fontSize:12,
    color:color.font2C,
    lineHeight:26,
  },
  listLeft:{
    width:71,
    height:71,
    borderWidth:0.5,
    borderColor:color.line1C,
    alignItems:"center",
    justifyContent:"center"
  },
  return_img:{
    width:46,
    height:63,
  },
  listRight:{
    height:70,
    paddingLeft:10,
    width:width-24-71,
  },
  name_text:{
    fontSize:15,
    color:color.back3C,
  },
  goods_info:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  textPrice:{
    fontSize:15,
    color:color.main1C,
  },

})

module.exports = styles;
