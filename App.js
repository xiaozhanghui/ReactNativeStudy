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

import Day1 from './src/pages/day1'; //bug when not stop then exit
import Day2 from './src/pages/day2'; 

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
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
// const RootStack = StackNavigator(
//   {
//     Home: {
//       screen: MainView,
//     },
//     day1: {
//       screen: Day1,
//     },
//     day2: {
//       screen: Day2,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}