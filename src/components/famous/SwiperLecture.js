'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback,TouchableOpacity ,Text} from 'react-native';
import Swiper from 'react-native-swiper';
import color from '../../constant/color';
import { date2str, } from '../../constant/constants';
import Dimensions from 'Dimensions';
var { width, height } = Dimensions.get('window');
var _navigator,_this,_state,_props;


class SwiperLecture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repairModal: false,
      menu: [],
    }
  }
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    _this = this;
    _state = _this.state;
    _props = _this.props;
    let SwiperProps = {
      showsPagination: false,
      autoplay: true,
      autoplayTimeout:10,
      paginationStyle: {position: "absolute",top: 360*width/750,height:10,width:width},
      dot: (
        <View style={{backgroundColor:'rgba(0,0,0,.3)', width: 22, height: 3, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />
      ),
      activeDot: (
        <View style={{backgroundColor: color.main1C, width: 22, height: 3, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3,}} />
      ),
    }
    return (
      <View pointerEvents={"box-none"} style={styles.lunbo}>
        <Swiper loop={true} {...SwiperProps}>
            {_props.imglist.map((d,index)=>(
                <View style={styles.rig2}  key={index}>
              <Image style={styles.lecttop2} resizeMode="cover" source={require('../../images/m-702-2.png')} >
                <View style={styles.lecttop3}>
                  <Image style={{width: 58, height: 58,}} source={require('../../images/m-116-1.png')}></Image>
                </View>
                <View style={styles.lecttop4}>
                  <Image style={{width: 93, height: 124, marginRight: 10,}} source={{uri:d.fileUrl}}></Image>
                  <View style={{flex:1}}>
                    <Text style={[styles.cont_text2,{marginBottom: 10,marginTop: 4,}]}>
                      {d.title}
                    </Text>
                    <Text style={[styles.cont_text8,{marginBottom: 7,}]} numberOfLines={1}>
                      讲师：{d.famousName}
                    </Text>
                    <View style={{flexDirection: 'row',marginBottom: 7,}}>
                      <View style={{flexDirection: 'row',}}>
                        <Text style={styles.cont_text8}>
                          时间：
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row',flex:1,}}>
                        <Text style={styles.cont_text8}>
                          {date2str(new Date(d.startTime.replace(/\-/g, "/")), "yyyy年MM月dd日 hh:mm")}
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                      <View style={{flexDirection: 'row',}}>
                        <Text style={styles.cont_text8}>
                          地点：
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row',flex:1,}}>
                        <Text style={styles.cont_text8}>
                          {d.location}
                        </Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row',marginTop:7}}>
                      <View style={{flexDirection: 'row',}}>
                        <Text style={styles.cont_text8}>
                          已预约人数：
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row',flex:1,}}>
                        <Text style={styles.cont_text8}>
                          {d.reserveNum}/{d.mostPeople}
                        </Text>
                      </View>
                    </View>


                  </View>
                </View>
              </Image>
              {/*_props.btnView?_props.btnView:null*/}
              {d.reserve?
              <TouchableOpacity style={styles.lecttop5} underlayColor='transparent' disabled>
                <Text style={styles.cont_text7}>{'已预约'}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.lecttop5} underlayColor='transparent' onPress={()=>_props.onoffShow(d.id_)}>
                <Text style={styles.cont_text7}>{'立即预约'}</Text>
              </TouchableOpacity>
              }
            </View>
                ))}




        </Swiper>

      </View>
    );
  }

};
// {_props.btnView?_props.btnView:null}
const styles = StyleSheet.create({
  lunbo:{
    height:184,
    overflow:"hidden",
  },
  rig2: {
    width: width-24,
    flexDirection: 'column',
    paddingBottom: 10,
  },
  lecttop2: {
    width: width-24,
    height: 144,
    flexDirection: 'column',
  },
  lecttop3: {
    width: width-24,
    height: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lecttop4: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  cont_text2: {
    fontSize: 15,
    color: color.font1C,
  },
  cont_text7: {
    fontSize: 15,
    color: color.main1C,
  },
  cont_text8: {
    fontSize: 13,
    color: color.font1C,
  },
  lecttop5: {
    height: 40,
    width: width-24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fbe5dd",
  },

});

module.exports = SwiperLecture
