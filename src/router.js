'use strict';
import React, { Component, } from 'react';
import { StyleSheet, View, Navigator, BackHandler, TouchableOpacity, StatusBar, PermissionsAndroid, AsyncStorage,Image ,ToastAndroid} from 'react-native';
import Orientation from "react-native-orientation"
import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');
  import { StackNavigator,TabNavigator} from "react-navigation";
  import Login from './router/Login';//登录页
  import Register from './router/Register';//注册页
  import ForgetPassWord from './router/ForgetPassWord'//忘记密码页
  import Verification from './router/Verification'//验证码页面
  import Find from './router/Find';//发现  首页
  import Journalism from './router/Journalism'; //发现更多
  import JournalismDetail from './router/Journalism/Detail';//文章详情页
  import JournalismMedicineDetail from './router/Journalism/MedicineDetail';//金牌中医详情页
  import Search from './router/Search';//查询页
  import Company from './router/Company';//单位详情
  import ResetPassWord from './router/ResetPassWord'//重置密码

   import Famous from './router/Famous';//名家首页
   import FamousDetail from './router/Famous/Detail';//名家详情页
   import Consultation from './router/Consultation';//问题列表
   import ConsultationWrite from './router/Consultation/Write';//问题咨询页
   import ConsultationDetail from './router/Consultation/Detail';//问题详情页
   import Talking from './router/Consultation/Talking';//在线咨询
   import Interrogation from './router/Consultation/Interrogation';//咨询问诊
   import SecondWrite from './router/Consultation/SecondWrite';//追问跳转

  import Mine from './router/Mine';//我的主页
  import ConsultationMy from './router/Consultation/My';//我的提问
  import MyPoints from './router/MyPoints';//我的积分页
  import Setting from './router/Setting';//设置页
  import Security from './router/Security';//账号安全
  import EditPassWord from './router/EditPassWord';//修改密码
  import ReplaceTel from './router/ReplaceTel';//修改电话
  import Address from './router/Address';//地址管理首页
  import EditData from './router/EditData';//修改个人信息
  import Email from './router/Email';//邮箱首页
  import Collect from './router/Collect';//收藏页
  import EmailSuccess from './router/EmailSuccess'//邮箱发送成功页
  import EditAddress from './router/EditAddress';//修改地址页
  import CustomerService from './router/CustomerService';//售后服务页
  import OrderInquiry from './router/OrderInquiry';//查询订单页
  import OrderInfo from './router/OrderInfo';//订单详情页
  import ReturnOrder from './router/ReturnOrder';//退货页
  import SelectAddress from './router/SelectAddress'//编辑地址页
  import MyBooks from './router/MyBooks';//我的书架
  import MyVideo from './router/MyVideo';//我的视频
  import MyAudio from './router/MyAudio';//我的音频

  import Boutique from './router/Boutique';//精品 //
  import Bookstore from './router/Bookstore';//书城
  import BookDetail from './router/BookDetail';//书籍详情
  import VideoPlayer from './router/VideoPlayer';//播放视频
  import VideoList from './router/VideoList';//视频列表
  import VideoInfo from './router/VideoInfo';//视频详情
  import AudioList from './router/AudioList';//音频列表
  import ShoppingCart from './router/ShoppingCart';//购物车列表
  import TryRead from './router/TryRead';//试读页
  import AudioRecom from './router/AudioRecom';//音频推荐
  import ConfirmOrder from './router/ConfirmOrder'//确认订单
  import TryVideo from './router/TryVideo'//尝试播放
  import OrderPay from './router/OrderPay'//支付页面
  import Epub from './router/Epub'
  import FindSearch from './router/FindSearch';//发现搜索页面
  import FamousSearch from './router/FamousSearch'//名家搜索页面
  import BoutiqueSearch from './router/BoutiqueSearch'//精品搜索页面
  import CallUs from './router/CallUs';
const NavTopRend = TabNavigator({
  Find: {
      screen: Find ,
       path:'app/find',
      navigationOptions: {  // 也可以写在组件的static navigationOptions内
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor,focused}) => (!focused?<Image source={require('./images/icon-44-a1-1.png')} style={styles.navIcon}/> :<Image source={require('./images/icon-44-a1.png')} style={styles.navIcon}/>),
        },
    },
  Famous: {
      screen: Famous ,
       path:'app/famous',
      navigationOptions: {  // 也可以写在组件的static navigationOptions内
        tabBarLabel: '名家',
        tabBarIcon: ({tintColor,focused}) => (!focused?<Image source={require('./images/icon-44-a2-1.png')} style={styles.navIcon}/> :<Image source={require('./images/icon-44-a2.png')} style={styles.navIcon}/>),
      },
    },
  Boutique:{
        screen: Boutique ,
         path:'app/boutique',
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
          tabBarLabel: '精品',
          tabBarIcon: ({tintColor,focused}) => (!focused?<Image source={require('./images/icon-44-a3-1.png')} style={styles.navIcon}/> :<Image source={require('./images/icon-44-a3.png')} style={styles.navIcon}/>),
        },
    },
  Mine:{
        screen: Mine ,
         path:'app/mine',
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
          tabBarLabel: '我的',
          tabBarIcon: ({tintColor,focused}) => (!focused?<Image source={require('./images/icon-44-a4-1.png')} style={styles.navIcon}/> :<Image source={require('./images/icon-44-a4.png')} style={styles.navIcon}/>),
        },
    },
  },
  {

      animationEnabled: false, // 切换页面时是否有动画效果
      tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
      swipeEnabled: false, // 是否可以左右滑动切换tab
      backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      lazy:true,
      tabBarOptions: {
          activeTintColor: '#d04114', // 文字和图片选中颜色
          inactiveTintColor: '#333c45', // 文字和图片未选中颜色
          showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          },
          activeBackgroundColor:"#fff",
          inactiveBackgroundColor:"#fff",
          style: {
              backgroundColor: '#fff', // TabBar 背景色
              height:98*width/750,
              // alignItems:"center",
              // justifyContent:"center",
          },
          labelStyle: {
              fontSize: 11, // 文字大小
              marginTop:0,

          },
      },
})
const AppRender = StackNavigator({
    Find:{
      screen: NavTopRend,
      path:"app/find",
        navigationOptions:{
            header:null,
        }
    },
    Famous:{
      screen: NavTopRend,
      path:"app/famous",
        navigationOptions:{
            header:null,
        }
    },
    Boutique:{
      screen: NavTopRend,
      path:"app/boutique",
        navigationOptions:{
            header:null,
        }
    },
    Mine:{
      screen: NavTopRend,
      path:"app/mine",
        navigationOptions:{
            header:null,
        }
    },
      Login: {
          screen: Login,
            navigationOptions:{
                header:null,
            }
        },
      Register: {
          screen: Register,
            navigationOptions:{
                header:null,
            }
        },
      Journalism: {
          screen: Journalism,
            navigationOptions:{
                header:null,
            }
        },
      JournalismDetail: {
          screen: JournalismDetail,
            navigationOptions:{
                header:null,
            }
        },
      JournalismMedicineDetail: {
          screen: JournalismMedicineDetail,
            navigationOptions:{
                header:null,
            }
        },
      Company:{
        screen: Company,
          navigationOptions:{
              header:null,
          }
      },
      Search: {
          screen: Search,
            navigationOptions:{
                header:null,
            }
        },
      FamousDetail: {
          screen: FamousDetail,
            navigationOptions:{
                header:null,
            }
        },
      Consultation: {
          screen: Consultation,
            navigationOptions:{
                header:null,
            }
        },
      SecondWrite:{
        screen:SecondWrite,
          navigationOptions:{
            header:null,
          }
      },
      ConsultationWrite: {
          screen: ConsultationWrite,
            navigationOptions:{
                header:null,
            }
        },
      ConsultationDetail: {
          screen: ConsultationDetail,
            navigationOptions:{
                header:null,
            }
        },
      Talking: {
          screen: Talking,
            navigationOptions:{
                header:null,
            }
        },
      Interrogation: {
          screen: Interrogation,
            navigationOptions:{
                header:null,
            }
        },

        ConsultationMy: {
            screen: ConsultationMy,
              navigationOptions:{
                  header:null,
              }
          },
        MyPoints: {
            screen: MyPoints,
              navigationOptions:{
                  header:null,
              }
          },
        Setting: {
              screen: Setting,
                navigationOptions:{
                    header:null,
                }
            },
        Security: {
            screen: Security,
              navigationOptions:{
                  header:null,
              }
          },
        EditPassWord: {
            screen: EditPassWord,
              navigationOptions:{
                  header:null,
              }
          },
        ReplaceTel: {
            screen: ReplaceTel,
              navigationOptions:{
                  header:null,
              }
          },
        Address: {
            screen: Address,
              navigationOptions:{
                  header:null,
              }
          },
        EditAddress: {
            screen: EditAddress,
              navigationOptions:{
                  header:null,
              }
          },
        EditData: {
            screen: EditData,
              navigationOptions:{
                  header:null,
              }
          },
        Email: {
            screen: Email,
              navigationOptions:{
                  header:null,
              }
          },
        Collect: {
            screen: Collect,
              navigationOptions:{
                  header:null,
              }
          },
        EmailSuccess: {
            screen: EmailSuccess,
              navigationOptions:{
                  header:null,
              }
          },
        CustomerService: {
            screen: CustomerService,
              navigationOptions:{
                  header:null,
              }
          },
        OrderInquiry: {
            screen: OrderInquiry,
              navigationOptions:{
                  header:null,
              }
          },
        OrderInfo: {
            screen: OrderInfo,
              navigationOptions:{
                  header:null,
              }
          },
        ReturnOrder: {
            screen: ReturnOrder,
              navigationOptions:{
                  header:null,
              }
          },
        MyBooks: {
            screen: MyBooks,
              navigationOptions:{
                  header:null,
              }
          },
        MyVideo: {
            screen: MyVideo,
              navigationOptions:{
                  header:null,
              }
          },
        MyAudio: {
            screen: MyAudio,
              navigationOptions:{
                  header:null,
              }
          },
        Bookstore: {
            screen: Bookstore,
              navigationOptions:{
                  header:null,
              }
          },
        BookDetail: {
            screen: BookDetail,
              navigationOptions:{
                  header:null,
              }
          },
        VideoPlayer: {
            screen: VideoPlayer,
              navigationOptions:{
                  header:null,
              }
          },
        VideoList: {
            screen: VideoList,
              navigationOptions:{
                  header:null,
              }
          },
        VideoInfo: {
            screen: VideoInfo,
              navigationOptions:{
                  header:null,
              }
          },
        AudioList: {
            screen: AudioList,
              navigationOptions:{
                  header:null,
              }
          },

        ShoppingCart: {
            screen: ShoppingCart,
              navigationOptions:{
                  header:null,
              }
          },
        ConfirmOrder:{
          screen: ConfirmOrder,
            navigationOptions:{
                header:null,
            }
        },
        TryRead: {
            screen: TryRead,
              navigationOptions:{
                  header:null,
              }
          },
        AudioRecom: {
            screen: AudioRecom,
              navigationOptions:{
                  header:null,
              }
          },
        ForgetPassWord:{
          screen: ForgetPassWord,
            navigationOptions:{
              header:null
            }
        },
        Verification:{
          screen: Verification,
            navigationOptions:{
              header:null
            }
        },
        ResetPassWord:{
          screen:ResetPassWord,
            navigationOptions:{
              header:null
            }
        },
        TryVideo:{
          screen:TryVideo,
            navigationOptions:{
              header:null
            }
        },
        SelectAddress:{
          screen:SelectAddress,
            navigationOptions:{
              header:null
            }
        },
        OrderPay:{
          screen:OrderPay,
            navigationOptions:{
              header:null
            }
        },
        Epub:{
          screen:Epub,
            navigationOptions:{
              header:null
            }
        },
        FindSearch:{
          screen:FindSearch,
            navigationOptions:{
              header:null
            }
        },
        FamousSearch:{
          screen:FamousSearch,
            navigationOptions:{
              header:null
            }
        },
        BoutiqueSearch:{
          screen:BoutiqueSearch,
            navigationOptions:{
              header:null
            }
        },
        CallUs:{
          screen:CallUs,
            navigationOptions:{
              header:null
            }
        },
    }
    ,{
        initialRouteName: 'Find',
    }
)

function getCurrentRouteName(navigationState) { //当前路由对象
  if (!navigationState) {   //如果当前路由对象不存在
    return null;    //return
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}
// onNavigationStateChange={(prevState,currentState)=>{
//      console.log(currentState);
//      console.log(prevState);console.log(currentScreen);console.log(prevScreen)
//      const  currentScreen = getCurrentRouteName(currentState)
//      const  prevScreen = getCurrentRouteName(prevState);
//      if(currentScreen=="Mine"){
//        // currentState.routes.[3].routes='Login'
//      }
//      }}
var _this;

export default class Router extends Component {
    constructor(props){
      super(props)
      this.state={
          curScreen:""
      }
    }
  //   componentWillMount(){
  //     BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
  //   }
  //   componentUnWillMount(){
  //     BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
  //   }
  //   _onBackAndroid() {
  //     //console.log(_this.state.curScreen);
  //     // if (this.lastBackPressed&&this.lastBackPressed + 2000 >= Date.now()) {
  //         return false
  //         // this.lastBackPressed = Date.now();
  //         // ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
  //         // return true
  //       // }
  //  }
    render() {
      _this=this
      return (
        <View style={{flex:1}}>
            <StatusBar
              translucent={true}
              backgroundColor={"transparent"}
              barStyle="light-content"
            />
            <AppRender onNavigationStateChange={(prevState,currentState)=>{
                 console.log(currentState);
                 console.log(prevState);
                _this.setState({
                  curScreen:currentState.routes
                })
                //  console.log(currentScreen);
                //  console.log(prevScreen)
                 const  currentScreen = getCurrentRouteName(currentState)
                 _this.setState({
                    curScreen:currentScreen
                 })
                 const  prevScreen = getCurrentRouteName(prevState);

                //  if(currentState.routes.routeName!="VideoInfo"){
                //      Orientation.lockToPortrait();
                //  }
                 }}/>
        </View>

      )
    }
}

const styles = StyleSheet.create({
  navIcon:{
    width: 16,
    height: 16
  }
});
