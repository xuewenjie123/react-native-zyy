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
  box:{
    backgroundColor:color.back1C,
    width:width,
    alignItems:"center",
    justifyContent:"center",
  },

  t_mBox:{
    width:width,
    backgroundColor:color.mainBg2C,
    alignItems:"center",
    justifyContent:"center",
    marginTop:-5*width/750,
  },
  t_box:{
    width:width-30,
    justifyContent:"space-between",
    flexDirection:"row",
    height:39,
    alignItems:"center",
  },
  t_box_l:{
    flexDirection:"row",
    alignItems:"center"
  },
  leftRow:{
    paddingLeft:15,
  },
  text1:{
    fontSize:15,
    color:color.font1C,
  },
  text2:{
    fontSize:12,
    color:color.font2C,
  },
  text3:{
    fontSize:15,
    color:color.font2C,
  },
  activeText:{
    fontSize:13,
    color:color.main1C,
  },
  text4:{
    fontSize:13,
    color:color.font1C,
  },
  playListBox:{
    width:width,
    alignItems:"center",
    borderColor:color.hBorder1x,
    borderBottomWidth:0.5,
  },
  playList:{
    width:width-30,
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    height:45.5,
  },
  play_btn:{
    flexDirection:"row",
    alignItems:"center",
    height:45,
  },
  cancelBtn:{
    padding:20,
    paddingRight:0,
  },

  h_box_r:{
    width:40,
    height:40,
    alignItems:"flex-end",
    justifyContent:"center",
    position:"absolute",
    zIndex:1000,
    right:12,
    top:0,
  },
  slideBox:{
    width:width,
    height:10,
    justifyContent:"center",
    position:"relative",
    top:-10*width/750,
    zIndex:100,
  },
  textTitle1:{
    fontSize:15,
    color:color.back1C,
    marginTop:10,
  },
  textTitle2:{
    marginTop:8,
    fontSize:12,
    color:color.font2C,
  },
  date_box1:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:width-24,
  },
  box_head:{
    alignItems:"center",
    width:width-48,
    paddingTop:24,
    paddingBottom:33,
  },
  cont_text_b1: {
    fontSize: 15,
    color: color.back3C,
  },
  cont_text_b4: {
    fontSize: 13,
    lineHeight:20,
    color: color.font3C,
  },
  button:{
    margin:20,
    height:39,
    alignItems:'center',
    justifyContent:'center',
    width:width-40,
    backgroundColor:color.main1C,
  },
  loginbtn:{
    fontSize:15,
    color:color.back1C,
  },


})

module.exports = styles;
