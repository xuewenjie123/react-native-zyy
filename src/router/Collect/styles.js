'use strict';
import { StyleSheet, StatusBar} from 'react-native';
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
    backgroundColor:color.back1C,
  },
  header_box:{
    width: width,
  },
  marginbox:{
    backgroundColor: color.mainBg2C,
    height:12,
    width:width,
  },
  bar: {
    width: width,
    height: 45+StatusBar.currentHeight,
    paddingTop:StatusBar.currentHeight,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.main1C,
  },
  leftbar: {
    height: 45,
    flex: 1,
  },
  btngroup:{
    height:58,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center",
  },

  ArticleBtn:{
    height:29,
    width:80,
    backgroundColor:color.back1C,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    alignItems:'center',
    justifyContent:'center',
  },
  btnArtice:{
    height:29,
    width:80,
    backgroundColor:color.main1C,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0.5,
    borderRightWidth:0,
    borderColor:color.back1C,
  },
  commodityBtn:{
    height:29,
    width:80,
    backgroundColor:color.main1C,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0.5,
    borderLeftWidth:0,
    borderColor:color.back1C,
  },
  btnCommodity:{
    height:29,
    width:80,
    backgroundColor:color.back1C,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    alignItems:'center',
    justifyContent:'center',
  },
  textgeneral:{
    fontSize:15,
    color:color.back1C,
  },
  label_box:{
    width:width,
    alignItems:"center",
    justifyContent:"flex-start",
  },
  labels:{
    width:width-24,
    flexDirection:"row",
    height:91,
    alignItems:"center",
    borderColor:"#ddd",
    borderBottomWidth:1,
  },
  left_img:{
    width:70,
    height:70,
    marginRight:10,
  },
  right_des:{
    height:70,
    width:width-24-80,
    justifyContent:"space-around",
  },
  book_name:{
    fontSize:15,
    color:color.back3C,
    fontFamily:"sunsun",
  },
  writer:{
    fontSize:12,
    color:color.font2C,
    paddingLeft:5,
  },
  monney:{
    fontSize:18,
    color:color.main1C,
    fontWeight:"bold"
  }

})

module.exports = styles;
