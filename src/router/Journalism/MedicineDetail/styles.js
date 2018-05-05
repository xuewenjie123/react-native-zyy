'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../../constant/color';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.back2C,
    flexDirection: 'column',
  },
  cont: {
    backgroundColor: color.back1C,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    marginBottom: 14,
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
    paddingBottom: 1,
    paddingRight:2,
    paddingLeft:2,
    backgroundColor:"#fff4f1",
  },
  imgborder: {
    width: 61,
    height: 61,
    borderRadius: 61,
    borderStyle: 'solid',
    borderColor: "#999",
    borderWidth: 1.5,
    padding: 1,
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
  rig: {
    flex: 1,
    backgroundColor: color.back1C,
    alignItems: "center",
  },
  rig2: {
    width: width,
    height: width/750*92,
  },
  rig3: {
    width: 102,
    height: 27,
    marginTop: -15,
    marginBottom: 25,
  },
  rig4: {
    marginBottom: 25,
  },
  cont_text1: {
    fontSize: 13,
    color: color.font3C,
  },
  cont_text2: {
    fontSize: 15,
    color: color.font1C,
  },
  cont_text3: {
    fontSize: 12,
    color: color.main1C,
  },
  recom: {
    backgroundColor: color.back1C,
    flexDirection: 'column',
    marginTop: 10,
  },
  recomtit: {
    height: 43,
    paddingLeft:12,
    paddingRight:12,
    borderBottomWidth:1,
    borderColor: color.line1C,
    borderStyle: "solid",
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSuggest: {
    fontSize: 15,
    color: color.main1C,
  },
  cont_text8: {
    fontSize: 13,
    color: color.font2C,
  },
  cont_text9: {
    fontSize: 15,
    color: color.font1C,
  },
  recombto: {
    paddingLeft:12,
    paddingRight:12,
    paddingBottom:12,
    flexDirection: 'column',
  },
  recombtoitem: {
    width:width-24,
    height:94,
    paddingTop: 15,
    paddingBottom:15,
    borderBottomWidth:1,
    borderColor: color.line1C,
    borderStyle: "solid",
    flexDirection: 'row',
  },
  recomcont: {
    flex:1,
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  recomcont2: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
});

module.exports = styles
