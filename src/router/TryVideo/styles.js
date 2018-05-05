'use strict';
import { StyleSheet, } from 'react-native';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import color from '../../constant/color';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width:width,
    height:height,
    backgroundColor: color.mainBg2C,
  },

})

module.exports = styles;
