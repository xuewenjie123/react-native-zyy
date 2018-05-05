'use strict';
import React, { Component, } from 'react';
import {StyleSheet,TextInput,View,TouchableOpacity,Image,Text,Modal} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import Constants from '../../constant/constants'
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _navigator,_state,_this,_props;
export default class ListModalWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contents:""
        };
     }
     focusInput(){
       _this.refs.textInput.focus()
     }

     render(){
       _this=this;
       _state=this.state;
       _props=this.props;
       _navigator=this.props.navigation;
       return(
         <Modal
           animationType="slide"
           transparent={true}
           visible={_props.visible}
           onRequestClose={() => {_props.closeModal(_state.contents)}}
           >
             <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
               <TouchableOpacity style={{flex:1}} onPress={() => {_props.closeModal(_state.contents)}}>
               </TouchableOpacity>
             </View>


             <TouchableOpacity style={[styles.main,{padding:12}]} onPress={()=>{}}>
              <Text style={styles.text}>请输入留言</Text>
               <TextInput style={{color:'#666666',flex:1,textAlignVertical:"top"}} ref="textInput" underlineColorAndroid="transparent" maxLength={200} multiline={true} autoFocus
                 placeholder='请输入...' value={_state.contents} onChangeText={(text)=>_this.setState({contents:text})} blurOnSubmit={true}/>
             </TouchableOpacity>

             <TouchableOpacity style={{width:50,height:30,position:"absolute",zIndex:100,bottom:10,right:20,backgroundColor:"#ccc",alignItems:"center",justifyContent:"center",}} onPress={()=>_props.closeModal(_state.contents)}>
                <Text style={styles.text}>提交</Text>
             </TouchableOpacity>

          </Modal>

       )
     }
   }
   const styles = StyleSheet.create({
     main: {
       width:width,
       height:200,
       backgroundColor: color.mainBg2C,
       position:"absolute",
       bottom:0,
     },
     text:{
       fontSize:15,
       color:color.font1C
     }
   });
