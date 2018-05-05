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
  scrollbar: {
    height: 35,
    borderBottomColor: color.line1C,
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    flexDirection: 'row',
    position:"relative",
  },
  scrollview: {
    flex: 1,
  },

  scrollitem: {
    height: 35,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollitemon: {
    height: 35.5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
    borderBottomColor: color.main1C,
    borderBottomWidth: 2,
    borderStyle: "solid",
    flexDirection: 'row',
    marginBottom:-0.5
  },
  scrolltext: {
    fontSize: 15,
    color: color.font1C,
  },
  scrolltexton: {
    fontSize: 15,
    color: color.main1C,
  },
  list_box: {
    height: 95,
    width: width,
    paddingLeft:12,
    paddingRight:12,
  },
  list_boxin: {
    flex: 1,
    paddingTop:15,
    paddingBottom: 15,
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    borderBottomColor: color.line1C,
  },
  list_touch: {
    flex: 1,
    flexDirection: "row",
  },
  list_cont: {
    flex: 1,
    width:width-94-24-20,
    overflow:"hidden",
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  list_contin: {
    width:width-94-24-90,
    flexDirection: "row",
    justifyContent: 'space-between',
    overflow:"hidden",
  },
  list_text1: {
    flex:1,
    fontSize: 15,
    color: color.font1C,
  },
  list_text2: {
    fontSize: 13,
    color: color.font2C,
  },
  paginShow:{
    width:width,
    backgroundColor:color.font4C,
    alignItems:"center",
    paddingBottom:50*width/750,
    borderBottomWidth: 1,
    borderBottomColor:"#d5cdca",
  },
  paginInfo:{
    width:width-30,
    borderBottomWidth:1,
    borderColor:"#dddddd",
    height:71*width/750,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  pushBtn:{
    width:35,
    height:71*width/750-1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:color.back1C,
  },
  paginText:{
    fontSize:15,
    color:color.font2C,
  },
  paginCenter:{
    width:width,
    flexWrap:"wrap",
    flexDirection:"row",
  },
  btnBox:{
    width:183*width/750,
    height:80*width/750,
    paddingLeft:30*width/750,
    paddingTop:30*width/750,
  },
  paginActive:{
    width:140/750*width,
    height:50/750*width,
    borderColor:color.main1C,
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center",
  },
  paginGen:{
    borderWidth:1,
    borderColor:"#ddd",
    alignItems:"center",
    justifyContent:"center",
    width:140/750*width,
    height:50/750*width,
  },

});

module.exports = styles
