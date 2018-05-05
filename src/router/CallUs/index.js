import React,{Component} from "react";
import {View,Image,Text,TouchableOpacity} from 'react-native';
import styles from './styles';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import {NavigationActions} from 'react-navigation';
var _navigator,_this;
import color from "../../constant/color";
export default class CallUs extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    _this = this;
    _navigator = this.props.navigation;
    let NavigatorTopBarProps = {
      visible: true,
      title: "联系我们",
      leftView: (
        <TouchableOpacity style={{flex: 1}}
          underlayColor='transparent'
          onPress={() => {_navigator.goBack()}}>
          <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
            <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
          </View>
        </TouchableOpacity>
      ),
    }
    return (
      <View style={{width:width,alignItems:"center"}}>
          <NavigatorTopBar {...NavigatorTopBarProps}/>
          <View style={{width:width-24,marginTop:20,flexDirection:"row",alignItems:"center"}}>
                  <Text style={{fontSize:20}}>联系我们请拨打电话:</Text>
                  <Text style={{fontSize:20}}>010-64405198 </Text>
          </View>
          <View style={{width:width-24,marginTop:20,flexDirection:"row"}}>
              <Text style={{fontSize:20}}>客服QQ:</Text>
              <Text style={{fontSize:20}}>1301103910</Text>
          </View>

      </View>
    );
  }
}
