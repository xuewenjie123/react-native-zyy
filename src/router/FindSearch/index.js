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
import { date2str,} from '../../constant/constants';
var _navigator,_this,_state,_props;
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {NavigationActions} from 'react-navigation';
export default class FindSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivesList:this.props.navigation.state.params.archivesList,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(this.props.navigation.state.params.archivesList)
    }
  }
  componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function(){});
   }
  _renderRow(rowContent,sectionID,rowID,){
    return(
      <View key={rowID} style={styles.list_box}>
      <View style={styles.list_boxin}>
        <TouchableOpacity style={styles.list_touch} onPress={() => {_navigator.navigate("JournalismDetail",{archivesId:rowContent.id_,FindSearch:true})}}>
          <View style={styles.list_cont}>
            <Text style={styles.list_text1} numberOfLines={2}>{rowContent.title}</Text>
            <View style={styles.list_contin}>
              <Text style={styles.list_text2}>{rowContent.source}</Text>
              <Text style={styles.list_text2}>{rowContent.publishTime?date2str(new Date(rowContent.publishTime.replace(/\-/g, "/")),"MM-dd hh:mm"):null}</Text>
            </View>
          </View>
          <Image style={{width: 94, height: 64,marginLeft:20,}} source={rowContent.url?{uri:rowContent.url}:rowContent.imgurl} />
        </TouchableOpacity>
      </View>
      </View>
    )

  }
  backRouter(){
    const resetAction = NavigationActions.reset({
      index:1,
      actions:[
        NavigationActions.navigate({routeName: 'Find'}),
        NavigationActions.navigate({routeName: 'Search', params:{type:1}})
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
        {_state.archivesList.length?
          _state.archivesList?
          <View style={styles.main}>
              <ListView
                ref="ListView"
                dataSource={_state.dataSource}
                renderRow={_this._renderRow.bind(_this)}
                initialListSize={10}
                enableEmptySections={true}
                contentContainerStyle={styles.contentViewStyle}
              />

          </View>
          :<NavWait />:<Lost title={'没有相关内容,请重新搜索'}/>
        }

      </View>
    );
  }

};
