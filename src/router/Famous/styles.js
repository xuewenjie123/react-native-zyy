'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.back2C,
    flexDirection: 'column',
    padding: 0,
  },
  list_a: {
    paddingTop: 15,
    paddingLeft: 7.5,
    paddingRight: 7.5,
    backgroundColor: color.back1C,
    width:width,
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  info_a: {
    width: (width-15)/4,
    paddingRight: 4.5,
    paddingLeft: 4.5,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
  },
  info_a1: {
    width: ((width-15)/4)-9,
    height: 23,
    backgroundColor: color.back1C,
    borderColor: color.line1C,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info_a2: {
    width: ((width-15)/4)-9,
    height: 23,
    backgroundColor: color.main1C,
    borderColor: color.main1C,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_b: {
    flex: 1,
    width: width,
    backgroundColor: color.back1C,
    flexDirection: 'column',
    alignItems: 'center',
  },
  info_b: {
    width: width,
    paddingLeft:12,
    paddingRight:12,
    height: 180*width/750,
    paddingTop: 0,
    paddingBottom: 5,
    flexDirection: 'row',
    borderColor: color.line1C,
    borderStyle: "solid",
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgborder: {
    width: 61,
    height: 61,
    borderRadius: 61,
    borderStyle: 'solid',
    borderColor: "#999",
    borderWidth: 1.5,
    padding: 1
  },
  imgborder2: {
    width: 56,
    height: 56,
    borderRadius: 56,
    borderStyle: 'solid',
    borderColor: "#999",
    borderWidth: 0.5,
    padding: 2.5,
  },
  cont2: {
    padding: 10,
    flex:1,
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  cont3: {
    flexDirection: 'row',
  },
  cont4: {
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: color.main1C,
    paddingTop: 1,
    marginRight:5,
    paddingBottom: 1,
    paddingRight:2,
    paddingLeft:2,
    backgroundColor:"#fff4f1",
    height:21,
  },
  consultation: {
    position: "absolute",
    bottom: 70,
    right:0,
    width: 106,
    height: 32,
    backgroundColor: color.back3C,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultation2: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: color.back1C,
    overflow: "hidden",
    marginLeft: 2,
    marginRight:10,
  },
  image:{
    width:width,
    overflow:"hidden",
    height:330*width/750,
  },
  text_a1: {
    fontSize: 12,
    color: color.font1C,
  },
  text_a2: {
    fontSize: 12,
    color: color.font4C,
  },
  text_b: {
    fontSize: 14,
    color: color.font4C,
  },
  cont_text1: {
    fontSize: 13,
    color: color.font3C,
    marginTop:20*width/750
  },
  cont_text2: {
    fontSize: 15,
    color: color.font1C,
  },
  cont_text3: {
    fontSize: 12,
    color: color.main1C,
  },
});

module.exports = styles
