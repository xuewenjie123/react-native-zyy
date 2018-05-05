'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: color.back1C,
    flexDirection: 'column',
    padding: 0,
  },
  box:{
    width:width,
    alignItems:"center",
    justifyContent:"center",
  },
  videoBox:{
    width:width-24,
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
  },
  none_img:{
    width:333*width/750,
    height:214*width/750,
    marginTop:100,
  },
  nonebooks:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  smallbox:{
    width:340/750*width,
    height:width*330/750,
    alignItems:"center",
    marginTop:15,
    marginRight:12
  },
  contentViewStyle:{
     flexDirection:'row',
     flexWrap:'wrap',
     width:width,
 },
  imgBox:{
    width:340/750*width,
    height:width*244/750,
    position:"relative",
  },
  videoImg:{
    width:340/750*width,
    height:width*244/750,
    borderWidth:1,
    borderColor:"#e1e1e1",
  },
  collecBack:{
    width:40,
    height:20,
    position:"absolute",
    right:0,
    bottom:0,
    backgroundColor:"#000",
    opacity:0.5,
  },
  collecBox:{
    width:40,
    height:20,
    position:"absolute",
    right:0,
    bottom:0,
    justifyContent:"center",
    alignItems:"center",
  },
  collection:{
    fontSize:12,
    color:color.font4C,
  },
  videoInfo:{
    backgroundColor:color.back4C,
    width:340/750*width,
    height:width*86/750,
  },
  textName:{
    fontSize:13,
    color:color.back3C,
  },
  finsh_text:{
    fontSize:13,
    color:color.back3C,
    marginTop:20
  }


});

module.exports = styles
