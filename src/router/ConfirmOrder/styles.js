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
},
contents:{
  flex:1,
  backgroundColor:color.mainBg2C,
  width:width,
},
addressInfo:{
  position:"relative",
  backgroundColor:color.back1C,
  width:width,
  height:250*width/750,
  alignItems:"center",
},
addressCenter:{
  width:width-24,
  justifyContent:"space-between",
  flexDirection:"row",
},
text1:{
  color:color.back3C,
  fontSize:15,
},
text2:{
  color:color.main1C,
  fontSize:15,
},
text3:{
  color:color.font3C,
  fontSize:13,
  lineHeight:15,
},
imgBox:{
  flex:1,
  alignItems:"flex-end",
  justifyContent:"flex-start",
},
textBox:{
  width:610*width/750,
  paddingLeft:10,
},
container:{
  width:width,
  alignItems:"center",
  backgroundColor:color.back1C,
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
orderInfo:{
  marginTop:12,
  backgroundColor:color.back1C,
  flex:1,
  width:width,
},
gorupf:{
  flexDirection:"row",
  alignItems:"center",
},
label_box:{
  width:width-24,
  alignItems:"center",
  flexDirection:"row",
  height:190*width/750,
  borderColor:color.boeder2c,
  borderBottomWidth:0.5,
},
rightRow:{
  flex:1,
  justifyContent:"center"
},
textGroup:{
  height:140*width/750,
  justifyContent:"space-around",
},
gorupText:{
  justifyContent:"space-between",
  flexDirection:"row",
  flex:1,
  alignItems:"center",
},
text4:{
  color:color.back3C,
  fontSize:15,
},
text5:{
  color:color.font2C,
  fontSize:12,
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
bigBtnBox:{
  width:width,
  alignItems:"center",
  backgroundColor:color.back1C,
},
btn_box:{
  height:81*width/750,
  borderColor:color.boeder2c,
  borderBottomWidth:0.5,
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  width:width-24,
},
textR:{
  color:color.font2C,
  fontSize:15,
}
})
module.exports = styles
