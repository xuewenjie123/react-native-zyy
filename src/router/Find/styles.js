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
  image:{
    width:width,
    overflow:"hidden",
    height:330*width/750,
  },
  list_a: {
    marginTop: 20,
    marginBottom: 20,
    width:width,
    flexDirection: 'row',
  },
  info_a: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_a: {
    fontSize: 12,
    color: color.font3C,
  },
  list_b: {
    width: width-24,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: color.back1C,
    height: 30,
    flexDirection: 'row',
  },
  cont_title: {
    marginTop: 15,
    width: width,
    marginBottom: 15,
  },
  cont_bottom: {
    marginLeft: 12,
    marginRight: 12,
    width: width-24,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.back1C,
  },
  cont_list: {
    marginLeft: 12,
    marginRight: 12,
    width: width-24,
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: 'wrap',
  },
  cont_box: {
    marginBottom: 4,
    width: (width-28)/2-5,
    // height: (width-28)/2/347*530,
    height:(width-28)/2*8/6-20,
    flexDirection: 'column',
    backgroundColor: color.back1C,
    alignItems: 'center',
  },
  cont_images:{
   width: ((width-28)/2)-20,
  // height: (((width-28)/2)-6)/167.5*207.5,
  height:(((width-28)/2)-20),
   marginTop:3,
   marginBottom:10,
  },
  cont_text: {
    width: ((width-28)/2)-12,
    fontSize: 13,
    color: color.font1C,
  },
  cont_text_a: {
    width: ((width-28)/2)-12,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  cont_text_a1: {
    fontSize: 13,
    color: color.main1C,
  },
  cont_text_a2: {
    fontSize: 13,
    color: color.font2C,
  },
  cont_text_a3: {
    marginTop:5,
    paddingLeft:5,
    width: (width-28)/2,
    fontSize: 12,
    color: color.font3C,
  },
});

module.exports = styles
