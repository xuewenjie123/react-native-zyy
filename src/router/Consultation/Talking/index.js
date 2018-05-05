'use strict';
import React, { Component, } from 'react';
import { View, Image, ListView, DeviceEventEmitter,Text,TouchableOpacity,RefreshControl, ToastAndroid, TextInput,InteractionManager,BackHandler} from 'react-native';//InteractionManager
var styles =require('./styles');
import { selectById, }  from '../../../service/journalism';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../../components/common/NavigatorTopBar';
import WebViewAutoHeight from '../../../components/common/WebViewAutoHeight';
import NavWait from '../../../components/common/NavWait';
import color from '../../../constant/color';
import Lost from '../../../components/common/Lost';
import { date2str, } from '../../../constant/constants';
var _navigator,_this,_state,_props;
import {getQuestion,setQuestion} from '../../../service/consultation';


export default class Talking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      archivesId: this.props.navigation.state.params.famousId,
      archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}),
      //contents:"",
      list:[],
      total: 0,
      page: 1,
      size: 10,
      selectCondition: "",
      reset: true,
      start: true,
      loading:false,
      loadingList:true,
    }
  }
  componentDidMount(){
    _this.subscription=DeviceEventEmitter.addListener("changeTalking",function(){
      _this.setState({
        reset:true
      })
      getQuestion({page:1,famousId:_state.archivesId},_this.getQuestionResult);
   })
    InteractionManager.runAfterInteractions(() => {
      getQuestion({page:1,famousId:_state.archivesId},_this.getQuestionResult)
    });

  }
  componentWillUnmount(){
    this.subscription.remove()
  }
  getQuestionResult(result){
    if(result.httpCode == 200){
      if(result.list.records.length){
        if(_state.reset){
          // let showList = []
          // for(let i=0;i<result.list.records.length;i++){
          //     if(result.list.records[i].mine){
          //       showList.push(result.list.records[i].mine)
          //     }
          // }
          // if(!showList.length){
          //   _this.setState({
          //     loading:false,
          //     loadingList:false,
          //     list:[]
          //   })
          //   return false
          // }
          _this.setState({
            archivelist:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(result.list.records),
            list:result.list.records,
            total: result.list.total,
            size: result.list.size,
            page: result.list.current,
            loading: false,
            reset: false,
            start: false,
          })
        }else{
          _this.setState({
            archivelist: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(_state.list.concat(result.list.records)),
            list: _state.list.concat(result.list.records),
            total: result.list.total,
            page: result.list.current,
            loading: false,
          });
        }
      }else {
        _this.setState({
          loading:false,
          loadingList:false
        })
      }
    }
  }
  onEndReached(){
    if(_state.page*_state.size<_state.total && !_state.loading){
      _this.setState({loading: true,});
      getQuestion({page:_state.page+1,famousId:_state.archivesId},_this.getQuestionResult)
    }
  }
  onRefresh() {
    _this.setState({
      reset:true
    })
  getQuestion({page:1,famousId:_state.archivesId},_this.getQuestionResult)
 }
  _renderRow(rowData,sectionID,rowID,){
    
    return(
      <TouchableOpacity style={styles.dat2}  key={rowID} onPress={()=>_navigator.navigate('ConsultationDetail',{questionId:rowData.id_,Talking:true})}>
          <View style={styles.dat3}>
                {rowData.question?
                  <Image style={{width: 20, height: 20,marginRight: 13,marginLeft: 2,}} source={require('../../../images/active_wen.png')}></Image>
             :
                  <Image style={{width: 20, height: 20,marginRight: 13,marginLeft: 2,}} source={require('../../../images/active_da.png')}></Image>
                }

                <View style={styles.dat4}>
                  <Text style={[styles.cont_text4,{marginBottom:10,}]}>
                    {rowData.question}
                  </Text>
                  <View style={styles.dat5}>
                    <Text style={styles.cont_text5}>
                      {date2str(new Date(rowData.createTime.replace(/\-/g, "/")),"yyyy年MM月dd日 hh:mm:ss")}
                    </Text>
                  </View>
                </View>
              </View>
          </TouchableOpacity>
    )
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    _navigator = _this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "在线咨询",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
      navigator: _navigator,
    }
    return (
      <View style={{flex: 1}}>
        <NavigatorTopBar {...NavigatorTopBarProps}/>
        <View style={styles.main}>
            {_state.list.length?(
                  <ListView
                    dataSource={_state.archivelist}
                    renderRow={_this._renderRow.bind(_this)}
                    initialListSize={10}
                    enableEmptySections={true}
                    scrollRenderAheadDistance={200}
                    pageSize={_state.size}
                    onEndReached={()=>_this.onEndReached()}
                    onEndReachedThreshold={50}
                    renderFooter={()=>(<View style={{padding:15,justifyContent: 'center',alignItems: 'center',}}>
                      <Text style={{fontSize:12,color:'#999',textAlign:'center',}}>
                        {_state.loading? '努力加载中...' : '已经到底了'}
                      </Text>
                    </View>)}
                      refreshControl={
                      <RefreshControl
                        refreshing={_state.loading}
                        onRefresh={_this.onRefresh.bind(_this)}
                        colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
                        title= {this.state.loading? '刷新中....':'下拉刷新'}
                      />
                    }
                  />
            ):_state.loadingList?<NavWait/>:<Lost title="快来向专家提问吧"/>}
      </View>



            {/*<View style={styles.input}>
              <View style={styles.input2}>
                <Image style={{width: 25, height: 25,marginRight:10,}} source={require('../../../images/smartLaugn.png')}></Image>
              </View>
              <View style={styles.input3}>
                <TextInput underlineColorAndroid="transparent" maxLength={200} selectionColor={color.main1C}
                  style={{color:'#333',flex: 1,fontSize:14,textAlign:'left',margin:0,paddingLeft:10,paddingRight: 10,paddingTop:0,paddingBottom:0,}}
                  placeholder='请输入...' value={_state.contents} onChangeText={(text)=>{_this.setState({contents:text})}}/>
              </View>

              <TouchableOpacity style={{width:50,height:30,marginLeft:5,marginRight:5,borderRadius:5,backgroundColor:_this.state.contents?color.main1C:"#ccc",alignItems:"center",justifyContent:"center"}}
                underlayColor='transparent'
                onPress={() => _this._submit()}>
                <Text style={[styles.cont_text2,{color:_this.state.contents?color.back1C:null}]}>发送</Text>
              </TouchableOpacity>

            </View>*/}
            <View style={styles.input}>
              <TouchableOpacity underlayColor='transparent'
                onPress={() => {_navigator.navigate("ConsultationWrite",{famousId:_state.archivesId})}}>
                <Image style={styles.imgback} source={require('../../../images/m-702-1.png')}>
                  <Text style={styles.cont_text8}>
                    {"我要提问"}
                  </Text>
                </Image>
              </TouchableOpacity>
            </View>

      </View>
    );
  }

};
