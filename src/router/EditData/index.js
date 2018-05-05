'use strict';
import React, { Component, } from 'react';
import {Picker,View,Image,TouchableOpacity,ScrollView,TextInput,ToastAndroid,Text,InteractionManager,SectionList,BackHandler} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
import ModalDropdown from 'react-native-modal-dropdown';
var _this,_navigator,_state;
import { NavigationActions } from 'react-navigation'
import {updateGenUserInfo,myInfo,updateExpUserInfo,updateImg,selectOptionList}  from '../../service/editData';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import List from '../../components/common/sectionList';
export default class EditData extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nameExpert:"",
          sexExpert:"男",
          hospitalExpert:"",
          departmentExpert:[],
          titleExpert:"",
          nameGeneral:"",
          type:"",
          user:[],
          imgurl:"",
          sectionList:[],
          visible:false,
          sectionIds:[],
          fullName:""
        };
     }

     componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
      getStorage("login",function(error,data){
          if(data){
            _this.setState({
                type:data.userType
            })
          }
      })
       InteractionManager.runAfterInteractions(() => {
         myInfo("",_this.myInfoResult);
         selectOptionList("section",_this.selectOptionListResult)
       });
     }
     myInfoResult(result){
       if(result.httpCode == 200){
         if(result.user){
           if (result.user.hospital) {
             _this.setState({
               nameExpert:result.user.userName,
               hospitalExpert:result.user.hospital,
               sexExpert:result.user.sex,
               departmentExpert:result.user.sectionNames,
               titleExpert:result.user.jobTitle,
               imgurl: result.user.fileUrl?result.user.fileUrl:undefined,
               sectionIds:result.user.sectionIds,
               fullName:result.user.name
              })
           }else {
             _this.setState({nameGeneral:result.user.userName,sexExpert:result.user.sex,imgurl: result.user.fileUrl?result.user.fileUrl:undefined,})
           }
         }
       }
     }
     selectOptionListResult(result){
       if (result.httpCode == 200) {
         _this.setState({
           sectionList:result.sectionList,
          })
       }
     }

     updateImgFu(result){
       if(!result.ErrorMsg){
         _this.setState({
           imgurl: result.fileUrl?result.fileUrl:undefined,
           avatarFileId: result.avatarFileId
         });
       }else{
         ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
       }
     }
     openMycamera(){
       ImagePicker.openPicker({
         width:300,
         height:300,
         cropping: true,
         includeBase64: true,
       }).then(images => {
         console.log(images)
         var base64 = "data:"+images.mime+";base64," + images.data;
         var name = images.path.split("/")
         let formdata = {imgurl: base64,fileName: name[name.length-1],curUserId: _this.state.user.id_};
         updateImg(formdata,(e)=>_this.updateImgFu(e,base64));
       });
     }
     finshedChange(){
       var resultFu = function(response){
           if(!response.ErrorMsg){
               // global.sendSocketMsg("init",{userId: response.data.id})
               //跳转到首页 并清除路由信息 并保存登录信息
               ToastAndroid.show('修改成功', ToastAndroid.SHORT);
               var resetAction = NavigationActions.reset({
                 index: 1,
                 actions: [
                   NavigationActions.navigate({routeName: 'Mine'}),
                   NavigationActions.navigate({routeName: 'Setting',params: {imgurl:_state.imgurl,userName:_state.nameExpert}}),
                 ]
               })
               var resetAction2 = NavigationActions.reset({
                 index: 1,
                 actions: [
                   NavigationActions.navigate({routeName: 'Mine'}),
                   NavigationActions.navigate({routeName: 'Setting',params: {imgurl:_state.imgurl,userName:_state.nameGeneral}}),
                 ]
               })
               if(_state.nameGeneral!==""){
                 _navigator.dispatch(resetAction2)
               }else{
                 _navigator.dispatch(resetAction)
               }

               // AsyncStorage.setItem("main",JSON.stringify(response.data),()=>{
          //     _navigator.navigate("Security");
           }else{
               //声明消息 不做操作
               ToastAndroid.show(response.ErrorMsg, ToastAndroid.SHORT);
           }
       };
       if (_this.state.type=="expert") {
         if(!_this.state.nameExpert){
           ToastAndroid.show('请输入用户名', ToastAndroid.SHORT);
           return false;
         }else if(!this.state.fullName){
          ToastAndroid.show('请输入姓名', ToastAndroid.SHORT);
          return false;
         }else if (!_this.state.sexExpert) {
           ToastAndroid.show('请输入性别', ToastAndroid.SHORT);
           return false;
         }else if (!_this.state.hospitalExpert) {
           ToastAndroid.show('请输入单位', ToastAndroid.SHORT);
           return false;
         }else if(!this.state.departmentExpert.length){
          ToastAndroid.show('请输入学科', ToastAndroid.SHORT);
          return false;
         }
        //  else if (!_this.state.titleExpert) {
        //    ToastAndroid.show('请输入头衔', ToastAndroid.SHORT);
        //    return false;
        //  }
         else {
             updateExpUserInfo({username:_this.state.nameExpert,name:_this.state.fullName,sex:_this.state.sexExpert,hospital:_this.state.hospitalExpert,sectionIds:_this.state.sectionIds,jobTitle:_this.state.titleExpert,avatarFileId: _this.state.avatarFileId},resultFu);

         }
       }else {
         if(!_this.state.nameGeneral){
           ToastAndroid.show('请输入姓名', ToastAndroid.SHORT);
           return false;
         }else if (!_this.state.sexExpert) {
           ToastAndroid.show('请输入性别', ToastAndroid.SHORT);
           return false;
         }else {
             updateGenUserInfo({username:_this.state.nameGeneral,sex:_this.state.sexExpert,avatarFileId: _this.state.avatarFileId},resultFu);
         }

       }


     }

    //  getFocusOn(str){
    //    this.refs[str].focus()
    //  }

    onShowModal(){
      _this.setState({
        visible:true
      })
    }
    onCloseModal(id,text){
      _this.setState({
        visible:false,
        departmentExpert:text,
        sectionIds:id
      })
    }
    componentWillMount(){
      if(this.props.navigation.state.params.imgurl){
        this.setState({
          imgurl: this.props.navigation.state.params.imgurl,
        })
      }
    }
    selectSex(index,value){
        _this.setState({sexExpert:value})
    }
     render(){
       _this=this;
       _state=_this.state;
       _navigator=this.props.navigation;
       let ListModalProps={
         visible:_state.visible,
         _navigator:_navigator,
         closeModal:function(id,text){
           _this.onCloseModal(id,text)
         },
         names:_state.departmentExpert,
         sectionList:_state.sectionList,
         sectionIds:_state.sectionIds,
       };
       let NavigatorTopBarProps = {
           visible: true,
           title: "编辑个人资料",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => _navigator.goBack()}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
           rightView:(
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={()=>_this.finshedChange()}>
               <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems:"center",justifyContent:"flex-end"}}>
                 <Text style={{fontSize:14,color:color.font4C}}>完成</Text>
               </View>
             </TouchableOpacity>
           ),
       };
       return(

         <View style={styles.main}>
             <NavigatorTopBar {...NavigatorTopBarProps}/>

             {

               _this.state.type=="expert"?
               (
                 <ScrollView style={{flex:1}}>

                    <View style={styles.marginbox} ></View>
                    <View style={styles.change_box}>
                       <TouchableOpacity onPress={()=>_this.openMycamera()}>
                           <View style={styles.header_bar}>
                               <View style={styles.title_person}>
                                 <View style={styles.title_boder}>
                                   <Image source={_state.imgurl?{uri: _state.imgurl}:require('../../images/head_portrait.png')} style={styles.title_img}/>
                                 </View>
                               </View>
                           </View>
                        </TouchableOpacity>
                        <View style={styles.label}>
                                 <Text style={styles.text}>用户名</Text>

                               <TextInput  underlineColorAndroid="transparent" style={styles.input} onChangeText={(text)=>_this.setState({nameExpert:text})} value={_this.state.nameExpert} ref={"nameExpert"} maxLength={20}/>
                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                           </View>
                           
                           <View style={styles.label}>
                                <Text style={styles.text}>姓名</Text>
                              <TextInput  underlineColorAndroid="transparent" style={styles.input} onChangeText={(text) => _this.setState({fullName:text})} value={_this.state.fullName}/>
                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}  maxLength={20}/>
                          </View>

                           <View style={[styles.label,{borderBottomWidth:0}]}>
                                 <Text style={styles.text}>性别</Text>
                                 <ModalDropdown style={{width:width-81,textAlign:"right"}} options={['男', '女']} dropdownStyle={{width:width-30*width/750-71,alignItems:"center",height:200*width/750}} onSelect={(index,value)=>_this.selectSex(index,value)} dropdownTextStyle={{fontSize:15,borderBottomWidth:0.5,width:width-30*width/750-71,height:100*width/750}} defaultValue={_state.sexExpert} textStyle={{fontSize:15,color:color.font1C,textAlign:"right"}}/>
                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                           </View>
                    </View>

                    <View style={styles.marginbox} ></View>
                    <View style={styles.change_box}>

                      <View style={styles.label}>
                            <Text style={styles.text}>单位</Text>

                              <TextInput  underlineColorAndroid="transparent" style={styles.input} onChangeText={(text) => _this.setState({hospitalExpert:text})} value={_this.state.hospitalExpert} ref={"hospitalExpert"}  maxLength={20}/>


                          <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                      </View>
                          <TouchableOpacity style={styles.label} onPress={()=>_this.onShowModal()}>
                                <Text style={styles.text}>学科</Text>
                                <View style={styles.depart}><Text style={styles.text_d} numberOfLines={1}>{_state.departmentExpert?_state.departmentExpert.length?_state.departmentExpert.join("、"):null:null}</Text></View>
                              <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                          </TouchableOpacity>

                         <View style={styles.label}>
                                <Text style={styles.text}>头衔</Text>
                              <TextInput  underlineColorAndroid="transparent" style={styles.input} onChangeText={(text) => _this.setState({titleExpert:text})} value={_this.state.titleExpert} ref={"titleExpert"}/>
                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}  maxLength={20}/>
                          </View>

                    </View>
                  </ScrollView>
               )
               :
               (

                 <ScrollView style={{flex:1}}>
                    <View style={styles.change_box}>
                       <TouchableOpacity onPress={()=>_this.openMycamera()}>
                           <View style={styles.header_bar}>
                               <View style={styles.title_person}>
                                 <View style={styles.title_boder}>
                                   <Image source={_state.imgurl?{uri: _state.imgurl}:require('../../images/head_portrait.png')} style={styles.title_img}/>
                                 </View>
                               </View>
                           </View>
                        </TouchableOpacity>

                        <View style={styles.label}>
                                 <Text style={styles.text}>用户名</Text>

                               <TextInput  underlineColorAndroid="transparent" style={styles.input} onChangeText={(text)=>_this.setState({nameGeneral:text})} value={_this.state.nameGeneral} ref={"nameGeneral"} maxLength={20}/>
                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                           </View>

                           <View style={[styles.label,{borderBottomWidth:0}]}>
                               <Text style={styles.text}>性别</Text>
                               <ModalDropdown style={{width:width-81,textAlign:"right"}} options={['男', '女']} dropdownStyle={{width:width-30*width/750-71,alignItems:"center",height:200*width/750}} onSelect={(index,value)=>_this.selectSex(index,value)} dropdownTextStyle={{fontSize:15,borderBottomWidth:0.5,width:width-30*width/750-71,height:100*width/750}} defaultValue={_state.sexExpert} textStyle={{fontSize:15,color:color.font1C,textAlign:"right"}}/>
                                

                               <Image source={require('../../images/arrow_Ricon.png')} style={styles.arrow_Ricon}/>
                           </View>
                    </View>

                  </ScrollView>
               )
             }
             {_state.sectionList.length?<List {...ListModalProps}/>:null}
          </View>
       )
     }

   }
