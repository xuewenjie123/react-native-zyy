'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, } from 'react-native';
import Swiper from 'react-native-swiper';
import color from '../../constant/color';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


export default class SwiperBoxbookstore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairModal: false,
      menu: [],
    }
  }
  onpushRouter(id){
    _navigator.navigate('BookDetail',{bookId:id})
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator=_props._navigator;
    let SwiperProps = {
      showsPagination: true,
      autoplay: true,
      autoplayTimeout:10,
      loop:true,
      showsButtons:false,
      paginationStyle: {position: "absolute",top: 300*width/750,height:10,width:width},
      dot: (
        <View style={{backgroundColor:'rgba(0,0,0,.3)', width: 22, height: 3, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />
      ),
      activeDot: (
        <View style={{backgroundColor: color.main1C, width: 22, height: 3, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />
      ),
    }
    return (
      <View style={styles.image} pointerEvents={"box-none"}>
        <Swiper {...SwiperProps}>
          {_props.imglist.map((d,index)=>(
            <TouchableHighlight key={index} style={styles.slide} onPress={()=>{_this.onpushRouter(d.complexId_)}}>
              {d.url?<Image style={{width:width,height:330*width/750,}} source={{uri:d.url}}></Image>:null}
            </TouchableHighlight>
          ))}
        </Swiper>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  slide: {
    width:width,
    height:330*width/750,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:width,
    height:330*width/750,
    overflow: "hidden",
  },
});
