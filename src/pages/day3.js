/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Animated,Easing,Image,RefreshControl,ScrollView,StatusBar,StyleSheet,Text,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import Util from '../utils/util';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabNavigator,TabBarBottom
 } from 'react-navigation';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  static propTypes = {
    hideThis: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
       transformAnim: new Animated.Value(1), 
       opacityAnim: new Animated.Value(1), 
     };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

class TwitterPost extends Component{
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return(
      <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"/>}>
            <Image source={require('../images/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
      </ScrollView>
    )
  }
}

class TwitterFlow extends Component{
  render() {
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost/>
      </View>
    )
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) =>({  
          title:'主页',
    })
  constructor() {
    super();
    this.state = {
      show:true
    };
  }

  componentDidMount() {
    if(Platform.OS === "ios") {
      StatusBar.setBarStyle(0);
    }
  }

  _hideEntrance() {
    this.setState({
      show:false
    })
  }

  render() {
    let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' },styles.twitterContainer]}>
          <TwitterFlow>
          </TwitterFlow>
          {entrance}
      </View>
    );
  }
}

class NotificationsScreen extends Component {
  static navigationOptions = {
    title:'通知'
  }
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TwitterFlow/>
      </View>
    );
  }
}

class MailScreen extends Component {
  static navigationOptions = {
    title:'私信'
  }
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TwitterFlow/>
      </View>
    );
  }
}

class MeScreen extends Component {
  static navigationOptions = {
    title:'我'
  }
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TwitterFlow/>
      </View>
    );
  }
}

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Notifications: { screen: NotificationsScreen },
    Mail: { screen: MailScreen },
    Me: { screen: MeScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notifications') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`;
        } else if (routeName === 'Mail') {
          iconName = `ios-mail${focused ? '' : '-outline'}`;
        } else if (routeName === 'Me') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true ,
    swipeEnabled: true,
  }
);
const styles = StyleSheet.create({
  twitterContainer:{
    width: Util.size.width,
    height: Util.size.height
  },
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  },
  twitter:{
    color:"#fff",
    position:"relative",
    top: -20,
    textAlign: "center"
  },
  nav:{
    flexDirection: "row",
    paddingTop: 30,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ddd",
    paddingBottom:5,
    backgroundColor:"#fff"
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  }
});
