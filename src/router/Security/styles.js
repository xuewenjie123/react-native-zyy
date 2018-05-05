'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from './../../constant/color.js';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    width:width,
    height:height,
    backgroundColor: color.mainBg2C,
  },
  query_t:{
    marginTop:12,
    width:width,
    backgroundColor:color.back1C,
    alignItems:"center"
  },
  label:{
    width:width-24,
    height:46,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
  },
  order_qy:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  mine_icon_l:{
    width:16,
    height:16,
  },
  order_text:{
    marginLeft:10,
    fontSize:15,
    color:color.font3C,
  },
  mine_icon_r:{
    width:11,
    height:11,
  },
})

module.exports = styles;
