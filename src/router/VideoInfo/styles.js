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
    position:"relative",
  },
  mainContainer:{
    flex: 1,
    backgroundColor: "#000",
    flexDirection: 'column',
    padding: 0,
    position:"relative",
  },
  backButton:{
    position:"absolute",
    left:10,
    top:30,
    width:11,
    height:22,
    zIndex:1000,
  },
  box:{
    backgroundColor:color.back1C,
    width:width,
    flex:1,
    alignItems:"center",
  },
  rowSpace:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:width-24,
  },
  leftBace:{
    justifyContent:"center",
    height:40,
  },
  slideBox:{
    width:width,
    height:40,
    justifyContent:"center",
    position:"relative",
    top:-40*width/750,
    zIndex:100,
  },
  text1: {
    fontSize: 12,
    color: color.font2C,
  },
  cont_text_b2: {
    fontSize: 13,
    color: color.font2C,
  },
  cont_list_b:{
    width:width-24,
    height:width*154/750,
    alignItems:"center",
    borderTopWidth:0.5,
    borderColor:color.boeder2c,
    flexDirection:"row",
  },
  cont_text_b:{
    paddingLeft:10,
    justifyContent:"space-around",
    height: width*98/750,
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
  con_b_small:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:width-width*112/750-10-24,
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

});

module.exports = styles
