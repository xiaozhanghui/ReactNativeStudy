import React, { Component } from 'react';
import { 
  AppRegistry,
  DeviceEventEmitter,
  Image,
  Navigator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
  TouchableOpacity, 
  TouchableHighlight,
  View,
  Button 
} from 'react-native';
import Util from './src/utils/util';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

import Day1 from './src/pages/day1'; 
import Day2 from './src/pages/day2'; 
import Day3 from './src/pages/day3'; 
import Day4 from './src/pages/day4'; 
import Day5 from './src/pages/day5'; 
import Day6 from './src/pages/day6'; 
import Day7 from './src/pages/day7'; 
import Day8 from './src/pages/day8'; 
import Day9 from './src/pages/day9'; 
import Day10 from './src/pages/day10'; 

class MainView extends Component {
  static navigationOptions = {
    title:'RNStudy'
  }
  constructor() {
    super();
    this.state = {
      days:[{
        key:0,
        title:"A stopwatch",
        component: 'day1',
        isFA: false,
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
      },{
        key:1,
        title:"A weather app",
        component: 'day2',
        isFA: false,
        icon: "ios-partly-sunny",
        size:60,
        color:"#90bdc1",
        hideNav: true,
      },{
        key:2,
        title:"twitter",
        component: 'day3',
        isFA: false,
        icon: "logo-twitter",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:3,
        title:"cocoapods",
        component: 'day4',
        isFA: true,
        icon: "contao",
        size:50,
        color:"#FF9A05",
        hideNav: false,
      },{
        key:4,
        title:"find my location",
        component: 'day5',
        isFA: false,
        icon: "md-pin",
        size:50,
        color:"#00D204",
        hideNav: false,
      },{
        key:5,
        title:"Spotify",
        component: 'day6',
        isFA: true,
        icon: "spotify",
        size:50,
        color:"#777",
        hideNav: true,
      },{
        key:6,
        title:"Moveable Circle",
        component: 'day7',
        isFA: false,
        icon: "ios-baseball",
        size:50,
        color:"#5e2a06",
        hideNav: true,
      },{
        key:7,
        title:"Swipe Left Menu",
        component: 'day8',
        isFA: true,
        icon: "google",
        size:50,
        color:"#4285f4",
        hideNav: true,
      },{
        key:8,
        title:"Twitter Parallax View",
        component: 'day9',
        isFA: true,
        icon: "twitter-square",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        title:"Tumblr Menu",
        component: 'day10',
        isFA: false,
        icon: "logo-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      }]
    }
  }

  _jumpToDay(index){
    this.props.navigation.navigate(this.state.days[index].component, this.state.days[index]);
  }

  render() {
    var onThis = this;
    var boxs = this.state.days.map(function(elem, index) {
      return(
        <TouchableHighlight key={elem.key} style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]} underlayColor="#eee" onPress={()=> onThis._jumpToDay(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Day{index+1}</Text>
            {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <ScrollView style={styles.mainView} title={this.props.title}>
        <Swiper height={150} showsButtons={false} autoplay={true}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(0)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./src/images/day1.png')} />
              <Text style={styles.slideText}>Day1: Timer</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(1)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./src/images/day2.png')} />
              <Text style={styles.slideText}>Day2: Weather</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  touchBox:{
    width: Util.size.width/3-0.33334,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flexGrow: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flexGrow: 1,
    alignSelf: 'stretch',
  }
});
// const boxs = this.state.days.map(function(elem, index) {
  
// })

const MainStack = StackNavigator(
  {
    Home: {
      screen: MainView,
    },
    day1: {
      screen: Day1,
    },
    day4: {
      screen: Day4,
    },
    day5: {
      screen: Day5,
    },
    day6: {
      screen: Day6,
    },

  },
    {
    initialRouteName: 'Home',
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    day2: {
      screen: Day2,
    },
    day3: {
      screen: Day3,
    },
    day7: {
      screen: Day7,
    },
    day8: {
      screen: Day8,
    },
    day9: {
      screen: Day9,
    },
    day10: {
      screen: Day10,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}