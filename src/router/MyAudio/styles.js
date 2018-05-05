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
    width:352*width/750,
    height:208*width/750,
  },
  nonebooks:{
    paddingTop:width*270/750,
    alignItems:"center",
    flex:1,
  },
  finsh_text:{
    lineHeight:18,
    fontSize:12,
    color:color.font2C,
  },
  videoBox:{
    width:width-30,
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
  },
  smallbox:{
    width:330/750*width,
    height:width*362/750,
    position:"relative",
    marginTop:15,
  },
  bgImg:{
    width:223/750*width,
    height:223/750*width,
    position:'absolute',
    right:0,
    top:24,
  },
  labelBox:{
    borderWidth:1,
    borderColor:color.line1C,
    width:275/750*width,
    height:width*362/750,
  },
  aduioImg:{
    width:271/750*width,
    height:271/750*width,
  },
  videoInfo:{
    backgroundColor:color.white3C,
    width:271/750*width,
    height:width*88/750,
    alignItems:"center"
  },
  audioMan:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:264/750*width,
  },
  textInfo:{
    fontSize:12,
    color:color.font2C,
  },
  textName:{
    fontSize:12,
    color:color.font2C,
  },
  audioNameText:{
    fontSize:13,
    color:color.font1C,
    lineHeight:21,
  },

})

module.exports = styles;
