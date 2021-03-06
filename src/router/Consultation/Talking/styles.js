'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../../constant/color';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.mainBg2C,
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
  dat: {
    height: 10,
    width: width,
    backgroundColor: color.back2C,
  },
  dat2: {
    width: width,
    alignItems: "center",
    marginTop:12,backgroundColor:color.back1C,
  },
  dat3: {
    width: width-24,
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 13,
    flexDirection: 'row',
  },
  dat4: {
    flex: 1,
    flexDirection: 'column',
  },
  dat5: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 10,
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
    fontSize: 13,
    color: color.font1C,
  },
  cont_text5: {
    fontSize: 12,
    color: color.font2C,
  },

  input: {
    height: 45,
    width: width,
    paddingLeft: 9,
    paddingRight: 9,
    borderColor: color.line1C,
    borderStyle: "solid",
    borderWidth: 0.5,
    backgroundColor: color.back1C,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  input2: {
    marginLeft: 7,
  },
  input3: {
    flex:1,
    height:30,
    borderColor: color.line1C,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: color.back4C,
    borderRadius: 13,
  },
  imgback: {
    width: width-24,
    height: (width-24)/702*88,
    justifyContent: "center",
    alignItems: 'center',
  },
  cont_text8: {
    fontSize: 15,
    color: color.font4C,
  },
});

module.exports = styles
