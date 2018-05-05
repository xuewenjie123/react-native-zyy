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
    backgroundColor:color.mainBg2C,
  },
  btngroup:{
    height:80,
    justifyContent:'center',
    width:width-40,
  },
  labelBox:{
    width:width,
    alignItems:'center',
  },
  label: {
    height: 50,
    width:width-40,
    justifyContent: 'space-between',
    flexDirection:'row',
    alignItems:'center',
  },
  text:{
    fontSize:15,
    color:color.font3C,
  },
  text1:{
    fontSize:15,
    color:color.main1C,
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
  codeBox:{
    width:width/2-14,
    height:40,
    backgroundColor:color.back1C,
  },
  getcode:{
    borderWidth:0.5,
    width:width/2-44,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    borderColor:color.main1C,
  }
})

module.exports = styles;
