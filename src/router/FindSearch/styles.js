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
  contentViewStyle:{
    marginLeft: 12,
    marginRight: 12,
    marginTop:10,
    width: width-24,
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: 'wrap',
 },
  cont_title: {
    marginTop: 20,
    width: width,
    marginBottom: 10,
  },
  cont_list: {
    marginLeft: 12,
    marginRight: 12,
    marginTop:20,
    width: width-24,
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: 'wrap',
  },
  cont_box: {
    marginBottom: 4,
    width: (width-28)/2,
    height: (width-28)/2/347*520,
    backgroundColor: color.back1C,
    alignItems: 'center',
  },
  cont_text: {
    width: ((width-28)/2)-12,
    fontSize: 13,
    color: color.font1C,
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
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  list_contin: {
    flexDirection: "row",
    justifyContent: 'space-between',
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
});

module.exports = styles
