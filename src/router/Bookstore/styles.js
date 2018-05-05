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
  labelBox:{
    width:width,
    alignItems:"center",
    backgroundColor: color.back1C,
  },
  labelsRow:{
    width:width-24,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderBottomWidth:0.5,
    borderColor:color.boeder2c,
    height:282*width/750,
    position:"relative",
  },
  rowSpace:{
    backgroundColor: color.back1C,
    justifyContent:"center",
    alignItems:"center",
    width:width,
    height:89*width/750,
    borderBottomWidth:0.5,
    borderColor:color.boeder2c,
  },
  leftBace:{
    width:width-24,
    flexDirection:"row",
    alignItems:"center",
  },
  text_b:{
    fontSize: 15,
    color: color.back3C,
  },
  footer_text2:{
    color:color.main1C,
    fontSize:18,
    fontWeight:"bold",
  },
  rightRow:{
    width:width-179*width/750-24,
    height:180*width/750,
    paddingLeft:20,
    justifyContent:"space-around",
  },
  textGroup:{
    flex:1,
    height:221*width/750,
    justifyContent:"space-around",
  },
  gorupText1:{
    justifyContent:"center",
    height:94*width/750,
  //  paddingLeft:5,
  },
  gorupText:{
    justifyContent:"space-between",
    flexDirection:"row",
    flex:1,
    alignItems:"center",
  },
  text1:{
    color:color.back3C,
    fontSize:15,
  },
  text2:{
    color:color.font3C,
    fontSize:13,
  },
  btnGroupRight:{
    width:88*width/750,
    borderLeftWidth:0.5,
    borderColor:color.border1c,
    marginLeft:10,
    alignItems:"center",
    justifyContent:"center",
  },
  text3:{
    color:color.font2C,
    fontSize:13,
  },
  textBot:{
    color:color.border1c,
    fontSize:22,
  },
  mayBeBox:{
    width:width,
    backgroundColor:color.back1C,
    alignItems:'center',
    marginBottom:12,
  },
  mayBeCenter:{
    width:width-12,
    flexWrap:"wrap",
    flexDirection:"row",
    paddingTop:12,
  },
  similarBtn:{
    backgroundColor:"#eee",
    marginBottom:10,
    marginLeft:5,
    marginRight:5,
    height:50*width/750,
    width:160*width/750,
    borderColor:color.border1c,
    borderWidth:0.5,
    borderRadius:2,
    justifyContent:"center",
    alignItems:"center",
  },
  similarText:{
    fontSize:15,
    color:color.font3C,
  },
  similarTextActive:{
    fontSize:15,
    color:color.back1C,
  }
})

module.exports = styles;
