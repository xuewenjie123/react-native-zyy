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
    justifyContent:'center'
  },
  textgeneral:{
    fontSize:15,
    color:color.back1C,
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
  labelBox:{
    width:width,
    alignItems:'center',
  },
  label: {
    height: 50,
    borderWidth:0,
    width:width-40,
    borderBottomWidth:1,
    borderColor: '#d3d3d3',
    justifyContent: 'flex-start',
    flexDirection:'row',
    alignItems:'center',
  },
  text:{
    fontSize:15,
    color:color.font3C,
  },
  text1:{
    fontSize:13,
    color:"#ccc",
  },
  button:{
    marginTop:20,
    marginBottom:20,
    height:39,
    alignItems:'center',
    justifyContent:'center',
    width:width-40,
    backgroundColor:color.main1C,
  },
  disable:{
    marginTop:20,
    marginBottom:20,
    height:39,
    alignItems:'center',
    justifyContent:'center',
    width:width-40,
    backgroundColor:color.boeder2c,
  },
  loginbtn:{
    fontSize:15,
    color:color.back1C,
  },
})

module.exports = styles;
