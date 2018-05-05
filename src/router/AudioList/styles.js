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
  row:{
    width:width,
    alignItems:"center",
    marginTop:12,
  },
  rowLbael:{
    width:width-24,
    paddingTop:10,
    backgroundColor:color.back1C,
    paddingLeft:10,
    flexDirection:"row",
  },
  row_right:{
    paddingLeft:10,
    width:width-24-170*width/750-5
  },
  textBox1:{
    height:68*width/750,
    justifyContent:"center",
  },
  textBox2:{
    height:113*width/750,
    justifyContent:"center",

  },
  text1:{
    fontSize:15,
    color:color.back3C,
  },
  text2:{
    fontSize:13,
    color:color.font2C,
    lineHeight:22,
    marginTop:-10,
  },
  btnGroup:{
    flexDirection:"row",
    borderColor:color.boeder2c,
    borderTopWidth:0.5,
    height:width*66/750,
    alignItems:"center",
    width:width-24-20-170*width/750,
  },
  btn:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    height:width*66/750,
  },

})

module.exports = styles;
