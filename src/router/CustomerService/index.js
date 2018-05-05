'use strict';
import React, { Component, } from 'react';
import { StyleSheet,Text,View,Image,TouchableOpacity,TextInput,ListView,ScrollView,ToastAndroid,BackHandler,InteractionManager} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {customerService} from '../../service/customerService';
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import NavWait from '../../components/common/NavWait';
import { date2str, }  from '../../constant/constants';
var goods=[
    {orderTime:"2017.5.5",returnTime:"2017.5.5",imgUrl:require('../../images/return_books1.png'),bookName:"《齐民要术》图文精排版2017",writer:"贾思偲",booksNumber:1,booksMoney:50,booksState:"正在退货",id:1},
    {orderTime:"2017.5.5",returnTime:"2017.5.5",imgUrl:require('../../images/return_books1.png'),bookName:"《齐民要术》图文精排版2017",writer:"贾思偲",booksNumber:1,booksMoney:50,booksState:"正在退货",id:2},
    {orderTime:"2017.5.5",returnTime:"2017.5.5",imgUrl:require('../../images/return_books1.png'),bookName:"《齐民要术》图文精排版2017",writer:"贾思偲",booksNumber:1,booksMoney:50,booksState:"已完成",id:3},
];


export default class CustomerService extends Component {
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
        dataSource: ds,
        orderReturn:[],
        loading:true,
        showText:""
        };
     }

     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
       getStorage("login",function(error,data){
           if(data){
             InteractionManager.runAfterInteractions(() => {
               customerService("",_this.customerServiceResult);
             });
           }
       })

     }
     customerServiceResult(result){
       if(result.httpCode == 200){
         if(!result.myOrderServerList.length){
           _this.setState({
             loading:false,
           })
           return false
         }
         if(result.myOrderServerList){
             _this.setState({
               dataSource:_this.state.dataSource.cloneWithRows(result.myOrderServerList),
               orderReturn:result.myOrderServerList,
               loading:true,
             })
       }
     }else{
       _this.setState({
         loading:false,
       })
     }
   }

     renderLoadingView(){
       return(
        <View style={{flex:1}}>
           <View style={styles.address_loadbox}>
            <Image source={require('../../images/customer_none.png')} style={styles.load_img} />
            <Text style={styles.load_text}>目前没有售后记录</Text>
           </View>
        </View>
       )
     }
     statechange(list){
       switch (list.checkState) {
         case 0:
           return (
             <View style={[styles.labels,{height:45,alignItems:"center",justifyContent:"flex-end"}]}>
                   <Text style={styles.textPrice}>待审核</Text>
             </View>
           )
           break;
         case 1:
            if(list.state==0){
             return (
               <View style={[styles.labels,{height:45,alignItems:"center",justifyContent:"flex-end"}]}>
                     <Text style={styles.textPrice}>售后处理中</Text>
               </View>
             )
            }else{
              return (
                <View style={[styles.labels,{height:45,alignItems:"center",justifyContent:"flex-end"}]}>
                      <Text style={styles.textPrice}>已完成</Text>
                </View>
              )
            }
           break;
         case 2:
             return (
                 <View style={[styles.labels,{height:45,alignItems:"center",justifyContent:"flex-end"}]}>
                       <Text style={styles.textPrice}>已拒绝</Text>
                 </View>
               )
           break;
         default:
         return (
           <View style={[styles.labels,{height:45,alignItems:"center",justifyContent:"flex-end"}]}>
                 <Text style={styles.textPrice}>已完成</Text>
           </View>
         )
       }
     }
     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state=_this.state
       let NavigatorTopBarProps = {
           visible: true,
           title: "售后记录",
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
            {
              _this.state.orderReturn.length?
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                initialListSize={10}
                enableEmptySections={true}
              />:
              _this.state.loading?<NavWait />:_this.renderLoadingView()
            }
        </View>
       )
     }
     _renderRow(list){
       return(
         <View style={styles.label_box}>
           <View style={[styles.labels,{height:25,justifyContent:"space-between",}]}>
             <Text style={styles.textGenneral}>订单编号：{list.orderNo}</Text>
           </View>
                <View style={[styles.labels,{borderColor:color.line1C,borderBottomWidth:1,height:32,justifyContent:"space-between",}]}>
                  <Text style={styles.textGenneral}>下单时间：{date2str(new Date(list.orderTime.replace(/\-/g, "/")),"yyyy.MM.dd hh:mm:ss")}</Text>
                  <Text style={styles.textGenneral}>{list.serviceType==1?"换货时间：":"退货时间："}{date2str(new Date(list.createTime.replace(/\-/g, "/")),"yyyy.MM.dd hh:mm:ss")}</Text>
              </View>

              <View style={[styles.labels,{paddingTop:10,height:83,marginBottom:5}]}>
                  <View style={styles.listLeft}>
                      <Image source={{uri:list.productVo.imgUrl}} style={styles.return_img}/>
                  </View>
                  <View style={styles.listRight}>
                    <Text style={styles.name_text} numberOfLines={1}>{list.productVo.goodsName}{list.productVo.name}</Text>
                    <Text style={styles.textGenneral} numberOfLines={2}>{list.productVo.goodsDes.replace(/[\r\n]/g,'')}</Text>
                    <View style={styles.goods_info}>
                        <Text style={styles.textGenneral}>数量：{list.number}</Text>
                        <Text style={styles.textPrice}>￥{list.totalAmount}</Text>
                    </View>
                  </View>
              </View>
              {_this.statechange(list)}
         </View>
       )
     }
   }
