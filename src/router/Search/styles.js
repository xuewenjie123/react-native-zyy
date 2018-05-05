'use strict';
import { StyleSheet, StatusBar} from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width:width,
    height:height,
    backgroundColor: color.back1C,
  },
  searchBox:{
    width:width,
    height:40+StatusBar.currentHeight,
    justifyContent:"flex-end",
    alignItems:"center",
  },
  searchCenter:{
    width:width-24,
    height:35,
    marginBottom:5,
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
  },
  searchConter:{
    flex:1,
    backgroundColor:"#faf9f8",
    borderRadius:3,
    flexDirection:"row",
  },
  search_btn:{
    width:25,
    height:35,
    justifyContent:"center",
  },
  cancelBtn:{
    width:50,
    height:35,
    alignItems:"flex-end",
    justifyContent:"center",
  },
  cancelText:{
    fontSize:14,
    color:color.font2C,
  },
  historyTitle:{
    width:width,
    height:30,
    backgroundColor:color.mainBg2C,
    alignItems:"center",
  },
  historyCenter:{
    width:width-24,
    height:30,
    justifyContent:"center",
  },
  textgeneral:{
    fontSize:12,
    color:color.font2C,
  },
  hidtoryBox:{
    width:width,
    alignItems:"center",
  },
  hisBtn:{
    width:width-24,
    height:41,
    borderColor:color.border1c,
    borderBottomWidth:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  hiscText:{
    fontSize:13,
    color:color.font3C,
  },
  hisdateText:{
    fontSize:12,
    color:color.font2C,
  },
  hisCancelBtn:{
    alignItems:"center",
    justifyContent:"center",
    width:width,
    height:42,
  },
  mayBeBox:{
    flex:1,
    alignItems:'center',
    marginBottom:20,
  },
  mayBeCenter:{
    width:width-16,
    flexWrap:"wrap",
    flexDirection:"row",
    paddingTop:5,
  },
  similarBtn:{
    marginTop:10,
    marginLeft:4,
    marginRight:4,
    height:23,
    borderColor:color.border1c,
    borderWidth:0.5,
    borderRadius:2,
    justifyContent:"center",
  },
  similarText:{
    fontSize:12,
    color:color.font3C,
    paddingLeft:9,
    paddingRight:9,
  }
})

module.exports = styles;
