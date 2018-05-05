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
  item_box: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    width:width-24,
    flexDirection: 'column',
    backgroundColor: color.back1C,
    borderRadius: 4,
    paddingTop: 15,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  item1: {
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: "center",
  },
  imgborder: {
    width: 28,
    height: 28,
    borderRadius: 28,
    borderStyle: 'solid',
    borderColor: "#999",
    borderWidth: 1,
    padding: 1,
  },
  imgborder2: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderStyle: 'solid',
    borderColor: "#999",
    borderWidth: 0.5,
    padding: 0.5,
  },
  item2: {
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: color.main1C,
    paddingTop: 1,
    marginRight:5,
    paddingBottom: 1,
    paddingRight:2,
    paddingLeft:2,
    backgroundColor:"#fff4f1",
  },
  item3: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: color.line1C,
  },
  item4: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 13,
    color: color.font1C,
  },
  text2: {
    fontSize: 15,
    color: color.font1C,
  },
  text3: {
    fontSize: 12,
    color: color.main1C,
  },
  text4: {
    fontSize: 13,
    color: color.font3C,
  },
  text5: {
    fontSize: 12,
    color: color.font2C,
  },
});

module.exports = styles
