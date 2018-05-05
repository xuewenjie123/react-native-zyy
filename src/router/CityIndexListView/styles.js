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
    alignItems:"center",
  },
  labels:{
    height:40,
    justifyContent:"center",
    flex:1,
    alignItems:"flex-start"
  },
  lt_text:{
    fontSize:15,
    color:color.font1C,
  },
  ltAtext:{
    fontSize:15,
    color:color.main1C,
  },
  container:{
    paddingLeft:12,
  },
  containerBox:{
    alignItems:"flex-start",
    flex:1,
  },


});

module.exports = styles
