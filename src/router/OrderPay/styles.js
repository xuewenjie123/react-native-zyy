'use strict';
import { StyleSheet, StatusBar,} from 'react-native';
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
    backgroundColor:color.mainBg2C,
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
    height:70,
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
    width:60*width/750,
    height:60*width/750,
  },
  order_text:{
    marginLeft:20,
    fontSize:15,
    color:color.font3C,
  },
  mine_icon_r:{
    width:11,
    height:11,
  },

})

module.exports = styles;
