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
  place_l:{
    width:16,
    height:16,
  },
  none_img:{
    width:167,
    height:107,
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
  videoBox:{
    width:width-30,
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
  },
  smallbox:{
    width:332/750*width,
    height:width*326/750,
    alignItems:"center",
    marginTop:15,
  },
  imgBox:{
    width:330/750*width,
    height:width*200/750,
    position:"relative",
  },
  videoImg:{
    width:330/750*width,
    height:width*200/750,
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
    backgroundColor:color.white3C,
    width:330/750*width+2,
    height:width*125/750+1,
    borderColor:color.line1C,
    borderWidth:0.5,
    borderTopWidth:0,
  },
  textName:{
    fontSize:13,
    color:color.font1C,
  },
  textInfo:{
    fontSize:12,
    color:color.font2C,
    lineHeight:18
  }
})

module.exports = styles;
