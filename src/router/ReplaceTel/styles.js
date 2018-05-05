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
    height:48,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
  },
  text_box:{
    width:width/4.5,
    height:48,
    justifyContent:"center",
  },
  text:{
    fontSize:15,
    color:color.back3C,
  },
  notice:{
    width:width-24,
    height:46,
    paddingTop:15,
  },
  notice_text:{
    fontSize:12,
    lineHeight:12,
    color:color.black5C ,
  },
  getnumbtn:{
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:25,
    backgroundColor:'#b9b9b9',
  },
   getnumtext:{
    fontSize:12,
    color:color.back1C,
  },
  button:{
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
