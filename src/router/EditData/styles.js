'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    width:width,
    height:height,
    backgroundColor:color.back1C,
  },
  PickerBox:{
    flex:1,
    paddingTop:0,
    alignItems:"center",
    overflow:"hidden",
    flexDirection:"row",
  },
  marginbox:{
    backgroundColor: color.mainBg2C,
    height:12,
    width:width,
  },
  change_box:{
    width:width,
    backgroundColor:color.back1C,
    alignItems:"center",
  },
  header_bar:{
    width:width,
    height:130,
    alignItems:"center",
    paddingTop:31,
    marginTop:12,
    backgroundColor:color.back1C,
  },
  title_person:{
    width:67,
    height:67,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:2,
    borderRadius:33.5,
    borderColor:color.font1C,
  },
  title_boder:{
    width:61,
    height:61,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:0.5,
    borderRadius:30.5,
    borderColor:color.font1C,
  },
  title_img:{
    width:54,
    height:54,
    borderRadius:27,
  },
  label:{
    width:width-24,
    height:46,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  depart:{
    flex:1,
    alignItems:"flex-end",
  },
  text:{
    fontSize:14,
    color:color.font3C,
  },
  text_d:{
    fontSize:14,
    color:color.font1C,
    marginRight:16*width/750,
  },
  arrow_Ricon:{
    width:7,
    height:12,
  },
  input:{
    flex:1,
    height: 40,
    fontSize:14,
    color:color.font1C,
    textAlign:"right",
  },
})

module.exports = styles;
