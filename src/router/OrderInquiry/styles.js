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
  order_header:{
    width:width,
    height:36,
    borderColor:'#dedbd7',
    borderBottomWidth:1,
    backgroundColor:color.back1C,
    flexDirection:"row",
  },
  info_btn:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  orders_text:{
    fontSize:15,
    color:color.font2C,
  },
  active:{
    borderBottomWidth:2,
    borderColor:color.main1C,
  },
  activeText:{
    color:color.main1C,
  },
  noneGoods:{
    paddingTop:width*270/750,
    alignItems:"center",
    flex:1,
  },
  none_img:{
    width:176,
    height:104,
  },
  orderRow:{
    width:width,
    borderColor:color.line1C,
    borderTopWidth:1,
    justifyContent:'center',
    alignItems:'center',
  },
  finsh_text:{
    lineHeight:32,
    fontSize:14,
    color:color.font2C,
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
    width:width-30,
    flexDirection:"row",
  },
  textGenneral:{
    fontSize:12,
    color:color.font2C,
  },
  listLeft:{
    width:71,
    height:71,
    borderWidth:1,
    borderColor:color.line1C,
    alignItems:"center",
    justifyContent:"center"
  },
  return_img:{
    width:46,
    height:61,
  },
  listRight:{
    height:70,
    paddingLeft:10,
    width:width-30-71,
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
  footRight:{
    position:"relative",
    width:133*width/750+5,
    height:48*width/750+2,
    alignItems:"center",
    justifyContent:"center",
  },
  yes_btn:{
    position:"absolute",
    top:0,
    right:1,
    width:133*width/700,
    height:48*width/700,
  },
  // yes_btn:{
  //   width:133*width/750,
  //   height:48*width/750,
  //   alignItems:"center",
  //   justifyContent:"center",
  // },

  f_text:{
    fontSize:12,
    color:color.font2C,
  },
  yes_text:{
    fontSize:14,
    color:color.main1C,
  }
})

module.exports = styles;
