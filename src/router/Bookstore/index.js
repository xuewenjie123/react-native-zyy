'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,DeviceEventEmitter,Text,ListView,ToastAndroid,ScrollView,BackHandler,RefreshControl} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import {focuslist}  from '../../service/find';
import {getAllBookList,getCategoryList} from '../../service/boutique';
import SwiperBoxbookstore from '../../components/bookstore/SwiperBoxbookstore';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import Lost from '../../components/common/Lost'

export default class Bookstore extends Component {
    constructor(props) {
      super(props);
      var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
        dataSource: ds,
        loading:true,
        bookList:[],
        imglist:[],
        list_b: [],
        list_b_key:"",
        lunbo:4,
        reset: true,
        total: 0,
        page: 1,
        size: 10,
        load: true,
        bookListId:""
        };
     }

     focuslistResult(result){
       if(result.httpCode == 200){
         result.list.length>10?result.list.splice(10,result.list.length-10):result.list
         _this.setState({
           imglist:result.list
         })
       }
     }
     componentDidMount(){
      _this.subscription = DeviceEventEmitter.addListener("changeBookstoreUI",function(){
        getCategoryList({},_this.fenleiResult)//分类书籍
        getAllBookList({page:1},_this.getBookListResult)
        focuslist(_state.lunbo,_this.focuslistResult)
      })
        BackHandler.addEventListener('hardwareBackPress', function(){});
       getCategoryList({},_this.fenleiResult)//分类书籍
       getAllBookList({page:1},_this.getBookListResult)
       focuslist(_state.lunbo,_this.focuslistResult)
     }
     compoentWillUnMount(){
      _this.subscription.remove()
    }
     fenleiResult(result){
       if(result.httpCode==200){
         let list = [{name:"全部",id_:""}].concat(result.categoryList)
           console.log(list);
         _this.setState({
            list_b:list
         })
       }
     }
     getBookListResult(result){
       _this.setState({
         loading:true
       })
       if(result.httpCode==200&&result.list.records.length){
           if(_state.reset){
             _this.setState({
               dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(result.list.records),
               bookList:result.list.records,
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
               dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.bookList.concat(result.list.records)),
               bookList: _state.bookList.concat(result.list.records),
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
            load: false,
            reset: false,
         })
       }

     }
     selectBook(index,id){//分类书籍
       console.log(_state.list_b);
       _this.setState({
         list_b_key:index,
         bookList:[],
         dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
         bookListId:id,
         loading:true
       })
       getAllBookList({page:1,bookListId:id},_this.getBookListResult)
     }
     onEndReached(){
       console.log(_state.page,_state.size);
       if(_state.page*_state.size<_state.total && !_state.load){
         _this.setState({load: true,});
         getAllBookList({page:_state.page+1,bookListId:_state.bookListId},_this.getBookListResult)
       }
     }
     onRefresh() {
       _this.setState({
         reset:true,
         load: true,
       })
         getAllBookList({page:1,bookListId:_state.bookListId},_this.getBookListResult)
    }

     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state = this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "精品书城",
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
            <View style={{flex:1}}>

                 <ListView
                    removeClippedSubviews={false}
                    alwaysBounce={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(_this)}
                    renderHeader={this._renderHeader.bind(_this)}
                    initialListSize={10}
                    style={{flex:1}}
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
           </View>
        </View>
       )
     }

     _renderHeader(){
       let SwiperBoxProps = {
         _navigator:_navigator,
         type:"book",
         imglist: _state.imglist,
       }
       return(
         <View>
         {_state.imglist.length?(<View style={styles.image}>
           <SwiperBoxbookstore {...SwiperBoxProps}/>
           </View>):<NavWait/>}
           {_state.list_b.length?
           <View style={styles.mayBeBox}>
               <View style={styles.mayBeCenter}>
                   {_state.list_b.map((d,index)=>(
                       <TouchableOpacity key={index} style={[styles.similarBtn,_state.list_b_key==index?{backgroundColor:color.main1C}:{}]} underlayColor='transparent' onPress={()=>_this.selectBook(index,d.id_)}>
                         <Image source={_state.list_b_key==index?require('../../images/clickbook2.png'):require('../../images/click_book1.png')} style={{width:152*width/750,height:43*width/750,alignItems:"center",justifyContent:"center",}}>
                             <Text style={_state.list_b_key==index?styles.similarTextActive:styles.similarText} numberOfLines={1}>
                               {d.name}
                             </Text>
                         </Image>
                       </TouchableOpacity>
                   ))}
                 </View>
           </View>
           :null}
           <View style={styles.rowSpace}>
               <View style={styles.leftBace}>
                  <Image style={{width: 53*width/750, height: 30*width/750,}} source={require('../../images/top_img1.png')}></Image>
                  <Text style={styles.text_b}> 销量排行</Text>
               </View>
           </View>
        </View>
       )

     }
     rowNumber(index){
       switch (index) {
         case '0':
          return (<Image source={require('../../images/number1.png')} style={{width:63*width/750,height:63*width/750,position:"absolute",right:0,top:31*width/750,}}/>)
           break;
         case "1":
          return (<Image source={require('../../images/number2.png')} style={{width:63*width/750,height:63*width/750,position:"absolute",right:0,top:31*width/750,}}/>)
           break;
         case "2":
          return (<Image source={require('../../images/number3.png')} style={{width:63*width/750,height:63*width/750,position:"absolute",right:0,top:31*width/750,}}/>)
           break;
         default: return null
     }
   }
     _renderRow(rowContent,sectionID,rowID,){
         return(
             <View style={styles.labelBox} key={rowID}>
                 <TouchableOpacity style={styles.labelsRow} onPress={()=>_navigator.navigate('BookDetail',{bookId:rowContent.id_,bookStore:true})}>
                      <Image source={{uri:rowContent.imgUrl}} style={{width:179*width/750,height:221*width/750,}}/>
                      <View  style={styles.rightRow}>
                          <View style={styles.textGroup}>
                               <Text style={styles.text1} numberOfLines={1}>{rowContent.goodsName}{rowContent.name}</Text>
                               <View style={styles.gorupText1}>
                                  <Text style={styles.text2} numberOfLines={1}>作者：{rowContent.author}</Text>
                                  <Text style={styles.text2} numberOfLines={1}>出版：{rowContent.version}</Text>
                               </View>
                               <View style={styles.gorupText}>
                                  <Text style={styles.footer_text2}  numberOfLines={1}>￥{rowContent.price}</Text>
                                  <Text style={styles.text3}  numberOfLines={1}>{rowContent.sales?rowContent.sales:"0"}买过</Text>
                               </View>
                          </View>
                    </View>
                    {_this.rowNumber(rowID)}
               </TouchableOpacity>
           </View>
         )
      }
   }
