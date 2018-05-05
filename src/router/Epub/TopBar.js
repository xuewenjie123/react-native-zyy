import React, { Component } from 'react';
import {BackHandler} from 'react-native';
import NavigatorTopBar from '../../components/common/NavigatorTopBar';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated
} from 'react-native';


const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
    flex: 8,
    color: '#fff',
    ...Platform.select({
      ios: {
        fontFamily: "Baskerville",
      },
      android: {
        fontFamily: "serif"
      },
    }),
  },
  header: {
    backgroundColor: "#d04114",
    paddingTop: 0,
    top: 0,
    height: 64,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderBottomColor:"#000",
    position: 'absolute',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    flex: 14
  },
  backButton: {
    width: 34,
    height: 34,
    margin: 20,
    flex: 1,
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row'
  },
  backButtonImage: {
    width: 30,
    height: 30,
  }
});


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
    };


    this.barsShown = true;
  }

  componentDidMount() {
       BackHandler.addEventListener('hardwareBackPress', function(){});
  //  setTimeout(() => {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    //}, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.shown !== this.props.shown) {
      if (this.props.shown) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const timing = Animated.timing;

    Animated.sequence([
      timing( this.state.fadeAnim, {
        toValue: 1,
        duration: 20
      })
    ]).start();

    this.barsShown = true;
  }

  hide() {
    const timing = Animated.timing;

    Animated.sequence([
      timing( this.state.fadeAnim, {
        toValue: 0,
        duration: 20
      })
    ]).start();


    this.barsShown = false;
  }

  render() {
    _this=this;
    _navigator=_this.props.navigation;

    let NavigatorTopBarProps = {
        visible: true,
        title:_this.props.title,
        leftView: (
          <TouchableOpacity style={{flex: 1}}
            underlayColor='transparent'
            onPress={() => {_navigator.goBack()}}>
            <View style={{flex: 1, paddingLeft: 12,flexDirection: 'row',alignItems: 'center',}}>
              <Image style={{width: 11, height: 22,}} source={require('../../images/icon-44-1.png')}></Image>
            </View>
          </TouchableOpacity>
        ),
        rightView: (
          <TouchableOpacity style={{flex: 1}}
            disabled={true}
            underlayColor='transparent'
            onPress={() => _this.props.onRightButtonPressed()}>
            <View style={{flex: 1, paddingRight: 12,flexDirection: 'row',alignItems: 'center',justifyContent: "flex-end"}}>
              <Text style={{fontSize:14,color:"#fff"}}>{_this.props.way}</Text>
            </View>
          </TouchableOpacity>
        ),

    };
    return (
      <Animated.View style={[styles.header, { opacity: this.state.fadeAnim }]}>
          <NavigatorTopBar {...NavigatorTopBarProps}/>
      </Animated.View>
    );
  }
}

export default TopBar;
