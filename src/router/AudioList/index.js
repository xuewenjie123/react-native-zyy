'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,DeviceEventEmitter,TextInput,ListView,Text,ScrollView,RefreshControl,ToastAndroid,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import {getAllAudioList} from '../../service/boutique';
import NavWait from '../../components/common/NavWait';
import Lost from '../../components/common/Lost';
import {getStorage} from '../../constant/storage';
export default class AudioList extends Component {
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
          dataSource: ds,
          AudioList:[],
          loading:true,
          reset: true,
          total: 0,
          page: 1,
          size: 10,
          load: true,
        };
     }
     componentDidMount(){
      _this.subScription = DeviceEventEmitter.addListener("changeAudioListUI",function(){
           getAllAudioList({page:1},_this.getAllAudioListResult)
       })
        BackHandler.addEventListener('hardwareBackPress', function(){
           DeviceEventEmitter.emit("changeBoutiqueUI")
        });
        getAllAudioList({page:1},_this.getAllAudioListResult)
     }

     componentWillUnmount(){
      _this.subScription.remove()
      }

     getAllAudioListResult(result){
       if(result.httpCode==200&&result.list.records.length){
           if(_state.reset){
           _this.setState({
             dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list.records),
             AudioList:result.list.records,
             total: result.list.total,
             size: result.list.size,
             page: result.list.current,
             load: false,
             reset: false,
             start: false,
             loading:false,
           });
         }else{
           _this.setState({
             dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.AudioList.concat(result.list.records)),
             AudioList: _state.AudioList.concat(result.list.records),
             total: result.list.total,
             page: result.list.current,
             load: false,
             loading:false,
           });
         }
       }else{
         _this.setState({
           loading:false,
           total: 0,
           page: 1,
           load: false
         })
       }

     }

     onEndReached(){
       console.log(_state.page,_state.size);
       if(_state.page*_state.size<_state.total && !_state.load){
         _this.setState({load: true,});
         getAllAudioList({page:_state.page+1},_this.getAllAudioListResult)
       }
     }
     onRefresh() {
      if(_this.state.reset){
        return false
      }
       _this.setState({
         reset:true,
         load: true,
       })
         getAllAudioList({page:1},_this.getAllAudioListResult)
    }
    onpushRouter(list){
         getStorage("login",function(error,data){
           if(data){
             _navigator.navigate('ConfirmOrder',{cartInfo:[list],show:false})
           }else{
              ToastAndroid.show('请先登录',ToastAndroid.SHORT)
             _navigator.navigate('Login')
           }
         })
     }


     repalceDetail(str){
      return str.replace(/<[^<>]+>/,'')
     }
     _renderRow(list){
        return(
          <View style={styles.row}>
            <View style={styles.rowLbael}>

                <Image source={{uri:list.imgUrl}} style={{width:170*width/750,height:width*220/750,}}/>

                <View style={styles.row_right}>

                   <TouchableOpacity onPress={()=>_navigator.navigate('AudioRecom',{audioId:list.id_,audioList:true})}>
                      <View style={styles.textBox1}>
                        <Text style={styles.text1} numberOfLines={1}>{list.goodsName}{list.name}</Text>
                      </View>

                      <View style={styles.textBox2}>
                        <Text style={styles.text2} numberOfLines={2}>{list.goodsDes.replace(/[\r\n]/g,'')}</Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.btnGroup}>
                       <TouchableOpacity style={[styles.btn,!list.buy?{borderRightWidth:1,borderColor:color.boeder2c,flex:1}:{flex:1}]} onPress={()=>_navigator.navigate('AudioRecom',{audioId:list.id_,audioList:true})}>
                            <Text style={styles.text1}>{/*list.buy?"详情":"试听"*/}试听</Text>
                       </TouchableOpacity>
                       {/*!list.buy?*/
                         <TouchableOpacity style={styles.btn} onPress={()=>_this.onpushRouter(list)}>
                               <Text style={styles.text1}>购买</Text>
                          </TouchableOpacity>
                        /*:null*/}

                    </View>
                  </View>
            </View>
          </View>
        )
      }
     render(){
       _this=this;
       _navigator=this.props.navigation;
       _state=this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "音频列表",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_navigator.goBack();DeviceEventEmitter.emit("changeBoutiqueUI")}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         <TouchableOpacity style={{width: 45, height: 45,position:"absolute",right:12,bottom:20,zIndex:100}} onPress={() => {_this.refs.ListView.scrollTo({x:0,y:0,animated:true})}}>
            <Image style={{width: 45, height: 45}} source={require('../../images/return_top.png')}></Image>
          </TouchableOpacity>

          {

              _this.state.AudioList.length?
              <ListView
                ref="ListView"
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(_this)}
                initialListSize={10}
                enableEmptySections={true}
                scrollRenderAheadDistance={50}
                onEndReached={()=>_this.onEndReached()}
                onEndReachedThreshold={50}
                renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
                  <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                    {_state.load? '努力加载中...' : '没有数据了'}
                  </Text>
                </View>)}
                  refreshControl={
                  <RefreshControl
                    refreshing={_state.load}
                    onRefresh={_this.onRefresh.bind(_this)}
                    colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                    title= {this.state.load? '刷新中....':'下拉刷新'}
                  />
                }
              />
              : _this.state.loading?<NavWait />:
              <Lost title={"你访问的页面走丢了"}/>
            }

        </View>
       )
     }

   }
