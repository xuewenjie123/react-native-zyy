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
  bookheader:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:width,
    height:44,
    backgroundColor: color.back1C,
    borderColor:color.hBorder1x,
    borderBottomWidth:1,
  },
  bookPlace:{
    flexDirection:"row",
    alignItems:"center",
    height:43,
  },
  headText:{
    fontSize:15,
    color:color.font2C,
    marginLeft:5,
  },
  row:{
    width:width,
    borderColor:color.hBorder1x,
    borderBottomWidth:1,
    flexDirection:"row",
    justifyContent:"center",
    backgroundColor:color.back1C,
  },
  rowLbael:{
    width:width-30,
    paddingTop:15,
  },
  RowTop:{
    width:width-30,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  imgRow:{
    width:148*width/750,
    height:width*198/750,
  },
  rowTopLeft:{
    width:148*width/750+2,
    height:width*198/750+2,
    borderColor:"#e9eced",
    borderWidth:0.5,
    marginRight:10,
  },
  RowTopRight:{
    flex:1,
  },
  bookName:{
    fontSize:15,
    color:color.font1C,
    lineHeight:15,
  },
  bookWriter:{
    fontSize:12,
    marginTop:15,
    color:color.font2C,
    fontFamily:"宋体",
  },
  bookInfo:{
    marginTop:10,
    fontSize:12,
    color:color.font2C,
  },
  RowBt:{
    width:width-30,
    height:50,
    justifyContent:"space-between",
    paddingTop:10,
    flexDirection:"row",
  },
  botTextBox:{
    height:40,
    justifyContent:"center",
  },
  ReadBtn:{
    justifyContent:"center",
    alignItems:"center",
    width:60,
    height:25,
    borderWidth:0.5,
    borderColor:color.main1C,
  },
  ReadText:{
    fontSize:13,
    color:color.main1C,
  },
  place_l:{
    width:16,
    height:16,
  },
  none_img:{
    width:167,
    height:106,
  },
  nonebooks:{
    paddingTop:width*270/750,
    alignItems:"center",
    flex:1,
  },
  finsh_text:{
    lineHeight:32,
    fontSize:14,
    color:color.font2C,
  },
  listLeft:{
    width:71,
    height:71,
    borderWidth:0.5,
    borderColor:color.line1C,
    alignItems:"center",
    justifyContent:"center"
  },
  yes_text:{
    fontSize:14,
    color:color.main1C,
  }
})

module.exports = styles;
