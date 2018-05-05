'use strict';
import { StyleSheet, } from 'react-native';
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
    backgroundColor: color.mainBg2C,
  },
  suc_img:{
    marginTop:75,
    width:75,
    height:75,
  },
  notice:{
    flex:1,
    marginTop:15,
    alignItems:"center",
  },
  notice_text:{
    fontSize:12,
    lineHeight:12,
    color:color.font1C ,
  },

})

module.exports = styles;
