'use strict';
import React, { Component, } from 'react';
import { View, Image,Text, ScrollView, TouchableOpacity, ToastAndroid, InteractionManager,ListView,BackHandler} from 'react-native';
var styles =require('./styles');
import { information, knowledge, goldlist,focuslist,unitlist }  from '../../service/find';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavWait from '../../components/common/NavWait';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import SwiperBoxFind from '../../components/find/SwiperBoxFind';
import SwiperTwo from '../../components/find/SwiperTwo';
import Lost from '../../components/common/Lost';
var _navigator,_this,_state,_props;
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {NavigationActions} from 'react-navigation';


export default class BoutiqueSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productList:this.props.navigation.state.params.productList,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(this.props.navigation.state.params.productList)
    }
  }
  componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function(){});
   }
   onpushRouter(id,type){
      switch (type) {
        case 1:
          _navigator.navigate("BookDetail",{bookId:id,BoutiqueSearch:true})
          break;
        case 2:
          _navigator.navigate("AudioRecom",{audioId:id,BoutiqueSearch:true})
          break;
        case 3:
          _navigator.navigate("VideoInfo",{videoId:id,BoutiqueSearch:true})
          break;
        default:
          return false
      }
   }
  _renderRow(rowContent,sectionID,rowID,){
    return(
      <View style={styles.labelBox} key={rowID}>
          <TouchableOpacity style={styles.labelsRow} onPress={()=>_this.onpushRouter(rowContent.id_,rowContent.type)}>
               <Image source={{uri:rowContent.imgUrl}} style={{width:179*width/750,height:221*width/750,marginBottom:10,marginTop:10,}}/>
               <View  style={styles.rightRow}>
                   <View style={styles.textGroup}>
                        <Text style={styles.text1} numberOfLines={1}>{rowContent.goodsName}</Text>
                        <View style={styles.gorupText1}>
                           <Text style={styles.text2} numberOfLines={1}>{rowContent.goodsDes.replace(/[\r\n]/g,'')}</Text>
                           <Text style={styles.text2} numberOfLines={1}>{rowContent.name}</Text>
                        </View>
                        <View style={styles.gorupText}>
                           <Text style={styles.footer_text2}  numberOfLines={1}>￥{rowContent.price}</Text>
                           <Text style={styles.text3}  numberOfLines={1}>{rowContent.sales}买过</Text>
                        </View>
                   </View>
             </View>
        </TouchableOpacity>
    </View>
    )
  }
  backRouter(){
    const resetAction = NavigationActions.reset({
      index:1,
      actions:[
       NavigationActions.navigate({routeName: 'Boutique'}),
       NavigationActions.navigate({routeName: 'Search', params:{type:2}})
     ]
    })
    _navigator.dispatch(resetAction)
  }
  render() {
    _this = this;
    _state = this.state;
    _props = this.props;
    _navigator = this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "搜索结果",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_this.backRouter()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }

    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        {_state.productList.length?
          _state.productList?
          <ListView
            ref="ListView"
            dataSource={_state.dataSource}
            renderRow={_this._renderRow.bind(_this)}
            initialListSize={10}
            enableEmptySections={true}
          />
          :<NavWait />:<Lost title={'没有相关内容,请重新搜索'}/>
        }
      </View>
    );
  }

};
