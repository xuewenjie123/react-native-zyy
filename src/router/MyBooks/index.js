'use strict';
import React, { Component, } from 'react';
import { View,Image,TouchableOpacity,TextInput,ListView,ScrollView,Text,InteractionManager,BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
var styles =require('./styles');
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _this,_navigator;
import NavWait from '../../components/common/NavWait';
import {myShelf} from '../../service/mybooks';
import Lost from '../../components/common/Lost';
import { NavigationActions } from 'react-navigation';
export default class MyBooks extends Component {
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
      this.state = {
        dataSource: ds,
        loading:true,
        myShelfList:[],
        };
     }
  componentDidMount(){
   BackHandler.addEventListener('hardwareBackPress', function(){});
         InteractionManager.runAfterInteractions(() => {
           myShelf("1",_this.myShelfResult);
         });
     }
     myShelfResult(result){
       if(result.httpCode == 200&&result.myShelfList.length){
          result.myShelfList.sort(function(a,b){
            return new Date(b.createTime.replace(/\-/g, "/"))-new Date(a.createTime.replace(/\-/g, "/"))
         })
          for(let i=0;i<result.myShelfList.length;i++){
            result.myShelfList[i].productVo.buy =true;
          }
             _this.setState({
               loading:false,
               myShelfList:result.myShelfList,
               dataSource:_this.state.dataSource.cloneWithRows(result.myShelfList)})
       }else{
         _this.setState({
           loading:false
         })
       }
     }

    //  componentDidMount(){
    //    this.setState({
    //      dataSource:this.state.dataSource.cloneWithRows(books)
    //    })
    //   //  getPoint(应该传用户信息，比如姓名,传type
    //   //  this.setState({
    //   //     loading:true,
    //   //      dataSource:this.state.dataSource.cloneWithRows(response)
    //   //    }))
    //    //
    //  }

     renderNoneView(){
       return(
            <View style={styles.nonebooks}>
              <Image source={require('../../images/book_none.png')} style={styles.none_img} />
              <Text style={styles.finsh_text}>目前没有购买的书籍</Text>
           </View>
       )
     }
  // <Text></Text>
     _renderRow(list){
        return(
          <View style={styles.row}>
            <View style={styles.rowLbael}>
                 <TouchableOpacity onPress={()=>{_navigator.navigate('BookDetail',{bookId:list.productVo.id_,mine:true})}}  style={styles.RowTop}>
                         <View  style={styles.rowTopLeft}>
                            <Image source={{uri:list.productVo.imgUrl}} style={styles.imgRow}/>
                          </View>

                          <View style={styles.RowTopRight}>
                            <Text style={styles.bookName} numberOfLines={1}>{list.productVo.goodsName}{list.productVo.name}</Text>
                            <Text style={styles.bookWriter} numberOfLines={3}>{list.productVo.goodsDes.replace(/[\r\n]/g,'')}</Text>
                            <Text style={styles.bookInfo} numberOfLines={1}>{list.productVo.goodsDetail.replace(/<[^>]+>/g,"")}</Text>
                          </View>

                </TouchableOpacity>

                  <View  style={styles.RowBt}>
                  <View style={styles.botTextBox}>
                      <Text style={styles.bookWriter}>购买日期  {list.createTime}</Text>
                </View>

                     <TouchableOpacity onPress={()=>{_navigator.navigate('Epub',{bookInfo:list.productVo})}} style={styles.ReadBtn}>
                          <Text style={styles.ReadText}>阅读</Text>
                     </TouchableOpacity>
                  </View>
            </View>
          </View>
        )
      }
      goBack(){
        const resetAction = NavigationActions.reset({
          index:0,
          actions:[NavigationActions.navigate({ routeName: 'Mine'})]
        })
        _navigator.dispatch(resetAction)
        return true
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

            <TouchableOpacity style={[styles.bookPlace,{borderBottomWidth:2,
            borderColor:color.main1C,}]}>
                  <Image source={require('../../images/booksPlace.png')} style={styles.place_l}/>
                  <Text style={[styles.headText,{color:color.main1C}]}>书籍</Text>
            </TouchableOpacity>

            <Image source={require('../../images/sectPlace.png')} style={styles.sect}/>

            <TouchableOpacity onPress={()=>{_navigator.navigate('MyVideo')}} style={styles.bookPlace}>
                  <Image source={require('../../images/viedoPlace.png')} style={styles.place_l}/>
                  <Text style={styles.headText}>视频</Text>
            </TouchableOpacity>

            <Image source={require('../../images/sectPlace.png')} style={styles.sect}/>

            <TouchableOpacity onPress={()=>{_navigator.navigate('MyAudio')}} style={styles.bookPlace}>
                  <Image source={require('../../images/sound.png')} style={styles.place_l}/>
                  <Text style={styles.headText}>音频</Text>
            </TouchableOpacity>

         </View>
            {
              this.state.myShelfList.length ?
              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                initialListSize={10}
              />:
              this.state.loading ? <NavWait />
                :this.renderNoneView()
            }
        </View>
       )
     }

   }
