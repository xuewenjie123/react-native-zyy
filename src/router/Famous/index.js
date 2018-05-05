'use strict';
import React, { Component, } from 'react';
import { View, Text,Image,ScrollView, TouchableOpacity,DeviceEventEmitter, ToastAndroid, InteractionManager,ListView,BackHandler,RefreshControl} from 'react-native';
var styles =require('./styles');
import { information,getSection }  from '../../service/famous';
import {focuslist }  from '../../service/find';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import NavWait from '../../components/common/NavWait';
import Lost from '../../components/common/Lost';
import color from '../../constant/color';
import SwiperBoxFamous from '../../components/famous/SwiperBoxFamous';
var _navigator,_this,_state,_props;

var imglist = [
  {imgurl: require('../../images/z-390-2.png'),},
  {imgurl: require('../../images/z-390-3.png'),},
  {imgurl: require('../../images/z-390-4.png'),},
];

var lastBackPressed
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
export default class Famous extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
    this.state = {
      imglist: [],
      list_a:[],
      list_a_key: {},
      list_b: [],
      dataSource:ds,
      infoLoad_a:true,
      loading_b:true,
      loading_a:true,
      lunbo:2,
      loginState:false,
      reset: true,
      total: 0,
      page: 1,
      size: 10,
      load: true,
      getList:[],
      departList:[],
      Ids:[],
      more:false,
      sliceList:[],
      show:false
    }
  }
  
  _onBackAndroid() {
    if (lastBackPressed&&lastBackPressed + 2000 >= new Date().getTime()){
          return false
    }
    lastBackPressed=new Date().getTime()
      // ToastAndroid.show('连按两次退出应用',ToastAndroid.SHORT);
      // return true
 }
  componentWillUnmount(){
      this.scription.remove()
    }
  componentDidMount(){
    // console.log("=====================")
    // console.log( global["global_"])
    this.scription = DeviceEventEmitter.addListener("changeFamousUI",function(){
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      getSection("section",_this.getSectionResult,_this.getA_FailResult)
      information({page:1,sectionId:_state.Ids},_this.informationResult,_this.getB_FailResult);
    })
    BackHandler.addEventListener('hardwareBackPress',_this._onBackAndroid)
    InteractionManager.runAfterInteractions(() => {
      focuslist(_state.lunbo,_this.focuslistResult,_this.Failfune)
      getSection("section",_this.getSectionResult,_this.getA_FailResult)
      information({page:1,sectionId:_state.Ids},_this.informationResult,_this.getB_FailResult);
    });
  }
  Failfune(){
    _this.setState({infoLoad_a:false,})
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
  getA_FailResult(){
    _this.setState({
      loading_a:false
    })
  }
  getB_FailResult(){
    _this.setState({
      total: 0,
      page: 1,
      load: false,
      reset: false,
      loading_b:false
    })
  }
  getSectionResult(result){
      if(result.httpCode == 200){
        if(result.sectionList)
          if(result.sectionList.length>8){
              _this.setState({
                more:true,
                sliceList:result.sectionList.slice(0,8)
              })
          }else{
            _this.setState({
              show:false
            })
          }
        _this.setState({list_a:result.sectionList})
      }else{
        _this.getA_FailResult();
        ToastAndroid.show(result.msg,ToastAndroid.SHORT)
      }
    }

  informationResult(result){
    if(result.httpCode == 200){
      if(result.list){
        if(!result.list.records.length){
          _this.getB_FailResult()
          return false
        }

        if(_state.reset){
          _this.setState({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.list.records),
            list_b: result.list.records,
            total: result.list.total,
            size: result.list.size,
            page: result.list.current,
            load: false,
            reset: false,
            start: false,
          });
        }else{
          _this.setState({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.list_b.concat(result.list.records)),
            list_b: _state.list_b.concat(result.list.records),
            total: result.list.total,
            page: result.list.current,
            load: false,
          });
        }
      }
    }else{
      _this.getB_FailResult()
    }
  }
  // getlistitem(index,id){
  //
  //   if(index==this.state.list_a_key){
  //     this.setState({
  //       list_a_key: {},
  //       list_b:[],
  //       loading_b:true
  //     })
  //
  //     information({},this.informationResult)
  //   }else{
  //     this.setState({
  //       list_a_key: index,
  //       list_b:[],
  //       loading_b:true
  //     })
  //     information({sectionId:id},this.informationResult)
  //   }
  // }

  navigateSearch(){
      _navigator.navigate('Search',{type:3})
  }

  getlistitem(index,id){
    let list=[];
    let IdList=[];
    list = _state.departList;
    IdList = _state.Ids;
    function setList(publicList,rowOne){
        if(publicList.indexOf(rowOne)==-1){
            publicList.push(rowOne)
        }else{
          publicList.splice(publicList.indexOf(rowOne),1)
        }
        return publicList
    }
    setList(IdList,id)
    setList(list,index)
    // if(_state.Ids.indexOf(id)==-1){
    //     IdList.push(id)
    // }else{
    //     IdList.splice(IdList.indexOf(id),1)
    // }
    //
    // if(_state.departList.indexOf(index)==-1){
    //     list.push(index)
    // }else{
    //     list.splice(list.indexOf(index),1)
    // }
    this.setState({
      departList:list,
      Ids:IdList
    });
    information({page:1,sectionId:IdList},_this.returnResult)
  }
  returnResult(result){
    if(result.httpCode == 200){
      if(result.list){
          if(!result.list.records.length){
            _this.getB_FailResult()
            return false
          }
          _this.setState({
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.list.records),
            list_b: result.list.records,
            total: result.list.total,
            size: result.list.size,
            page: result.list.current,
            load: false,
            reset: false,
            start: false,
          });
      }
    }else{
      _this.getB_FailResult()
    }
  }
  tabMore(){
    _this.setState({
      more:!_state.more,
      show:!_state.show
    })
  }
  renderHeader(){
    let SwiperBoxProps = {
        _navigator:_navigator,
         type:"famous",
      imglist: _state.imglist,
    };

  return (
    <View>
    <View style={styles.image}>
      {_state.infoLoad_a?_state.imglist.length?(<SwiperBoxFamous {...SwiperBoxProps}/>):<NavWait/>:<Lost title={"服务器异常请稍后再试"}/>}
    </View>

      {
        !_state.more?
        _state.list_a.length?
        <View style={styles.list_a}>
          {_state.list_a.map((d,index)=>(
            <View style={styles.info_a} key={index}>
              <TouchableOpacity  style={_state.departList.indexOf(index)==-1?styles.info_a1:styles.info_a2} underlayColor='transparent'
                onPress={() => {_this.getlistitem(index,d.id)}}>
                <Text style={_state.departList.indexOf(index)==-1?styles.text_a1:styles.text_a2}>
                  {d.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          {_state.show?
            <TouchableOpacity style={{width:width-15,alignItems:"center",paddingBottom:10,paddingTop:5}} onPress={()=>_this.tabMore()}>
              <Text style={styles.text_a1}>点击收起</Text>
            </TouchableOpacity>
            :null}
        </View>
      :_state.loading_a?<NavWait />:null
      :
      (<View style={styles.list_a}>
          {_state.sliceList.map((d,index)=>(
            <View style={styles.info_a} key={index}>
              <TouchableOpacity  style={_state.departList.indexOf(index)==-1?styles.info_a1:styles.info_a2} underlayColor='transparent'
                onPress={() => {_this.getlistitem(index,d.id)}}>
                <Text style={_state.departList.indexOf(index)==-1?styles.text_a1:styles.text_a2}>
                  {d.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={{width:width-15,alignItems:"center",height:30,marginTop:10}} onPress={()=>_this.tabMore()}>
            <Text style={styles.text_a1}>点击显示更多科室</Text>
          </TouchableOpacity>
      </View>)
      }
      </View>
    )
  }
  _renderRow(rowContent,sectionID,rowID,){
    if(rowContent.section.length>=3){
        rowContent.section.length=3;
        rowContent.maxLimit = true
    }
      return (
        <TouchableOpacity style={styles.info_b} key={rowID} underlayColor='transparent'
          onPress={() => _navigator.navigate("FamousDetail",{id_:rowContent.id_,Famous:true}) }>
              <View style={styles.imgborder}>
                      <View style={styles.imgborder2}>
                       <Image style={{width: 50, height: 50,borderRadius: 50,}} 
                        source={rowContent.url?{uri:rowContent.url}:require('../../images/head_portrait.png')}>
                        </Image>
                        {/* <Image style={{width: 50, height: 50,borderRadius: 50,}} 
                        source={require('../../images/head_portrait.png')}>
                        </Image>*/}
                      </View>
              </View>
              <View style={styles.cont2}>
                <View style={styles.cont3}>
                  <Text style={[styles.cont_text2,{marginRight:10,}]}>
                    {rowContent.name}
                  </Text>
                  {rowContent.section.length?
                    rowContent.section.map((d,index)=>(
                      <View style={styles.cont4} key={index}>
                        <Text style={[styles.cont_text3,{marginBottom:10}]}>
                          {d}
                        </Text>
                      </View>
                    ))
                    :null}
                    {rowContent.maxLimit?<Text style={styles.cont_text3}>......</Text>:null}
                </View>
                <Text style={styles.cont_text1}>
                  {rowContent.hospital}
                </Text>
              </View>
        </TouchableOpacity>
      )
  }
  onEndReached(){
    console.log(_state.page,_state.size);
    if(_state.page*_state.size<_state.total && !_state.load){
      _this.setState({load: true,});
      information({page:_state.page+1,sectionId:_state.Ids},_this.informationResult,_this.getB_FailResult);
    }
  }

  onRefresh() {
    _this.setState({
      reset:true,
      load: true,
    })
      information({page:1,sectionId:_state.Ids},_this.informationResult,_this.getB_FailResult);
 }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "名家",
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

    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
                <View style={styles.list_b}>
                  <ListView
                    ref="ListView"
                    removeClippedSubviews={false}
                   renderHeader={_this.renderHeader.bind(_this)}
                    dataSource={_state.dataSource}
                    renderRow={_this._renderRow.bind(_this)}
                    enableEmptySections={true}
                    initialListSize={_state.size}
                    scrollRenderAheadDistance={200}
                    onEndReached={()=>_this.onEndReached()}
                    onEndReachedThreshold={100}
                    renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
                      <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                        {_state.load? '努力加载中...' : '没有更多数据了'}
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
        <TouchableOpacity style={styles.consultation} underlayColor='transparent'
          onPress={() => {_this.navigateRouter()}}>
          <View style={styles.consultation2}>
            <Image style={{width: 28, height: 28,borderRadius: 28,}} source={require('../../images/m-56-1.png')}></Image>
          </View>
          <Text style={styles.text_b}>
            {"在线咨询"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  navigateRouter(){
    getStorage("login",(error,data)=>{
      if(data){
        _navigator.navigate("Consultation",Famous:true)
      }else{
        ToastAndroid.show("请先登录",ToastAndroid.SHORT)
        _navigator.navigate("Login")
      }
    })
  }
};
