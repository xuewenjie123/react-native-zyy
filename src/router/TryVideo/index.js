import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Image} from 'react-native';
import Dimensions from 'Dimensions';
let {width,height} = Dimensions.get("window")
import UShare from '../../../share/share';  
import SharePlatform from '../../../share/SharePlatform';  

export default class TryVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }
  share(){
    console.log(UShare)
    console.log(SharePlatform)
    // UShare.share('标题','内容lokkkkkkkkk','http://baidu.com','http://dev.umeng.com/images/tab2_1.png', SharePlatform.SINA,  
    // (code, message) => {  
    //     console.log(code)
    // }); 
  }
  render() {
    return (
          <View style={{flex:1,justifyContent:"center"}}>
                  <TouchableOpacity style={{width:width,height:40,backgroundColor:"#000",alignItems:"center"}} onPress={()=>{this.share()}}>
                    <Text style={{fontSize:20,color:"#fff"}}>
                        分享
                    </Text>
                  </TouchableOpacity>
          </View>
    );
  }
}
