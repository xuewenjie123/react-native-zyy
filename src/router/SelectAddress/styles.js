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
  label_box:{
    width:width,
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:color.back1C,
    marginTop:10,
    borderBottomWidth:1,
    borderColor:"#dfdcd8",
  },
  labels:{
    width:width-24,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    borderColor:"#ddd",
  },
  perInfo:{
    flexDirection:"row",
  },
  person_text:{
    fontSize:15,
    lineHeight:15,
    color:color.back3C,
    marginRight:10,
  },
  address_text:{
    flex:1,
    fontSize:14,
    color:color.address1c,
  },
  init_text:{
    fontSize:14,
    color:color.main1C,
  },
  editBox:{
    marginRight:10,
  },
  selectText:{
    fontSize:15,
    lineHeight:15,
    color:color.main1C,
    marginRight:10,
  },
  initLeft:{
    flexDirection:"row",
    paddingTop:8,
    paddingBottom:5
  },
  cr_icon:{
    width:11,
    height:11,
  },
  radio_box:{
    paddingRight:5,
    alignItems:"center",
    justifyContent:"center",
  },
  default:{
    width:30,
    marginRight:10,
    height:18,
    borderWidth:0.5,
    borderColor:color.main1C,
    alignItems:"center",
    justifyContent:"center",
  },
  radioInit:{
    height:18
  },
  radio_active:{
    width:18,
    height:18,
  },
  deleteBtn:{
    justifyContent:"flex-end"
  },
  delete:{
    fontSize:14,
    color:color.address1c,
  },
  footer_btn:{
    width:width,
    height:44,
    backgroundColor:color.main1C,
    justifyContent:"center",
    alignItems:"center",
  },
  footer_text:{
    color:color.back1C,
    fontSize:15,
  },
  address_loadbox:{
    width:width,
    height:width*532/750,
    paddingTop:width*266/750,
    alignItems:"center",
  },
  load_img:{
    width:width,
    height:width*266/750,
  },
  load_text:{
    fontSize:12,
    color:color.font1C,
    paddingTop:26
  }
})

module.exports = styles;
