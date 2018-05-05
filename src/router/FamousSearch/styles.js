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
  list_b: {
    flex: 1,
    width: width,
    backgroundColor: color.back1C,
    flexDirection: 'column',
    alignItems: 'center',
  },
  info_b: {
    width: width-24,
    height: 92,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    borderColor: color.line1C,
    borderStyle: "solid",
    borderBottomWidth: 1,
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
  cont2: {
    padding: 10,
    flex:1,
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  cont3: {
    flexDirection: 'row',
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
});

module.exports = styles
