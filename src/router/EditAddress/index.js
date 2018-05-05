'use strict';
import React, { Component, } from 'react';
import { StyleSheet,Picker,DeviceEventEmitter,Text,View,Image,TouchableOpacity,TextInput,ToastAndroid,ScrollView,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import AddressModal from '../../components/cityIndexListView/AddressModal';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import {selectAddress,editAddress,addAddress}  from '../../service/address';
import { NavigationActions } from 'react-navigation';
var _this,_state,_props,_navigator;
export default class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
          receiptName:'',
          telNumber:'',
          placeSelect:'',
          adressInfo:'',
          visible:false,
          palceSelect:'',
          provinceId:'',
          cityId:'',
          countyId:'',
        }
     }

     getPalceSelect(place,proval,cityval,counval){
       _this.setState({
         placeSelect:place,
         provinceId:proval,
         cityId:cityval,
         countyId:counval,
         visible:false
       })
       console.log(place)
       console.log(_state.placeSelect)
     }

     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
       var resultFu=function(result){
         if(result.httpCode==200&&result.address){
           _this.setState({
             receiptName:result.address.name,
             telNumber:result.address.phone,
             placeSelect:result.address.provinceName+result.address.cityName+result.address.countyName,
             adressInfo:result.address.detail,
             provinceId:result.address.provinceId,
             cityId:result.address.cityId,
             countyId:result.address.countyId,
           })
         }
       }

       selectAddress(_this.props.navigation.state.params.id,resultFu)
     }



     closeModal(){
       _this.setState({
         visible:false
       })
     }
     getModal(){
       _this.setState({
         visible:true
       })
     }
     finshedChange(){
       var resultFu = function(response){
           console.log(response)
           if(response.httpCode==200){
               if(_props.navigation.state.params.id){
                  ToastAndroid.show('修改成功', ToastAndroid.SHORT);
               }else{
                  ToastAndroid.show('添加成功', ToastAndroid.SHORT);
               }
               if(_props.navigation.state.params.select){
                 _navigator.goBack()
                 DeviceEventEmitter.emit("changeSelectAddressUI")
               }else{
                 _navigator.navigate("Address");
               }

           }else{
               ToastAndroid.show("请稍后再试", ToastAndroid.SHORT);
           }
       };

      if(!_state.receiptName){
        ToastAndroid.show('请输入收货人姓名', ToastAndroid.SHORT);
        return false;
      }else if (!_state.telNumber) {
        ToastAndroid.show('请输入联系电话', ToastAndroid.SHORT);
        return false;
      }
      // else if( !(/^1[3|4|5|7|8][0-9]{9}$/.test(_state.telNumber)) ){
      //     ToastAndroid.show('请输入正确的手机号码', ToastAndroid.SHORT);
      //     return false;
      // }
      else if (!_state.placeSelect) {
        ToastAndroid.show('请选择区域', ToastAndroid.SHORT);
        return false;
      }else if (!_state.adressInfo) {
        ToastAndroid.show('请输入详细地址', ToastAndroid.SHORT);
        return false;
      }else {
        if(_props.navigation.state.params.id){
          editAddress({id:_this.props.navigation.state.params.id,name: _state.receiptName,phone:_state.telNumber,detail:_state.adressInfo,countyId:_state.countyId,provinceId:_state.provinceId,cityId:_state.cityId},resultFu)
        }else{
          addAddress({name: _state.receiptName,phone:_state.telNumber,detail:_state.adressInfo,countyId:_state.countyId,provinceId:_state.provinceId,cityId:_state.cityId,isDefault:false},resultFu)
        }

      }

     }

     render(){
       _this=this;
       _props=this.props;
       _state=this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "地址管理",
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
       let AddressModalProps={
         visible:_state.visible,
         closeModal:function(){
           _this.closeModal()
         },
         getPalceSelect:function(place,proval,cityval,counval){
           _this.getPalceSelect(place,proval,cityval,counval)
         },
         provinceId:_state.provinceId,
         cityId:_state.cityId,
         countyId:_state.countyId,
       }
       return(
         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>
             <ScrollView>
             <View style={styles.change_box}>
                   <View style={styles.label}>
                         <Text style={styles.text}>收货人姓名</Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>this.setState({receiptName:text})} value={this.state.receiptName}/>
                   </View>

                   <View style={styles.label}>
                         <Text style={styles.text}>联 系 电 话 </Text>
                       <TextInput  underlineColorAndroid="transparent" style={{flex:1}} onChangeText={(text)=>this.setState({telNumber:text})} value={this.state.telNumber}/>
                   </View>


                   <View style={[styles.label,{justifyContent:"space-between"}]}>

                          <Text style={styles.text}>区 域 选 择 </Text>

                          <TouchableOpacity style={{height:45,paddingLeft:12,flex:1,justifyContent:"space-between",flexDirection:"row",alignItems:"center"}} onPress={()=>_this.getModal()}>
                            <Text style={styles.text}>{_state.placeSelect}</Text>
                            <Image source={require('../../images/register-icon.png')} style={styles.select_icon}/>
                          </TouchableOpacity>



                   </View>

                   <View style={styles.label}>
                       <Text style={styles.text}>详 细 地 址 </Text>
                      <TextInput  underlineColorAndroid="transparent" style={{height:45,paddingLeft:12,flex:1}} onChangeText={(text)=>this.setState({adressInfo:text})} multiline={true} value={this.state.adressInfo}/>

                   </View>

                   <TouchableOpacity style={styles.button} onPress={()=>_this.finshedChange()}>
                         <Image source={require('../../images/edit_fished.png')} style={styles.btn_bg}/>
                         <Text style={styles.yes_btn}>保存</Text>
                   </TouchableOpacity>
             </View>
             </ScrollView>
             <AddressModal {...AddressModalProps}/>
          </View>
       )
     }
   }
