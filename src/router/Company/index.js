'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, Text,InteractionManager,BackHandler} from 'react-native';//
var styles =require('./styles');
import {unitDetail}  from '../../service/find';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../components/common/WebViewAutoHeight';
import NavWait from '../../components/common/NavWait';
import color from '../../constant/color';
import {selectById} from '../../service/journalism';
import { date2str, }  from '../../constant/constants';
import {NavigationActions} from 'react-navigation';
var _navigator,_this,_state,_props;

export default class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_: this.props.navigation.state.params.id_,
      unitObj:false,
      recommendList:[],
      isFind:false
    }
  }
  componentDidMount(){
    if(_this.props.navigation.state.params.Find){
      _this.setState({
        isFind:true
      })
    }
   BackHandler.addEventListener('hardwareBackPress', function(){});
    InteractionManager.runAfterInteractions(() => {
      unitDetail(_state.id_,_this.unitDetailResult);
      selectById({id:_state.id_,channelId:19},_this.selectResult)
     });
  }

  selectResult(result){
    if(result.httpCode == 200){

      if(result.recommendList)
      _this.setState({
        recommendList:result.recommendList,
      })
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }

  unitDetailResult(result){

    if(result.httpCode == 200){

      if(result.unitObj)
      _this.setState({
        unitObj:result.unitObj,
        recommendList:result.recommendList,
      })
    }else{
      ToastAndroid.show(result.msg,ToastAndroid.SHORT)
    }
  }
  resetBack(){
    const resetAction = NavigationActions.reset({
      index:1,
      actions:[
          NavigationActions.navigate({routeName: 'Find'}),
          NavigationActions.navigate({routeName: 'Journalism', params:{channelId:19}})
     ]
    })
    const resetAction2 = NavigationActions.reset({
      index:0,
      actions:[
       NavigationActions.navigate({routeName: 'Find'})
     ]
    })
    if(_this.props.navigation.state.params.Find){
      _navigator.dispatch(resetAction2)
    }else{
      _navigator.dispatch(resetAction)
    }

  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "示范单位",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.resetBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
          <ScrollView>
            {_state.unitObj?(
              <View style={styles.cont}>
                <View style={styles.imgborder}>
                  <View style={styles.imgborder2}>
                    <Image style={{width: 50, height: 50,borderRadius: 50,}} source={_state.unitObj.url?{uri:_state.unitObj.url}:require('../../images/z-100-1.png')}></Image>
                  </View>
                </View>
                <View style={styles.cont2}>
                  <View style={styles.cont3}>
                    <Text style={[styles.cont_text2,{marginRight:10,}]}>
                      {_state.unitObj.name}
                    </Text>
                    <View style={styles.cont4}>
                      <Text style={styles.cont_text3}>
                        {_state.unitObj.phone}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.cont_text1}>
                    {_state.unitObj.location}
                  </Text>
                </View>
              </View>
            ):(<NavWait />)}
            {_state.unitObj.intro?(
              <View style={styles.rig}>
                <Image style={styles.rig2} source={require('../../images/m-750-3.png')}></Image>
                <Image style={styles.rig3} source={require('../../images/m-204-1.png')}></Image>
                <View style={styles.rig4}>
                  <WebViewAutoHeight
                    style={{ width: width-24,}}
                    minHeight={120}
                    contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                    source={{html:"<body><div>"+_state.unitObj.intro+"</div></body>"}}
                  />
                </View>
              </View>
            ):null}
            {_state.recommendList?
              _state.recommendList.length?(
              <View style={styles.recom}>
                <View style={styles.recomtit}>
                  <Text style={styles.textSuggest}>
                    {"相关推荐"}
                  </Text>
                </View>
                <View style={styles.recombto}>
                  {_state.recommendList.map((d,index)=>(
                    <TouchableOpacity key={index} style={styles.recombtoitem}
                       onPress={()=>{_navigator.navigate("Company",{channelId:19,id_:d.id_,Find:_state.isFind})}}>
                      <View style={styles.recomcont}>
                        <Text style={styles.cont_text9} numberOfLines={2}>{d.name}</Text>
                        <View style={styles.recomcont2}>
                          <Text style={styles.cont_text8} numberOfLines={1}>{d.phone}</Text>
                          <Text style={styles.cont_text8} numberOfLines={1}>{d.location}</Text>
                        </View>
                      </View>
                      <Image style={{width: 94, height: 64,marginLeft:20,}} source={d.url?{uri:d.url}:null} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ):null
            :null}
          </ScrollView>
        </View>
      </View>
    );
  }

};
