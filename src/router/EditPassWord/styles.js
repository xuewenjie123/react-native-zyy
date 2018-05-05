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
  change_box:{
    marginTop:12,
    width:width,
    backgroundColor:color.back1C,
    alignItems:"center",
  },
  label:{
    width:width-24,
    height:46,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
  },
  text:{
    fontSize:15,
    color:color.back3C,
  },
  button:{
    marginTop:30,
    width:width-24,
    height:width*88/750,
    backgroundColor:color.main1C,
    borderRadius:2,
    alignItems:"center",
    justifyContent:"center",
  },
  btn_bg:{
    position:"absolute",
    width:width-34,
    height:width*68/750
  },
  yes_btn:{
    fontSize:16,
    color:color.back1C,
  }
})

module.exports = styles;
