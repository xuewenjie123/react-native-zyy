'use strict';
import React, { Component, } from 'react';
import { StyleSheet,ListView,View, DeviceEventEmitter,RefreshControl,TouchableOpacity,Image,Text,ToastAndroid,InteractionManager,BackHandler} from 'react-native';
import NavigatorTopBar from './../../components/common/NavigatorTopBar';
import color from './../../constant/color';
var styles =require('./styles');
import NavWait from '../../components/common/NavWait';
import {collectList,collectArchivesList} from '../../service/collect';
import Lost from '../../components/common/Lost';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
var _navigator,_this,_state;
var articletList=[
    {imgUrl:require("../../images/collect_book1.png"),bookName:"《齐民要术》图文精排版2017",writer:"著作：贾思勰",monney:"￥36.9"},
    {imgUrl:require("../../images/collect_book1.png"),bookName:"《齐民要术》图文精排版2017",writer:"著作：贾思勰",monney:"￥36.9"},
    {imgUrl:require("../../images/collect_book1.png"),bookName:"《齐民要术》图文精排版2017",writer:"著作：贾思勰",monney:"￥36.9"},
    {imgUrl:require("../../images/collect_book1.png"),bookName:"《齐民要术》图文精排版2017",writer:"著作：贾思勰",monney:"￥36.9"},
];
export default class Collect extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
        this.state = {
          type:'artice',
          loading:true,
          dataSource: ds,
          list:[],
          reset: true,
          total: 0,
          page: 1,
          size: 10,
          load: true,
        };
     }
     componentDidMount(){
      _this.subscription = DeviceEventEmitter.addListener("changeCollectUI",function(){
        _this.setState({
          reset:true
        })
        collectArchivesList({page:1},_this.collectListResult);
        collectList({page:1},_this.collectListResult);
      })
         InteractionManager.runAfterInteractions(() => {
           collectArchivesList({page:1},_this.collectListResult);
         });
    }
    compoentWillUnMount(){
      _this.subscription.remove()
    }
     collectListResult(result){
       console.log(result.list.records);
       if(result.httpCode == 200&&result.list.records.length){
            if(_state.reset){
                _this.setState({
                  list:result.list.records,
                  dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list.records),
                  total: result.list.total,
                  size: result.list.size,
                  page: result.list.current,
                  load: false,
                  reset: false,
                  start: false,
                  loading:false,
                })
            }else{
                  _this.setState({
                    list:_state.list.concat(result.list.records),
                    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(_state.list.concat(result.list.records)),
                    total: result.list.total,
                    page: result.list.current,
                    load: false,
                    loading:false
                  })
            }
        }else{
          _this.setState({
            loading:false,
            total: 0,
            page: 1,
            load: false,
          })
        }
     }
     onEndReached(){
      console.log(_state.page,_state.size);
      if(_state.page*_state.size<_state.total && !_state.load){
        _this.setState({load: true,});
        if(_this.state.type=='artice'){
          collectArchivesList({page:_state.page+1},_this.collectListResult);
        }else{
          collectList({page:_state.page+1},_this.collectListResult);
        }
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
      if(_this.state.type=='artice'){
        collectArchivesList({page:1},_this.collectListResult);
      }else{
        collectList({page:1},_this.collectListResult);
      }
   }
     typeChange(newState){
       _this.setState({loading:true,list:[],type:newState,load:true,reset:true})
       if (newState=='artice') {
         collectArchivesList({page:1},_this.collectListResult);
       }else{
         collectList({page:1},_this.collectListResult);
       }
     }
     onpushRouter(id,type){
        switch (type) {
          case 1:
            _navigator.navigate("BookDetail",{bookId:id,Collect:true})
            break;
          case 2:
            _navigator.navigate("AudioRecom",{audioId:id,Collect:true})
            break;
          case 3:
            _navigator.navigate("VideoInfo",{videoId:id,Collect:true})
            break;
          default:
            _navigator.navigate("BookDetail",{bookId:id,Collect:true})
        }
     }
     _renderRow(rowContent){
       return (
          _this.state.type=="artice"?
          (
            <TouchableOpacity style={styles.label_box} onPress={()=>_navigator.navigate('JournalismDetail',{archivesId:rowContent.id_,collect:true})}>
            <View style={styles.labels}>
               <Image source={rowContent.url?{uri: rowContent.url}:undefined} style={styles.left_img} />
                 <View style={styles.right_des}>
                   <Text style={styles.book_name} numberOfLines={1}>{rowContent.title}</Text>
                   <Text style={styles.writer} numberOfLines={1}>{rowContent.source}</Text>
                   <Text style={styles.monney} numberOfLines={1}>{rowContent.price}</Text>
                 </View>
            </View>
          </TouchableOpacity>
          )

         :(
           <TouchableOpacity style={styles.label_box}   onPress={() =>_this.onpushRouter(rowContent.id_,rowContent.type)}>
             <View style={styles.labels}>
                  <Image source={rowContent.imgUrl?{uri: rowContent.imgUrl}:require('./../../images/icon-44-1.png')} style={styles.left_img} />
                  <View style={styles.right_des}>
                    <Text style={styles.book_name} numberOfLines={1}>{rowContent.goodsName}{rowContent.name}</Text>
                    <Text style={styles.writer} numberOfLines={1}>{rowContent.goodsDes}</Text>
                    <Text style={styles.monney} numberOfLines={1}>￥{rowContent.price} </Text>
                  </View>
             </View>
           </TouchableOpacity>
         )
       )
     }

     _renderHeader(){
       return(
         <View style={styles.header_box}>
         <View style={styles.bar}>
             <View style={styles.leftbar}>
                 <TouchableOpacity style={{flex: 1}}
                   underlayColor='transparent'
                   onPress={() => {_navigator.goBack()}}>
                   <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                     <Image style={{width: 12, height: 22,}} source={require('./../../images/icon-44-1.png')}></Image>
                   </View>
                 </TouchableOpacity>
              </View>
             {
               _this.state.type=="artice"?(
                 <View style={styles.btngroup}>
                   <TouchableOpacity style={styles.ArticleBtn}>
                        <Text style={[styles.textgeneral,{color:color.main1C}]}>文章</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.commodityBtn} onPress={()=>_this.typeChange('commodity')}>
                        <Text style={styles.textgeneral}>商品</Text>
                    </TouchableOpacity>
                  </View>
               ):(
                  <View style={styles.btngroup}>
                   <TouchableOpacity style={styles.btnArtice} onPress={()=>_this.typeChange('artice')}>
                          <Text style={styles.textgeneral}>文章</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCommodity}>
                        <Text style={[styles.textgeneral,{color:color.main1C}]}>商品</Text>
                    </TouchableOpacity>
                    </View>
               )
             }
             <View style={{flex:1}}></View>
         </View>
         <View style={styles.marginbox}></View>
         </View>
       )
     }
     render(){
       _navigator=this.props.navigation;
       _this=this;
       _state=this.state;
       return(
           <View style={styles.main}>
           {
             _this.state.list.length?
             <ListView
               dataSource={_this.state.dataSource}
               renderHeader={_this._renderHeader.bind(_this)}
               renderRow={_this._renderRow.bind(_this)}
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

             :
               <View style={{flex:1}}>
              {this._renderHeader()}
              {_this.state.loading?<NavWait />:_this.state.type=='artice'?
                <Lost title="您还没有收藏的文章" image={require('../../images/collect_none.png')}/>
              :<Lost title="您还没有收藏的商品" image={require('../../images/collect_none.png')}/>}
              </View>


           }

            </View>

       )
     }
   }
