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
var famousList = [
{
  hospital:"北京协和医院",
  id:890116565987749900,
  id_:"890116565987749888",
  name:"李时珍",
  section:"中医内科 ",
  url:"http://192.168.0.79/M00/00/3C/wKgAUFl4OWuAdx2ZAAAnPptXhsM423.jpg"
},
{
  hospital:"北京协和医院",
  id:890116565987749900,
  id_:"890116565987749888",
  name:"李时珍",
  section:"中医内科 ",
  url:"http://192.168.0.79/M00/00/3C/wKgAUFl4OWuAdx2ZAAAnPptXhsM423.jpg"
},
{
  hospital:"北京协和医院",
  id:890116565987749900,
  id_:"890116565987749888",
  name:"李时珍",
  section:"中医内科 ",
  url:"http://192.168.0.79/M00/00/3C/wKgAUFl4OWuAdx2ZAAAnPptXhsM423.jpg"
}
];

export default class FamousSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      famousList:this.props.navigation.state.params.famousList,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(this.props.navigation.state.params.famousList)
    }
  }
  componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', function(){});
   }
  _renderRow(rowContent,sectionID,rowID,){
    console.log(rowContent)
      return (
        <TouchableOpacity style={styles.info_b} key={rowID} underlayColor='transparent'
          onPress={() => _navigator.navigate("FamousDetail",{id_:rowContent.id_}) }>
              <View style={styles.imgborder}>
                      <View style={styles.imgborder2}>
                        <Image style={{width: 50, height: 50,borderRadius: 50,}} source={{uri:rowContent.url}}></Image>
                      </View>
              </View>
              <View style={styles.cont2}>
                <View style={styles.cont3}>
                  <Text style={[styles.cont_text2,{marginRight:10,}]}>
                    {rowContent.name}
                  </Text>
                  <View style={styles.cont4}>
                    <Text style={styles.cont_text3}>
                      {rowContent.section}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cont_text1}>
                  {rowContent.hospital}
                </Text>
              </View>
        </TouchableOpacity>
      )
  }
  backRouter(){
    const resetAction = NavigationActions.reset({
      index:1,
      actions:[
       NavigationActions.navigate({routeName: 'Famous'}),
       NavigationActions.navigate({routeName: 'Search', params:{type:3}})
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
        {_state.famousList.length?
          _state.famousList?
            <View style={styles.list_b}>
              <ListView
                ref="ListView"
                dataSource={_state.dataSource}
                renderRow={_this._renderRow.bind(_this)}
                initialListSize={10}
                enableEmptySections={true}
              />
            </View>
            :<NavWait />:<Lost title={'没有相关内容,请重新搜索'}/>
          }
      </View>
    );
  }

};
