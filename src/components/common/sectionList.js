'use strict';
import React, { Component, } from 'react';
import {StyleSheet,TextInput,View,TouchableOpacity,Image,Text,Modal,ListView} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import color from '../../constant/color';
import Constants from '../../constant/constants'
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
var _navigator,_state,_this,_props;

export default class EditDataList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2});
        this.state = {
          dataSource:ds.cloneWithRows(this.props.sectionList),
          departList:[],
          Ids:[],
          names:[]
        };
     }
    
    componentWillReceiveProps(newProps){
      if(newProps.names){
        _this.setState({
          dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(_this.props.sectionList),
          names:newProps.names,
          Ids:newProps.sectionIds
        })
      }
    }

    _selectList(rowID,row){
       // console.log(rowID);
       let list=[];
       let IdList=[];
       let nameList = [];
       IdList = _state.Ids;
       list = _state.departList;
       nameList = _state.names;

      function setList(publicList,rowOne){
          if(publicList.indexOf(rowOne)==-1){
              publicList.push(rowOne)
          }else{
            publicList.splice(publicList.indexOf(rowOne),1)
          }
          return publicList
      }

      setList(nameList,row.name)
      setList(IdList,row.id_)
      setList(list,rowID)

       _this.setState({
         departList:list,
         Ids:IdList,
         names:nameList,
         dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) =>r1!== r2}).cloneWithRows(_this.props.sectionList)
       });
     }
     _renderHeader(){
       return (
         <View style={styles.header_bar}>
             <View style={{flex:1}}>
             </View>
             <View style={{flex:1,alignItems:"center",}}>
               <Text style={{fontSize:20,color:"#222"}} numberOfLines={1}>选择科室</Text>
             </View>
             <TouchableOpacity style={{flex:1,alignItems:"flex-end",}} onPress={()=>{_props.closeModal(_state.Ids,_state.names)}}>
               <Text style={{fontSize:18,color:"#222",marginRight:12}} numberOfLines={1}>确定</Text>
             </TouchableOpacity>
         </View>
       )
     }

     _renderRow(rowContent,sectionID,rowID,){
      //  console.log(_state.Ids)
       console.log(_state.names)
       console.log(rowContent)
       return (
         <TouchableOpacity style={styles.info_a1} key={rowID} onPress={() => {_this._selectList(rowID,rowContent)}} >
            <Text style={_state.names.indexOf(rowContent.name)==-1?styles.text1:styles.text2}>{rowContent.name}</Text>
         </TouchableOpacity>
       )
     }

     render(){
       _this=this;
       _state=this.state;
       _props=this.props;
       _navigator=this.props._navigator;
       return(
         <Modal
           animationType="slide"
           transparent={true}
           visible={_props.visible}
           style={{alignItems:"center"}}
           onRequestClose={() => {_props.closeModal(_state.Ids,_state.names)}}
           >
             <View style={{position: 'absolute', width: width, height: height, backgroundColor: "#000", opacity: .7,}}>
               <TouchableOpacity style={{flex:1}} onPress={() => {_props.closeModal(_state.Ids,_state.names)}}>
               </TouchableOpacity>
             </View>
             <View style={{width:width,height:300,alignItems:"center",position:"absolute",bottom:0,left:0}}>
             {_this._renderHeader()}
               <ListView
                 dataSource={this.state.dataSource}
                 renderRow={this._renderRow.bind(_this)}
                 initialListSize={10}
                 contentContainerStyle={styles.contentViewStyle}
               />
             </View>
          </Modal>

       )
     }
   }
   const styles = StyleSheet.create({
     main: {
       width:width,
       height:200,
       backgroundColor: color.mainBg2C,
       position:"absolute",
       bottom:0,
     },
     text:{
       fontSize:15,
       color:color.font1C
     },
     info_a1:{
       flex:1,height:50,paddingTop:10,paddingBottom:10,width:width,alignItems:"center"
     },
     text1:{
       fontSize:14,
       color:color.font1C
     },
     text2:{
       fontSize:14,
       color:color.main1C
     },
     header_bar:{
      height:50,
      width:width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"space-between",
      borderBottomWidth:0.5,
      borderColor:"#ccc",
      backgroundColor:color.back1C,
     },
     contentViewStyle:{
       width:width,
       alignItems:"center",
       backgroundColor:color.back1C,
     }
   });
