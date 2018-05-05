import React, { Component } from 'react';
import {getStorage,setStorage,removeStorage,getStorageOnly,setStorageOnly,removeStorageOnly} from '../../constant/storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  StatusBar,
  ToastAndroid
} from 'react-native';

import { Epub, Streamer } from "epubjs-rn";

import TopBar from './TopBar'
import BottomBar from './BottomBar'
// import Nav from './Nav'
let _this,_navigator;
class EpubReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flow: "scrolled-continuous", // paginated || scrolled-continuous
      location:0,
      bookInfo:this.props.navigation.state.params.bookInfo,
      EpubId:this.props.navigation.state.params.bookInfo.id_,
      url:this.props.navigation.state.params.bookInfo.goodsUrl,
      src: "",
      origin: "",
      title: "",
      toc: [],
      showBars: true,
      showNav: false,
      sliderDisabled: true,
      visibleLocation:false
    };

    this.streamer = new Streamer();
  }

  componentDidMount() {
    this.streamer.start()
      .then((origin) => {
        this.setState({origin})
      //    console.log("origin", origin);
        return this.streamer.get(this.state.url);
      })
      .then((src) => {
        return this.setState({src});
      });
      getStorage("lastLocation"+_this.state.EpubId,(error,data)=>{
        if(data){
          console.log(data)
        }
     })
  }

  componentWillUnmount() {
    this.streamer.kill();
  }

  toggleBars() {
    _this.setState({ showBars:!_this.state.showBars });
  }


  render() {
    _this=this;
    _navigator=_this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Epub style={styles.reader}
              ref="epub"
              src={_this.state.src}
              flow={_this.state.flow}
              location={_this.state.location}
              onLocationChange={(visibleLocation)=> {
                console.log("locationChanged",visibleLocation)
                setStorage("lastLocation"+_this.state.EpubId,{location:visibleLocation.end.index},function(){console.log("wo cun shang le ")})
                if(!_this.state.bookInfo.buy){
                    if(visibleLocation.end.index>=4){
                    ToastAndroid.show("试看结束，观看更多内容请购买",ToastAndroid.SHORT)
                    _navigator.goBack();
                    return false
                  }
                }
                this.setState({visibleLocation:visibleLocation});
              }}
              onLocationsReady={()=> {
                {/* console.log("location total", locations.total); */}
                {/* console.log(Locations) */}
                this.setState({sliderDisabled : false});
              }}
              onReady={(book)=> {
                this.setState({
                  title : book.package.metadata.title,
                  toc: book.toc,
                  location:0
                });
                if(_this.state.bookInfo.buy){
                  getStorage("lastLocation"+_this.state.EpubId,(error,data)=>{
                      if(data){
                        _this.setState({location:data.location})
                      }
                    })
                  }else{
                    _this.setState({location:0})
                  }
                }
              }
              onPress={(cfi, rendition)=> {
                this.toggleBars();
                console.log("press", cfi);
              }}
              onLongPress={(cfi, rendition)=> {
                console.log("longpress", cfi);
              }}
              onViewAdded={(index) => {
                console.log("added", index)
              }}
              beforeViewRemoved={(index) => {
                console.log("removed", index)
              }}
              onSelected={(cfiRange, rendition) => {
                console.log("selected", cfiRange)
                // Add marker
                rendition.highlight(cfiRange, {});
              }}
              // themes={{
              //   tan: {
              //     body: {
              //       "-webkit-user-select": "none",
              //       "user-select": "none",
              //       "background-color": "tan"
              //     }
              //   }
              // }}
              // theme="tan"
              // regenerateLocations={true}
              // generateLocations={true}
              origin={this.state.origin}
            />
            <View
              style={[styles.bar, { top:0 }]}>
              <TopBar
                navigation={this.props.navigation}
                title={this.state.title}
                shown={this.state.showBars}
                onLeftButtonPressed={() => this.refs.nav.show()}
                way={this.state.flow=="paginated"?"":""}
                onRightButtonPressed={
                  (value) => {
                    if (this.state.flow === "paginated") {
                      this.setState({flow: "scrolled-continuous"});
                    } else {
                      this.setState({flow: "paginated"});
                    }

                  }
                }
               />
            </View>
            <View
              style={[styles.bar, { bottom:0 }]}>
              <BottomBar
                disabled= {this.state.sliderDisabled}
                value={this.state.visibleLocation ? this.state.visibleLocation.start.percentage : 0}
                shown={this.state.showBars}
                onSlidingComplete={
                  (value) => {
                    this.setState({location: value.toFixed(6)})
                  }
                }/>
            </View>
          {/*  <View>
              <Nav ref="nav"
                display={(loc) => {
                  this.setState({ location: loc });
                }}
                toc={this.state.toc}
              />

            </View>*/}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reader: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#3F3F3C'
  },
  bar: {
    position:"absolute",
    left:0,
    right:0,
    height:55
  }
});

export default EpubReader;
