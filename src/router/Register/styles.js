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
  },
  label: {
    height: 50,
    borderWidth:0,
    width:width-40,
    borderBottomWidth:1,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    flexDirection:'row',
    alignItems:'center',
  },
  text:{
    fontSize:15,
    color:color.font3C,
  },
  PickerBox:{
    width:width-24-11-50,
    height:200
  },
  btngroup:{
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"flex-start",
    paddingTop:30,
  },
  btngeneral:{
    height:29,
    width:80,
    backgroundColor:color.main1C,
    borderTopLeftRadius:7,
    borderBottomLeftRadius:7,
    alignItems:'center',
    justifyContent:'center',
  },
   btnexpert:{
    width:79,
    height:29,
    borderWidth:0.5,
    borderLeftWidth:0,
    borderColor:color.main1C,
    alignItems:'center',
    justifyContent:'center',
    borderTopRightRadius:7,
    borderBottomRightRadius:7,
  },
  generalbtn:{
    width:79,
    height:29,
    borderWidth:0.5,
    borderRightWidth:0,
    borderColor:color.main1C,
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:7,
    borderBottomLeftRadius:7,
    },
  expertbtn:{
    height:29,
    width:80,
    backgroundColor:color.main1C,
    borderTopRightRadius:7,
    borderBottomRightRadius:7,
    alignItems:'center',
    justifyContent:'center'
  },
  depart:{
    flex:1,
    paddingLeft:5
  },
  arrow_Ricon:{
    width:7,
    height:12,
  },
   button:{
    marginTop:20,
    marginBottom:20,
    height:39,
    alignItems:'center',
    justifyContent:'center',
    width:width-40,
    borderStyle:'dashed',
    backgroundColor:'#fff0eb',
    borderWidth:0.5,
    borderColor:color.main1C,
    borderRadius:10,
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
   truetext:{
    fontSize:12,
    color:'#67a0c2'
  },
  text_d:{
    fontSize:14,
    color:color.font1C,
    marginRight:16*width/750,
  },
  direclogin:{
    flexDirection:'row',
    width:width-40,
    alignItems:'flex-start',
    justifyContent:'center',
    paddingBottom:20
  },
  regtext:{
    fontSize:12,
    color:color.font3C,
  },
  gettrue_name:{
    width:70,
    height:16,
    borderWidth:0.5,
    borderColor:'#67a0c2',
    backgroundColor:'#edf8ff',
    borderRadius:1,
    justifyContent:'center',
    paddingLeft:5,
  },

  regicon:{
    width:11,
    height:11,
  }
})

module.exports = styles;
