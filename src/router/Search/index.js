'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView,DeviceEventEmitter, TouchableOpacity, Text,ToastAndroid,StatusBar,TextInput,InteractionManager,BackHandler} from 'react-native';

var styles =require('./styles');
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import color from '../../constant/color';
import { searchRecords,getFamousList,getArchivesList,getProductList,deleteRecords} from '../../service/search';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
var _navigator,_this,_state,_props;
import {NavigationActions} from "react-navigation";
export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchType: this.props.navigation.state.params.type,
      searchContent:"",
      recommends:[],
      records:[],
    }
  }
  componentDidMount(){

   BackHandler.addEventListener('hardwareBackPress', function(){});
    var resultFu=function(error,data){
      if(data){
        _this.setState({records:data.search})
      }
    }

    switch (_state.searchType) {
      case 1:
      getStorage("findSearch",resultFu)
        break;
      case 3:
      getStorage("famousSearch",resultFu)
        break;
      default:
      getStorage("boutiqueSearch",resultFu)
    }
    InteractionManager.runAfterInteractions((id) => {
      searchRecords({searchType:_this.state.searchType},_this.searchRecordsResult);
    });
  }
  searchRecordsResult(result){
    console.log(result);
    if(result.httpCode == 200){
        _this.setState({recommends:result.recommends})
    }else{
    }
  }
  SetHistory(key,searchContent){
    getStorage(key,function(error,data){
        if(data){
          console.log(data);
            for(let i=0;i<data.search.length;i++){
                if(data.search[i]===searchContent){
                  data.search.splice(i,1)
                }
            }
            if(data.search.length>9){
              data.search.splice(0,1)
            }
          data.search.unshift(searchContent)
          setStorage(key,{search:data.search},function(){})
        }else{
          setStorage(key,{search:[searchContent]},function(){})
        }
    })
  }


  _search(searchContent){
    function trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    _this.refs.textInput.blur();
    var searchRecordsResult = function(response){
        if(response.httpCode == 200){
          if (_this.state.searchType==1) {
            _navigator.navigate('FindSearch',{archivesList:response.archivesList})
          }else if (_this.state.searchType==3) {
            _navigator.navigate('FamousSearch',{famousList:response.famousList})
          }else {
            _navigator.navigate('BoutiqueSearch',{productList:response.productList})
          }
        }
    };

    if (typeof searchContent!=="undefined") {
      if (_this.state.searchType==1) {
        _this.SetHistory("findSearch",searchContent)
        getArchivesList({keyword:trim(searchContent)},searchRecordsResult);
      }else if (_this.state.searchType==3) {
        _this.SetHistory("famousSearch",searchContent)
        getFamousList({keyword:trim(searchContent)},searchRecordsResult);
      }else {
        _this.SetHistory("boutiqueSearch",searchContent)
        getProductList({keyword:trim(searchContent)},searchRecordsResult);
      }
    }else {
      if (_this.state.searchContent!=="") {
        if (_this.state.searchType==1) {
          _this.SetHistory("findSearch",_this.state.searchContent)
          getArchivesList({keyword:trim(_this.state.searchContent)},searchRecordsResult);
        }else if (_this.state.searchType==3) {
          _this.SetHistory("famousSearch",_this.state.searchContent)
          getFamousList({keyword:trim(_this.state.searchContent)},searchRecordsResult);
        }else {
          _this.SetHistory("boutiqueSearch",_this.state.searchContent)
          getProductList({keyword:trim(_this.state.searchContent)},searchRecordsResult);
        }
      }else {
        ToastAndroid.show('请输入您要搜索的内容',ToastAndroid.SHORT)
      }

    }

  }

  _deleteHistory(){
    var resultFu=function(){
      console.log(1)
        _this.setState({records:[]})
    }
    switch (_state.searchType) {
      case 1:
        removeStorage("findSearch",resultFu)
        break;
      case 3:
        removeStorage("famousSearch",resultFu)
        break;
      default:
        removeStorage("boutiqueSearch",resultFu)
    }
  }
  navigateBack(){
    console.log(_state.searchType);
    _this.refs.textInput.blur();
//     const resetAction1 = NavigationActions.reset({
//       index:0,
//       actions:[
//        NavigationActions.navigate({routeName: 'Find'})
//      ]
//    });
//    const resetAction2 = NavigationActions.reset({
//      index:0,
//      actions:[
//       NavigationActions.navigate({routeName: 'Famous'})
//     ]
//   });
//   const resetAction3 = NavigationActions.reset({
//     index:0,
//     actions:[
//      NavigationActions.navigate({routeName: 'Boutique'})
//    ]
//  });
//     switch (_state.searchType) {
//       case 1:
//         _navigator.dispatch(resetAction1)
//         break;
//       case 3:
//           _navigator.dispatch(resetAction2)
//         break;
//       default:
//           _navigator.dispatch(resetAction3)
//     }
    _navigator.goBack()
    DeviceEventEmitter.emit("changeFamousUI")
    DeviceEventEmitter.emit("changeBoutiqueUI")
    DeviceEventEmitter.emit("changeFamousUI")
  }
  _delete(){
    var deleteRecordsResult = function(response){
        if(response.httpCode == 200){
           searchRecords({searchType:_this.state.searchType},_this.searchRecordsResult);
        }
    };
    deleteRecords({searchType:_this.state.searchType},deleteRecordsResult);
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator=_this.props.navigation;
    return (
      <View style={styles.wrapper}>
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle="dark-content"
        />
          <View style={styles.searchBox}>
            <View style={styles.searchCenter}>
                <View style={styles.searchConter}>
                    <TextInput  underlineColorAndroid="transparent" style={{flex:1,fontSize:12,color:color.font2C,paddingLeft:10,}} onChangeText={(text)=> this.setState({searchContent:text})} value={this.state.searchContent} placeholder={_state.searchType==1?"请输入您要搜索的新闻":_state.searchType==2?"请输入您要查询的商品":"请输入您要查询的名家"} ref={"textInput"}/>
                    <TouchableOpacity style={styles.search_btn} onPress={()=>_this._search()}>
                      <Image style={{width: 16, height:16}} source={require('../../images/searchBtn.png')}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => {_this.navigateBack()}}>
                    <Text style={styles.cancelText}>取消 </Text>
                </TouchableOpacity>
            </View>
          </View>
     <ScrollView>
        {_state.records.length?
          <View>
                <View style={styles.historyTitle}>
                  <View style={styles.historyCenter}>
                      <Text style={styles.textgeneral}>历史搜索记录</Text>
                  </View>
                </View>

                <View style={styles.hidtoryBox}>
                  {_state.records.map((d,index)=>(
                      <TouchableOpacity key={index} style={styles.hisBtn} underlayColor='transparent'  onPress={()=>_this._search(d)}>
                        <Text style={styles.hiscText}>
                          {d}
                        </Text>
                        <Text style={styles.hisdateText}>

                        </Text>
                      </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.hisCancelBtn} underlayColor='transparent' onPress={()=>_this._deleteHistory()}>
                    <Text style={styles.hisdateText}>清空历史记录</Text>
                  </TouchableOpacity>
                </View>
            </View>
          :null}

          {_state.recommends.length?
            <View>
                  <View style={styles.historyTitle}>
                    <View style={styles.historyCenter}>
                        <Text style={styles.textgeneral}>也许你要找</Text>
                    </View>
                  </View>

                  <View style={styles.mayBeBox}>
                      <View style={styles.mayBeCenter}>
                          {_state.recommends.map((d,index)=>(
                              <TouchableOpacity key={index} style={styles.similarBtn} underlayColor='transparent' onPress={()=>_this._search(d)}>
                                <Text style={styles.similarText}>
                                  {d}
                                </Text>
                              </TouchableOpacity>
                          ))}
                        </View>
                  </View>
              </View>
          :null}
        </ScrollView>
      </View>
    )
  }
  _resetToRouter(id){
    if(id){
      _navigator.resetTo({
        title:id,
        id:id,
      });
    }
  }
  _onPushRouter(id,item){
    if(id&&item){
      _navigator.push({
       title:id,
       id:id,
       params: {
          list:item
       },
     });
   }else if(id){
       _navigator.push({
        title:id,
        id:id,
      });
    }

  }
};
