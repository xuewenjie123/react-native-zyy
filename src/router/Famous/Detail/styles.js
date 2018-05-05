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
  scrollcont: {
    flex: 1,
    width:width,
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
    marginRight:5,
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  rig2: {
    width: width-24,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  rig3: {
    flex:1,
    justifyContent: "center",
    alignItems: 'center',
  },
  rig4: {
    marginBottom: 25,
  },
  rigbot: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
  rigbotfiex: {
    position: "absolute",
    bottom: 30,
    right: 12,
  },
  imgback: {
    width: width-24,
    height: (width-24)/702*88,
    justifyContent: "center",
    alignItems: 'center',
  },
  lite1: {
    width: width-24,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lite2: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  lite4: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: color.line1C,
  },
  lecttop1: {
    width: width-24,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lecttop2: {
    width: width-24,
    height: 144,
    flexDirection: 'column',
  },
  lecttop3: {
    width: width-24,
    height: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lecttop4: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  lecttop5: {
    height: 40,
    width: width-24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fbe5dd",
  },
  lect1: {
    width: width-24,
    height: 74,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: color.back4C,
  },
  lect2: {
    flex:1,
    flexDirection: 'column',
    paddingTop:10,
    paddingBottom: 8,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  lect3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lect4: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: color.line1C,
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
  cont_text4: {
    fontSize: 15,
    color: color.font4C,
  },
  cont_text5: {
    fontSize: 15,
    color: color.font2C,
  },
  cont_text6: {
    fontSize: 15,
    color: color.font3C,
  },
  cont_text7: {
    fontSize: 15,
    color: color.main1C,
  },
  cont_text8: {
    fontSize: 13,
    color: color.font1C,
  },
  cont_text9: {
    fontSize: 12,
    color: color.font2C,
  },
});

module.exports = styles
