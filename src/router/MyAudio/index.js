'use strict';
import React, { Component, } from 'react';
import { Text,View,Image,DeviceEventEmitter,TouchableOpacity,TextInput,ScrollView,ToastAndroid,InteractionManager,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator;
import NavWait from '../../components/common/NavWait';
import {myShelf} from '../../service/mybooks';
import { date2str, }  from '../../constant/constants';
import { NavigationActions } from 'react-navigation';


export default class MyAudio extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list:[],
        loading:true,
        };
     }

     componentDidMount(){
        _this.subScription = DeviceEventEmitter.addListener("changeMyAudioUI",function(){
           myShelf("2",_this.myShelfResult);
         })
          InteractionManager.runAfterInteractions(() => {
              myShelf("2",_this.myShelfResult);
          });
         
     }

     componentWillUnmount(){
      _this.subScription.remove()
    }

     myShelfResult(result){
       if(result.httpCode == 200&&result.myShelfList.length){
            result.myShelfList.sort(function(a,b){
              return new Date(b.createTime.replace(/\-/g, "/"))-new Date(a.createTime.replace(/\-/g, "/"))
          })
             _this.setState({
               loading:false,
               list:result.myShelfList
             })
       }else{
         _this.setState({
           loading:false
         })
       }
     }


     renderNoneView(){
       return(
            <View style={styles.nonebooks}>
              <Image source={require('../../images/order_none.png')} style={styles.none_img} />
              <Text style={styles.finsh_text}>目前没有购买的音频~</Text>
           </View>
       )
     }
     goBack(){
       const resetAction = NavigationActions.reset({
         index:0,
         actions:[NavigationActions.navigate({ routeName: 'Mine'})]
       })
       _navigator.dispatch(resetAction)
     }
     
     onpushRouter(id){
       _navigator.navigate("AudioRecom",{audioId:id,mine:true})
     }
     render(){
       _this=this;
       _navigator=_this.props.navigation;

       let NavigatorTopBarProps = {
           visible: true,
           title: "我的书架",
           leftView: (
             <TouchableOpacity style={{flex: 1}}
               underlayColor='transparent'
               onPress={() => {_this.goBack()}}>
               <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
                 <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
               </View>
             </TouchableOpacity>
           ),
       };
       return(
         <View style={styles.main}>
         <NavigatorTopBar {...NavigatorTopBarProps}/>
         <View style={styles.bookheader}>

            <TouchableOpacity onPress={()=>{_navigator.navigate('MyBooks')}} style={styles.bookPlace}>
                  <Image source={require('../../images/normal_book.png')} style={styles.place_l}/>
                  <Text style={styles.headText}>书籍</Text>
            </TouchableOpacity>

            <Image source={require('../../images/sectPlace.png')} style={styles.sect}/>

            <TouchableOpacity onPress={()=>{_navigator.navigate('MyVideo')}} style={styles.bookPlace}>
                  <Image source={require('../../images/viedoPlace.png')} style={styles.place_l}/>
                  <Text style={styles.headText}>视频</Text>
            </TouchableOpacity>

            <Image source={require('../../images/sectPlace.png')} style={styles.sect}/>

            <TouchableOpacity style={[styles.bookPlace,{borderBottomWidth:2,
            borderColor:color.main1C,}]}>
                  <Image source={require('../../images/acitve_audio.png')} style={styles.place_l}/>
                  <Text style={[styles.headText,{color:color.main1C}]}>音频</Text>
            </TouchableOpacity>

         </View>
         <ScrollView>
           {
             _this.state.list.length ?

             <View style={styles.videoBox}>

             {
               _this.state.list.map((d,index)=>(
                 <TouchableOpacity style={styles.smallbox} key={index} onPress={()=>_this.onpushRouter(d.productVo.id_)}>

                    <Image source={d.bgimgUrl} style={styles.bgImg}/>

                    <View style={styles.labelBox}>
                        <Image source={{uri:d.productVo.imgUrl}} style={styles.aduioImg}/>

                        <View style={styles.videoInfo}>
                        <View style={styles.audioMan}>
                            <Text style={styles.audioNameText} numberOfLines={1}>{d.productVo.goodsName}{d.productVo.name}</Text>
                        </View>
                            <View style={[styles.audioMan,{ paddingRight:5,marginTop:2}]}>
                              <Text style={styles.textName} numberOfLines={1}>{d.productVo.goodsDes}</Text>
                            {/* <Text style={styles.textInfo}>{d.createTime?date2str(new Date(d.createTime.replace(/\-/g, "/")),"yyyy-MM-dd"):null}</Text>*/}
                            </View>
                        </View>
                    </View>
                  </TouchableOpacity>
               ))
             }
             </View>
             :
             _this.state.loading ? <NavWait />:this.renderNoneView()
           }
         </ScrollView>

        </View>
       )
     }

   }
