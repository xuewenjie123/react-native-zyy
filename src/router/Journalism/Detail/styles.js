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
    flexDirection: 'column',
  },
  conttop: {
    paddingLeft:12,
    paddingRight:12,
    paddingTop:20,
    paddingBottom:20,
  },
  conttopin: {
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  conttopin2: {
    flexDirection: 'row',
    alignItems:"center"
  },
  contbto: {
  },
  contb1: {
    alignItems: 'center',
    marginBottom: 50,
  },
  contb2: {
    width: 125,
    height: 33,
    borderRadius: 15,
    backgroundColor: color.main1C,
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',
  },
  contc1: {
    width: width,
    height: 14,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  contc2: {
    flex:1,
    height: 1,
    backgroundColor: color.line1C,
  },
  contc3: {
    width:50,
    height: 14,
    alignItems: 'center',
    justifyContent: "center",
  },
  contd1: {
    width:width,
    paddingLeft:12,
    paddingRight:12,
    height: 70,
    flexDirection: 'row',
    marginBottom: 20,
  },
  contd2: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  contd3: {
    flex:1,
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
  cont_text1: {
    fontSize: 18,
    color: color.font1C,
  },
  cont_text2: {
    fontSize: 12,
    color: color.font2C,
  },
  cont_text3: {
    fontSize: 15,
    color: color.font3C,
  },
  cont_text4: {
    fontSize: 12,
    color: color.font4C,
  },
  cont_text5: {
    fontSize: 12,
    color: color.font3C,
  },
  cont_text6: {
    fontSize: 12,
    color: color.font2C,
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
});

module.exports = styles
