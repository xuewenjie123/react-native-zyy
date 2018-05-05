'use strict';
import React,{ Component} from 'react';
import { StyleSheet,View,Image,TouchableOpacity,Text,TextInput,ListView,ToastAndroid,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import {NavigationActions} from 'react-navigation';
import ModalDelete from '../../components/common/ModalDelete'
import {deleteAddress,queryAddress,setDefaultFunc} from '../../service/address';
import Lost from '../../components/common/Lost';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
var addressInfo=[
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中",info:"建国路88号SOHO现代城5号楼2202室",isDefault:true,id:1},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:2},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:3},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:4},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:5},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:6},
    {name:"孙悟空",tel:13387366322,address:"江苏省连云港市南云台山中麓花果山水帘洞",info:"建国路88号SOHO现代城5号楼2202室",isDefault:false,id:7},
];


export default class Address extends Component {
    constructor(props) {
      super(props);
      var ds= new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
          dataSource: ds,
          visible:false,
          addressInfo: [],
          loading:true,
          loadContinue:true,
          deleteId:"",
        };
     }
     queryResult(reuslt){
       if(reuslt.httpCode==200){
          _this.setState({
            dataSource: _this.state.dataSource.cloneWithRows(reuslt.list),
            addressInfo:reuslt.list,
          })
          if(!reuslt.list.length){
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
       BackHandler.addEventListener('hardwareBackPress', function(){});
       queryAddress({},_this.queryResult,_this.queryFail)
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

       deleteAction(index,id){
          _this.setState({
            visible:true,
            deleteId:id
          })
       }

      closeModal(){
        _this.setState({
          visible:false
        })
      }
      deleteRow(){
        _this.setState({
          visible:false
        })
        var resultFu=function (result){
          if(result.httpCode==200){
            ToastAndroid.show('删除成功', ToastAndroid.SHORT);
            queryAddress({},_this.queryResult,_this.queryFail)
          }else{
            ToastAndroid.show('请稍后再试', ToastAndroid.SHORT);
          }
        }
        deleteAddress(_this.state.deleteId,resultFu)
       }
      isShowChange(id){

        var resultFu=function (result){
          if(result.httpCode==200){
            ToastAndroid.show('设为默认成功', ToastAndroid.SHORT);
            queryAddress({},_this.queryResult,_this.queryFail)
          }else{
            ToastAndroid.show('网络请求失败', ToastAndroid.SHORT);
          }
        }
        setDefaultFunc(id,resultFu)
      }
      backRouter(){
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
              NavigationActions.navigate({routeName: 'Mine'}),
            NavigationActions.navigate({routeName: 'Setting'})
          ]
        })
        _navigator.dispatch(resetAction)
      }
     render(){
       _this=this;
       _state=this.state;
       _navigator=this.props.navigation;
       let NavigatorTopBarProps = {
           visible: true,
           title: "地址管理",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.backRouter()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       let ModalDeleteProps={
         visible:_state.visible,
         closeModal:function(){
           _this.closeModal()
         },
         deleteRow:function(){
           _this.deleteRow()
         }
       }
       return(

         <View style={styles.main}>
           <ModalDelete {...ModalDeleteProps}/>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         {
           _this.state.loadContinue?
           _this.state.loading?
           _this.state.addressInfo.length?
             <ListView
               alwaysBounce={true}
               dataSource={this.state.dataSource}
               renderRow={this._renderRow.bind(this)}
               initialListSize={10}
               style={{flex:1}}
               enableEmptySections={true}
             /> :
             <NavWait />
           :_this.rendNoneView()
           :<Lost title={"请检查您的网络"}/>
         }
               <TouchableOpacity style={styles.footer_btn} onPress={()=>{_navigator.navigate('EditAddress',{id:false})}}>
                  <Text style={styles.footer_text}>+ 添加收货地址</Text>
               </TouchableOpacity>
        </View>
       )
     }
     _renderRow(rowContent,sectionID,rowID){

       return(
         <View style={styles.label_box} key={rowID}>
          <TouchableOpacity onPress={()=>{_navigator.navigate('EditAddress',{id:rowContent.id})}}>
              <View style={[styles.labels,{paddingTop:19}]}>
                   <View style={styles.perInfo}>
                       <Text style={styles.person_text}>{rowContent.name}</Text>
                       <Text style={styles.person_text}>{rowContent.phone}</Text>
                   </View>
              </View>

              <View style={[styles.labels,{borderBottomWidth:1,borderColor:"#e6e6e5",paddingBottom:9}]}>
                       <Text style={[styles.address_text,{paddingTop:12,paddingRight:12}]} numberOfLines={2}>{rowContent.address}{rowContent.provinceName+rowContent.cityName+rowContent.countyName+rowContent.detail}</Text>
                       <Image source={require('../../images/register-icon.png')} style={styles.cr_icon}/>
              </View>
          </TouchableOpacity>

           <View style={styles.labels}>
              <TouchableOpacity style={styles.initLeft} onPress={()=>{_this.isShowChange(rowContent.id)}}>
                <View style={styles.radio_box}>
                    {rowContent.isDefault?(
                        <Image source={require('../../images/radio_active.png')} style={styles.radio_active}/>
                    ):(
                        <View style={styles.radioInit}></View>
                    )}
                </View>
                <Text style={styles.init_text}>设为默认</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={()=>{_this.deleteAction(rowID,rowContent.id)}}>
                <Text style={styles.delete}>删除</Text>
              </TouchableOpacity>
           </View>

         </View>
       )
     }
   }
