'use strict';
import { StyleSheet, StatusBar,} from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from './../../constant/color';

const styles = StyleSheet.create({
 main: {
    flexDirection:'column',
    alignItems: 'center',
    width:width,
    backgroundColor:color.mainBg2C,
  },
  header_bar:{
    position:"relative",
    alignItems:"center",
    width: width,
    height:width*346/750+StatusBar.currentHeight,
  },
  hbar_bg:{
    width: width,
    height:width*346/750+StatusBar.currentHeight,
    position:"absolute",
  },
  center1:{
    width:width-24,
    alignItems:"center",
    backgroundColor:"#000"
  },
  title_person:{
    width:67,
    height:67,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:2,
    borderRadius:33.5,
    borderColor:color.font1C,
    marginBottom:12,
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
  title_center:{
    height:width*346/750,
    alignItems:"center",
    paddingTop:88*width/750,
  },
  person_text:{
    fontSize:15,
    color:color.back3C,
  },
  hbar_setbtn:{
    position:"absolute",
    width:30,
    height:30,
    right:12,
    alignItems:"flex-end",
    top:15+StatusBar.currentHeight,
  },
  set_icon:{
    width:16,
    height:16
  },
  que_box:{
    flex:1,
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
    borderBottomWidth:0.5,
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

})

module.exports = styles;
