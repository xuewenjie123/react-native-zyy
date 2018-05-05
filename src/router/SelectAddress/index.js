'use strict';
import React, { Component, } from 'react';
import { StyleSheet,View,Image,DeviceEventEmitter,TouchableOpacity,Text,TextInput,ListView,ToastAndroid,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import {deleteAddress,queryAddress,selectAddress} from '../../service/address';
import Lost from '../../components/common/Lost';
import { NavigationActions } from 'react-navigation';

var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
export default class Address extends Component {
    constructor(props) {
      super(props);
      this.state = {
          dataSource: ds,
          addressInfo: [],
          loading:true,
          loadContinue:true,
          list_key:0,
          talkContent:"",
          cartInfo:this.props.navigation.state.params.cartInfo
        };
     }
     queryResult(result){
       if(result.httpCode==200){
          _this.setState({
            dataSource: ds.cloneWithRows(result.list),
            addressInfo:result.list,
          })
          if(!result.list.length){
            _this.setState({
              loading:false
            })
          }
       }else{
           _this.queryFail()
       }
     }
     queryFail(){
       _this.setState({
         loadContinue:false
       })
     }
     componentDidMount(){
       if(this.props.navigation.state.params.talkContent){
        this.setState({
          talkContent:this.props.navigation.state.params.talkContent,
        })
       }
       if(this.props.navigation.state.params.idInfo){
         this.setState({
           list_key:this.props.navigation.state.params.idInfo,
         })
       }
       this.subscriptAdd= DeviceEventEmitter.addListener("changeSelectAddressUI",function(){
        queryAddress({},_this.queryResult,_this.queryFail)
       })
       queryAddress({},_this.queryResult,_this.queryFail)
     }
      componentWillUnmount(){
        this.subscriptAdd.remove()
      }

      rendNoneView(){
         return(
          <View style={{flex:1}}>
             <View style={styles.address_loadbox}>
              <Image source={require('../../images/address_load.png')} style={styles.load_img} />
              <Text style={styles.load_text}>您还没有收货地址</Text>
             </View>
          </View>
         )
       }
       clickPlace(index,id){
         _this.setState({
           list_key:index,
           dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(_this.state.addressInfo),
         })
          //  var resetAction = NavigationActions.reset({
          //    index: 0,
          //    actions: [
          //      NavigationActions.navigate({routeName: 'ConfirmOrder', params: { talkContent:_this.state.talkContent,id:id,index:index,cartInfo:_this.state.cartInfo}}),
          //    ]
          //  })
          // this.props.navigation.dispatch(resetAction)
          _navigator.goBack();
          DeviceEventEmitter.emit("changeConfirmOrderUI",{id:id,index:index})
       }

    deleteRow(index,id){
      var resultFu=function (result){
        if(result.httpCode==200){
          ToastAndroid.show('删除成功', ToastAndroid.SHORT);
          queryAddress({},_this.queryResult,_this.queryFail)
        }else{
          ToastAndroid.show('请稍后再试', ToastAndroid.SHORT);
        }
      }
      deleteAddress(id,resultFu)
    }
    onBackRouter(){
      _navigator.goBack()
    }
     render(){
       _this=this;
       _state=_this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "地址管理",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.onBackRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(

         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         {
           
          
           _this.state.addressInfo.length?
             <ListView
               alwaysBounce={true}
               dataSource={_this.state.dataSource}
               renderRow={_this._renderRow.bind(_this)}
               initialListSize={10}
               style={{flex:1}}
             /> : _this.state.loading?
              <NavWait />
              :_this.rendNoneView()
         }
               <TouchableOpacity style={styles.footer_btn} onPress={()=>{_navigator.navigate('EditAddress',{id:false,select:true,cartInfo:_state.cartInfo})}}>
                  <Text style={styles.footer_text}>+ 添加收货地址</Text>
               </TouchableOpacity>
        </View>
       )
     }
     _renderRow(rowContent,sectionID,rowID,){

       return(
         <View style={styles.label_box} key={rowID}>
          <TouchableOpacity onPress={()=>_this.clickPlace(rowID,rowContent.id)}>


              <View style={[styles.labels,{paddingTop:19}]}  onPress={()=>_this.clickPlace(rowID)}>
                   <View style={styles.perInfo}>
                       <Text style={_this.state.list_key==rowID?styles.selectText:styles.person_text}>{rowContent.name}</Text>
                       <Text style={_this.state.list_key==rowID?styles.selectText:styles.person_text}>{rowContent.phone}</Text>
                   </View>

                   {
                     _this.state.list_key==rowID?
                     <View style={styles.selectBox}>
                        <Text style={styles.init_text}>选中</Text>
                    </View>:null
                   }


              </View>

              <View style={[styles.labels,{borderColor:"#e6e6e5",paddingBottom:20,paddingTop:20,}]}>
                      {rowContent.isDefault?(
                        <View style={styles.default}>
                          <Text style={styles.init_text}>默认</Text>
                        </View>
                      ):null}
                       <Text style={[_this.state.list_key==rowID?styles.selectText:styles.address_text,{paddingRight:12}]} numberOfLines={2}>{rowContent.address}{rowContent.provinceName+rowContent.cityName+rowContent.countyName+rowContent.detail}</Text>

              </View>
          </TouchableOpacity>
         </View>
       )
     }
   }
