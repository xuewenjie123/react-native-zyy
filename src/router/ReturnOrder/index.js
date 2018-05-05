'use strict';
import React, { Component, } from 'react';
import { Picker,Text,View,Image,TouchableOpacity,TextInput,ScrollView,ToastAndroid,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator,_state;
import {updateImg}  from '../../service/editData';
import {orderServer} from '../../service/orderInquiry'
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationActions } from 'react-navigation';
export default class ReturnOrder extends Component {
    constructor(props) {
      super(props);

      this.state = {
          list:this.props.navigation.state.params.list,
          returnWay:"1",
          content:"",
          imgurl:"",
          imgId:"",
        };
     }

     componentDidMount(){
       BackHandler.addEventListener('hardwareBackPress', function(){});
       console.log(this.props.navigation.state.params.list)
       console.log(_state.list)
     }

     getData(){

     }


     updateImgFu(result){
       if(!result.ErrorMsg){
         _this.setState({
           imgurl: result.fileUrl,
           imgId:result.avatarFileId
         });
         console.log(result.fileUrl)
       }else{
         ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
       }
     }
     openMycamera(){
       ImagePicker.openPicker({
         height : 488,
         width : 488,
         cropping: true,
         includeBase64: true,
       }).then(images => {
         console.log(images)
         var base64 = "data:"+images.mime+";base64," + images.data;
         var name = images.path.split("/")
          console.log(name)
          let formdata = {imgurl: base64,fileName: name[name.length-1]};
          updateImg(formdata,(e)=>_this.updateImgFu(e,base64));
       });
     }

     _submitServer(){
       orderServer({orderDetailId:_state.list.id,fileId:_state.imgId,serviceType:_state.returnWay,serverDes:_state.content},_this.submitResult)
     }
     submitResult(result){
       if(result.httpCode==200){
         var resetAction = NavigationActions.reset({
           index:1,
           actions: [
             NavigationActions.navigate({routeName: 'Mine'}),
              NavigationActions.navigate({routeName: 'CustomerService'}),
           ]
         })
         _this.props.navigation.dispatch(resetAction)
       }
     }
     render(){
       _this=this;
       _navigator=_this.props.navigation;
       _state=_this.state;
       let NavigatorTopBarProps = {
           visible: true,
           title: "售后服务 ",
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
                 <View style={styles.seviceInfo}>
                     <View style={styles.sevice}>
                         <Text style={styles.seviceText}>申请服务：</Text>

                        <View style={styles.PickerBox}>

                        {/*  <View style={styles.modal}>
                              <Text style={styles.seviceText}>{_this.state.returnWay}</Text>
                          </View>*/}

                            <Picker
                               style={{flex:1,backgroundColor:"transparent",paddingLeft:10,position:"absolute",width:width-24-160*width/750,top:-20*width/750,right:0,}}
                               selectedValue={this.state.returnWay}
                               onValueChange={(lang) => {this.setState({returnWay:lang})}}>
                               <Picker.Item label="退货" value="2" />
                               <Picker.Item label="换货" value="1" />
                             </Picker>

                        </View>
                     </View>

                    {/* <View style={styles.sevice}>
                         <Text style={styles.seviceText}>退款金额：</Text>
                         <TextInput multiline={true} underlineColorAndroid="transparent" style={{paddingLeft:5,flex:1,borderColor:"#d5d6d7",borderWidth:1,height:26,backgroundColor:color.white3C,padding:0,}} defaultValue ={_state.list.totalAmount+"元"} value={_state.list.totalAmount+"元"}/>
                     </View>*/}
                 </View>

                 <View style={styles.reason_box}>
                      <View style={styles.reTextBox}>
                        <Text style={styles.seviceText}>填写理由：</Text>
                      </View>
                       <TextInput multiline={true} underlineColorAndroid="transparent" style={{borderColor:"#d5d6d7",borderWidth:1,height:75,width:width-30,borderStyle:"dashed",textAlignVertical:'top'}}
                       onChangeText={(text)=>_this.setState({content:text})} value={_state.content}/>
                 </View>
                  <View style={styles.f_Box}>
                        <View style={styles.fileBox}>
                           <TouchableOpacity style={styles.fileBtn} onPress={()=>_this.openMycamera()}>


                           {
                             _state.imgurl?
                              <Image source={{uri: _state.imgurl}} style={{width:75,height:75}}/>
                             :
                             <View style={{flex:1,alignItems:"center"}}>
                                 <Image source={require('../../images/file_icon.png')} style={styles.fileIcon}/>
                                 <Text style={styles.file_text}>上传照片</Text>
                             </View>
                           }
                           </TouchableOpacity>
                       </View>
                        <Image source={require('../../images/ReturnOrder_bg.png')} style={styles.return_bg}/>
                  </View>
                <View style={styles.footer}>
                   <TouchableOpacity style={styles.footRight} onPress={()=>_this._submitServer()}>
                         <Image source={require('../../images/small_yes.png')} style={styles.yes_btn}/>
                         <Text style={styles.yes_text}>提交申请</Text>
                   </TouchableOpacity>
                 </View>
              </View>
          </View>
       )
     }
   }
