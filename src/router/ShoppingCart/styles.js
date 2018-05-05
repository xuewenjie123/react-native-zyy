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
    backgroundColor: color.back1C,
  },
  labelBox:{
    width:width,
    paddingLeft:12,
  },
  footer_btn:{
    width:width,
    borderColor:color.border1c,
    borderTopWidth:0.5,
    height:44,
    backgroundColor:color.back4C,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingLeft:12,
  },
  gorupf:{
    flexDirection:"row",
    alignItems:"center",
  },
  finsh_btn:{
    width:240*width/750,
    height:44,
    borderLeftWidth:1,
    borderColor:"#92bad2",
    backgroundColor:"#92bad2",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:10,
  },
  footer_text1:{
    color:color.font3C,
    fontSize:15,
  },
  footer_text2:{
    color:color.main1C,
    fontSize:18,
    fontWeight:"bold",
  },
  footer_text3:{
    color:color.back1C,
    fontSize:18,
  },
  radioInit:{
    width:18,
    height:18,
    borderWidth:0.5,
    borderColor:color.address1c,
    borderRadius:9,
  },
  radio_active:{
    width:18,
    height:18,
  },

  rightRow:{
    flex:1,
    height:180*width/750,
    paddingLeft:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  textGroup:{
    flex:1,
    height:140*width/750,
    justifyContent:"space-around",
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
    color:color.font2C,
    fontSize:12,
  },
  btnGroupRight:{
    width:88*width/750,
    borderLeftWidth:0.5,
    borderColor:color.border1c,
    marginLeft:10,
    alignItems:"center",
    justifyContent:"center"
  },
  textTop:{
    color:color.main1C,
    fontSize:28,
  },
  textBot:{
    color:color.border1c,
    fontSize:22,
  },
  textBotActive:{
    color:color.main1C,
    fontSize:22,
  }
})

module.exports = styles;
