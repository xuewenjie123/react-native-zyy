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
  dat1: {
    width: width,
    backgroundColor: color.back1C,
    flexDirection: 'column',
    marginBottom: 10,
  },
  dat2: {
    width: width,
    height: 50,
    paddingLeft: 12,
    paddingRight: 12,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: color.line1C,
    flexDirection: 'row',
    alignItems: "center",
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
  noneBox:{
    alignItems:"center",
    flex:1,
  }
});

module.exports = styles
