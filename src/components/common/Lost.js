'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View,Text,Image   } from 'react-native';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';
var _props;
class Lost extends Component {

  render() {
    _props=this.props;
    return (
      _props.image?
        <View style={{flex:1,width:width,alignItems:"center",marginTop:width*270/750,marginBottom:20}}>
            <Image source={_props.image} style={{width:333/750*width,height:width*199/750,}}/>
            <Text style={{fontSize:14,color:color.font2C,lineHeight:32,}}>{_props.title}</Text>
        </View>
    :
        <View style={{flex:1,width:width,alignItems:"center",justifyContent:"center",marginTop:20,marginBottom:20}}>
            <Text style={{fontSize:18,color:"#999"}}>{_props.title}</Text>
        </View>


    )
  }
};

const styles = StyleSheet.create({

});

export default Lost
