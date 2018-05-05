'use strict';
import React, { Component, } from 'react';
import {StyleSheet,TextInput,View,TouchableOpacity,Image,Text,Modal,ListView} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import Constants from '../../constant/constants'
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _navigator,_state,_this,_props;

export default class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
     }


     render(){
       _this=this;
       _state=this.state;
       _props=this.props;
       _navigator=this.props._navigator;
       return(
         <Modal
           animationType="slide"
           transparent={true}
           visible={_props.visible}
           style={{alignItems:"center",justifyContent:"center",}}
           onRequestClose={() => {_props.closeModal()}}
           >
             <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
               <TouchableOpacity style={{flex:1}} onPress={() => {_props.closeModal()}}>
               </TouchableOpacity>
             </View>
              <View style={styles.main}>
                <View style={styles.box}>
                  <Text>确认解除绑定吗？</Text>
                   <View style={styles.box1}>
                     <TouchableOpacity onPress={() => {_props.closeModal()}}>
                       <Image style={{width: 80, height: 24,}} source={require('../../images/m-160-1.png')}></Image>
                     </TouchableOpacity>
                     <TouchableOpacity style={{marginLeft: 25}} onPress={() => {_props.unbind()}}>
                       <Image style={{width: 80, height: 24,}} source={require('../../images/m-160-2.png')}></Image>
                     </TouchableOpacity>
                   </View>
                  </View>
              </View>
          </Modal>

       )
     }
   }
   const styles = StyleSheet.create({
     main: {
       flex:1,
       justifyContent: 'center',
       alignItems: 'center',
     },
     box:{
       width:286,
       height:150,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: color.back1C,
     },
     box1: {
       width:286,
       height:120,
       flexDirection: 'row',
       alignItems: 'flex-end',
       justifyContent: 'center',
     },

   });
