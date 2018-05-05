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
    flex:1,
    backgroundColor:color.back1C,
    alignItems:"center",
  },
  addlabel:{
    width:width-30,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
  },
  label:{
    width:width-30,
    height:45,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
  },
  text:{
    fontSize:14,
    color:color.font3C,
  },
  button:{
    marginTop:40,
    width:width-30,
    height:width*88/750,
    backgroundColor:color.main1C,
    borderRadius:2,
    alignItems:"center",
    justifyContent:"center",
  },
  select_icon:{
    width:11,
    height:11,
  },
  btn_bg:{
    position:"absolute",
    width:width-40,
    height:width*68/750
  },
  yes_btn:{
    fontSize:16,
    color:color.back1C,
  }
})

module.exports = styles;
