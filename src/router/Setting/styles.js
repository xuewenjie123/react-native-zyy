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
  header_box:{
    width:width,
    height:95,
    backgroundColor:color.back1C,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  header_box_c:{
    width:width-24,
    height:95,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  h_left:{
      alignItems:"center",
      flexDirection:"row",
  },
  h_right:{
    width:11,
    height:11,
  },
  title_person:{
    width:67,
    height:67,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:2,
    borderRadius:33.5,
    borderColor:color.font1C,
    marginRight:10,
  },
  title_boder:{
    width:61,
    height:61,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:30.5,
    borderColor:color.font1C,
  },
  title_img:{
    width:54,
    height:54,
    borderRadius:27,
  },
  person_text:{
    paddingLeft:10,
    fontSize:14,
    color:color.back3C,
  },
  query_t:{
    marginTop:12,
    width:width,
    backgroundColor:color.back1C,
    alignItems:"center"
  },

  label:{
    width:width-24,
    height:46,
    borderBottomWidth:1,
    borderColor:color.border1c,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
  },
  order_qy:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  mine_icon_l:{
    width:16,
    height:16,
  },
  order_text:{
    marginLeft:10,
    fontSize:15,
    color:color.font3C,
  },
  mine_icon_r:{
    width:11,
    height:11,
  },

  button:{
    marginTop:20,
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
