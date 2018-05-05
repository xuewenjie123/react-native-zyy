'use strict';
import React, { Component, } from 'react';
import { StyleSheet,View,Image,TouchableOpacity,TextInput,ListView,ToastAndroid,Text} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator;
import NavWait from '../../components/common/NavWait';

import {queryAddress} from '../../service/address'
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import WebViewAutoHeight from '../../components/common/WebViewAutoHeight';

export default class TryRead extends Component {
    constructor(props) {
      super(props);
      var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
          info:"wod falkdsfjlkdsjflks"
        };
     }


     componentDidMount(){
     }


     render(){
       _this=this;
       _navigator=_this.props.navigation;

       let NavigatorTopBarProps = {
           visible: true,
           title:"《梦溪笔谈》",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_navigator.goBack()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(

         <View style={styles.main}>
          <NavigatorTopBar {...NavigatorTopBarProps}/>
           <View style={{flex:1,backgroundColor:color.mainBg2C,}}>
                <WebViewAutoHeight
                  style={{width: width-24,flex:1,}}
                  minHeight={200}
                  contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                  source={{html:"<body><div style='color: #666;'>"+_this.state.info+"</div></body>"}}
                />
            </View>
         </View>
       )
     }
   }
