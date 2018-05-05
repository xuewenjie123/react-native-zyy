'use strict';
import React, { Component, } from 'react';
import { View, Image, ScrollView,DeviceEventEmitter, TouchableOpacity, Text,ToastAndroid,BackHandler,RefreshControl, InteractionManager} from 'react-native';//InteractionManager

var styles =require('./styles');
import { getBoutique } from '../../service/boutique';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import NavWait from '../../components/common/NavWait';
import Lost from '../../components/common/Lost';
import SwiperBoxboutique from '../../components/boutique/SwiperBoxboutique';
import {focuslist}  from '../../service/find';
var _navigator,_this,_state,_props;
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
var imglist = [
  {imgurl: require('../../images/bq_lb2.png'),},
  {imgurl: require('../../images/z-390-2.png'),},
  {imgurl: require('../../images/z-390-3.png'),},
];

// var list_a = [
//   {imgurl: require('../../images/bq_book1.png'),goodsName: "《梦溪笔谈》",name:"沈括著（宋）",price:36.9,Sales:139,},
//   {imgurl: require('../../images/bq_book2.png'),goodsName: "《本草纲目》",name:"李时珍著(明)",price:38.8,Sales:128,},
//   {imgurl: require('../../images/bq_book3.png'),goodsName: "《梦溪笔谈》",name:"沈括著（宋）",price:36.9,Sales:139,},
//   {imgurl: require('../../images/bq_book4.png'),goodsName: "《本草纲目》",name:"李时珍著(明)",price:38.8,Sales:128,},
// ];
// var list_b = [
//   {imgurl: require('../../images/left_img1.png'),goodsName: "《贾海忠中医体悟：父子亲传实录》",info:"本音频是作者将自己多年来对中医的思……",},
//   {imgurl: require('../../images/left_img2.png'),goodsName: "《医古文》课文朗读",info:"本音频是作者将自己多年来对中医的思……",},
// ];

// var list_c=[
//   {name: "演讲",},
//   {name: "文化",},
//   {name: "原著",},
//   {name: "朗诵",},
// ]
// var list_d=[
//     {
//       imgUrl:require('../../images/conten_1.png'),
//       goodsName:"李德教授专讲《中医基础理论》",
//       name:"23集",
//     },
//     {
//       imgUrl:require('../../images/conten_2.png'),
//       goodsName:"李德教授专讲《中医基础理论》",
//       name:"23集",
//     },
//     {
//       imgUrl:require('../../images/conten_1.png'),
//       goodsName:"李德教授专讲《中医基础理论》",
//       name:"23集",
//     },
//     {
//       imgUrl:require('../../images/conten_2.png'),
//       goodsName:"李德教授专讲《中医基础理论》",
//       name:"23集",
//     },
//
// ];
// var list_c=[
//   "演讲","文化","原著","朗诵",
// ]
var lastBackPressed;
export default class Boutique extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imglist: [],
      list_a: [],
      list_b:[],
      list_c:[],
      list_d:[],
      loading:true,
      infoLoad_a:true,
      lunbo:3,
    }
  }

  componentDidMount(){
    _this.subScription = DeviceEventEmitter.addListener("changeBoutiqueUI",function(){
        focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
        getBoutique({},_this.getBoutiqueResult,_this.getBoutiqueFail);
    })
    InteractionManager.runAfterInteractions(() => {
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      getBoutique({},_this.getBoutiqueResult,_this.getBoutiqueFail);
    });

  }

  componentWillUnmount(){
    _this.subScription.remove()
  }
  Failfune(){
    _this.setState({
      infoLoad_a:false
    })
  }
  focuslistResult(result){
    if(result.httpCode == 200){
      result.list.length>10?result.list.splice(10,result.list.length-10):result.list
      _this.setState({
        imglist:result.list
      })
    }else{
      _this.Failfune()
    }
  }

    getBoutiqueResult(result){
      if(result.httpCode == 200){
        _this.setState({
          list_a:result.list.bookList,
          list_b:result.list.audioList,
          list_d:result.list.videoList,
          load:false
        })
      }else{
        _this.getBoutiqueFail()
        ToastAndroid.show(result.msg,ToastAndroid.SHORT)
      }
    }
    getBoutiqueFail(){
      _this.setState({
        loading:false
      })
    }
    navigateSearch(){
          _navigator.navigate('Search',{type:2})
    }
    onRefresh(){
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      getBoutique({},_this.getBoutiqueResult,_this.getBoutiqueFail);
    }

  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "精品",
      rightView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
            onPress={() => _this.navigateSearch()}>
          <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end"}}>
            <Image style={{width: 16, height: 16,}} source={require('../../images/icon-32-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    let SwiperBoxProps = {
      _navigator:_navigator,
       type:"boutique",
      imglist: _state.imglist,
    }

    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
            <View style={styles.main}>
                  <ScrollView  contentContainerStyle={{width:width}}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={_state.load}
                                        onRefresh={_this.onRefresh}
                                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                                        title= {this.state.load? '刷新中....':'下拉刷新'}
                                    />
                    }>
                    {_state.infoLoad_a?_state.imglist.length?(<SwiperBoxboutique {...SwiperBoxProps}/>):<NavWait/>:<Lost title={"服务器异常请稍后再试"}/>}

                      <View style={styles.box}>

                          <View style={styles.rowsRcenter}>
                              <Image style={{width: 230*width/750, height: 1,}} source={require('../../images/linear_bquire_l.png')}></Image>
                                <Text style={[styles.text_a,{color:color.back3C,paddingLeft:8,paddingRight:8,}]}>精彩推荐</Text>
                              <Image style={{width: 230*width/750, height: 1,}} source={require('../../images/linear_bquire_r.png')}></Image>
                          </View>


                          <View style={styles.rows_c}>
                            <TouchableOpacity  style={styles.info_a} underlayColor='transparent'
                              onPress={() => _navigator.navigate('Bookstore')}>
                              <Image style={{width: 108*width/750, height: 116*width/750,marginBottom:8,}}  source={require('../../images/buqire_t1.png')}></Image>
                              <Text style={styles.text_a}>精品书籍</Text>
                            </TouchableOpacity>

                            <Image style={{width: 1, height: 112*width/750,}} source={require('../../images/bq_linear_s.png')}></Image>

                            <TouchableOpacity  style={styles.info_a} underlayColor='transparent'
                              onPress={() => _navigator.navigate('AudioList')}>
                              <Image style={{width: 108*width/750, height: 116*width/750,marginBottom:8,}} source={require('../../images/buqire_t2.png')}></Image>
                              <Text style={[styles.text_a,{paddingBottom:8}]}>音频推荐</Text>
                            </TouchableOpacity>

                            <Image style={{width: 1, height: 112*width/750,}} source={require('../../images/bq_linear_s.png')}></Image>

                            <TouchableOpacity  style={styles.info_a} underlayColor='transparent'
                              onPress={() => _navigator.navigate('VideoList')}>
                              <Image style={{width: 108*width/750, height: 116*width/750,marginBottom:8,}} source={require('../../images/buqire_t3.png')}></Image>
                              <Text style={styles.text_a}>视频推荐</Text>
                            </TouchableOpacity>
                          </View>
                      </View>

                      <View style={styles.box}>
                          <View style={styles.rowSpace}>
                              <View style={styles.leftBace}>
                                <Text style={styles.text_b}>精品</Text>
                                <Image style={{width: 84*width/750, height: 48*width/750,}} source={require('../../images/bq_tip1.png')}></Image>
                              </View>
                              <TouchableOpacity style={styles.rightBace} onPress={() => _navigator.navigate('Bookstore')}>
                                <Text style={[styles.text_c,{paddingRight:3}]}>更多</Text>
                                <Image source={require('../../images/register-icon.png')} style={{width:11,height:11}}/>
                              </TouchableOpacity>
                          </View>


                            {_state.list_a.length?(<View style={styles.cont_list}>
                              {_state.list_a.map((d,index)=>(
                                <TouchableOpacity key={index} style={styles.cont_box} underlayColor='transparent'
                                  onPress={() => {_navigator.navigate("BookDetail",{bookId:d.id_,Boutique:true})}}>
                                  <Image style={{width:width*340/750, height: width*340/750,}}
                                    source={{uri:d.imgUrl}}></Image>

                                  <View style={[styles.cont_text_a,{height:25,alignItems:"flex-end"}]}>
                                    <Text style={styles.cont_text_a1} numberOfLines={1}>
                                      {d.goodsName}{d.name}
                                    </Text>
                                  </View>

                                  <View style={[styles.cont_text_a,{height:30,alignItems:"center"}]}>
                                    <Text style={styles.cont_text_a2}>
                                      {'￥'+d.price}
                                    </Text>
                                    <Text style={styles.cont_text_a3}>
                                      销量：{d.sales?""+d.sales:"0"}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              ))}
                            </View>):_state.loading?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}
                          </View>




                          <View style={styles.box}>
                              <View style={[styles.rowSpace,{borderBottomWidth:0}]}>
                                  <View style={styles.leftBace}>
                                    <Text style={styles.text_b}>推荐</Text>
                                    <Image style={{width: 84*width/750, height: 48*width/750,}} source={require('../../images/bq_tip2.png')}></Image>
                                  </View>
                                  <TouchableOpacity style={styles.rightBace} onPress={() => _navigator.navigate('AudioList')}>
                                    <Text style={[styles.text_c,{paddingRight:3}]}>更多</Text>
                                    <Image source={require('../../images/register-icon.png')} style={{width:11,height:11}}/>
                                  </TouchableOpacity>
                              </View>


                                {_state.list_b.length?
                                  _state.list_b.map((d,index)=>(

                                    <TouchableOpacity key={index} style={styles.cont_list_b} underlayColor='transparent'
                                      onPress={() => {_navigator.navigate("AudioRecom",{audioId:d.id_,Boutique:true})}}>
                                      <Image style={{width:width*144/750, height: width*98/750,}}
                                        source={{uri:d.imgUrl}}></Image>
                                      <View style={styles.cont_text_b}>
                                        <Text style={styles.cont_text_b1} numberOfLines={1}>
                                          {d.goodsName}{d.name}
                                        </Text>
                                        <Text style={styles.cont_text_b2} numberOfLines={1}>
                                          {d.goodsDes.replace(/[\r\n]/g,'')}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  )):_state.loading?<NavWait/>:<Lost  title={"您访问的页面走丢了"}/>}

                                  {/*_state.loading?*/_state.list_c.length?
                                    <View style={styles.list_c}>{_state.list_c.map((d,index)=>(
                                      <TouchableOpacity key={index} style={styles.cont_list_c} underlayColor='transparent'
                                        onPress={() => {_navigator.navigate("JournalismMedicineDetail",{channelId:18,archivesId:d.id_})}}>
                                          <Text style={styles.text_c} numberOfLines={1}>
                                            {d.name}
                                          </Text>
                                      </TouchableOpacity>
                                    ))}</View>:/*<NavWait/>:*/null}
                              </View>

                              <View style={styles.box}>
                                  <View style={styles.rowSpace}>
                                      <View style={styles.leftBace}>
                                        <Text style={styles.text_b}>推荐</Text>
                                        <Image style={{width: 84*width/750, height: 48*width/750,}} source={require('../../images/bq_tip3.png')}></Image>
                                      </View>
                                      <TouchableOpacity style={styles.rightBace} onPress={() => _navigator.navigate('VideoList')}>
                                        <Text style={[styles.text_c,{paddingRight:3}]}>更多</Text>
                                        <Image source={require('../../images/register-icon.png')} style={{width:11,height:11}}/>
                                      </TouchableOpacity>
                                  </View>

                                    {_state.list_d.length?

                                      ( <View style={styles.videoBox}>
                                      {_state.list_d.map((d,index)=>(
                                        <TouchableOpacity style={styles.smallbox} key={index} onPress={()=>_navigator.navigate('VideoInfo',{videoId:d.id_,Boutique:true})}>
                                             <View style={styles.imgBox}>
                                                 <Image style={{width:340/750*width,height:width*244/750,}} source={{uri:d.imgUrl}} />
                                                 {/*<View style={styles.collecBack}></View>
                                                 <View style={styles.collecBox}>
                                                   <Text style={styles.collection}>{d.collection}</Text>
                                                 </View>*/}
                                             </View>

                                               <View style={styles.videoInfo}>
                                                   <Text style={styles.textName} numberOfLines={2}>{d.goodsName}{d.name}</Text>
                                               </View>
                                         </TouchableOpacity>
                                      ))}
                                    </View>)
                                    :_state.loading?
                                    <NavWait/>:<Lost title={"您访问的页面走丢了"}/>}
                                  </View>
                  </ScrollView>
              </View>
          </View>


    );
  }

};
