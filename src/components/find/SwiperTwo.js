'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text,} from 'react-native';
import Swiper from 'react-native-swiper';
import color from '../../constant/color';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


class SwiperTwo extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   key:0,
    // }
  }
  onpushRouter(id){
    _navigator.navigate('JournalismDetail',{archivesId:id})
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator=_this.props._navigator;
    let SwiperProps = {
      showsPagination: false,
      horizontal:false,
      loop: true,
      autoplay: true,
      showsHorizontalScrollIndicator: false,
      autoplayTimeout:10,
    }
    return (
      <View style={styles.image}>

        <Swiper style={styles.wrapper} height={30} {...SwiperProps} autoplayTimeout={5}>
          {_props.imglist.map((d,index)=>(

              <TouchableHighlight key={index} style={styles.slide}  onPress={()=>{_this.onpushRouter(d.id_)}} underlayColor="transparent">
                <Text numberOfLines={1} style={styles.text}>{d.title}</Text>
              </TouchableHighlight>
          ))}
        </Swiper>
      </View>
    );

  }

};

const styles = StyleSheet.create({

  wrapper: {
    height:30,
    width: width-110,
  },
  image: {
    height: 30,
    width: width-110,
    overflow:"hidden",
  },
  slide: {
    width:width-100,
    height:30,
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: color.font2C,
  },
});

export default SwiperTwo
