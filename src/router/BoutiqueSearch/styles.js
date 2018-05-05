'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.back2C,
    flexDirection: 'column',
    padding: 0,
  },
  list_b: {
    flex: 1,
    width: width,
    backgroundColor: color.back1C,
    flexDirection: 'column',
    alignItems: 'center',
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
    position:"relative",
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
  text3:{
    color:color.font2C,
    fontSize:13,
  },
});

module.exports = styles
