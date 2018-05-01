/**
 * Day 5
 * find my location
 */
'use strict';

import React,{ Component } from 'react';
import { Platform,Image,StatusBar,StyleSheet,Text,TouchableHighlight,View } from 'react-native';
import Util from '../utils/util';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

export class Map extends Component{
  static defaultProps = {
      mapType: 'standard',
      showsUserLocation: false,
      followsUserLocation: false,
  }; 

  static propTypes = {
      mapType: PropTypes.oneOf(['standard', 'satellite','hybrid']),
      // mapStyle: View.PropTypes.style,
      showsUserLocation: PropTypes.bool.isRequired,
      followsUserLocation: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      annotations: [],
    };
  }

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  render() {
    return(
      <View>
        <MapView
          style={this.props.mapStyle} 
          mapType = {this.props.mapType}
          showsUserLocation={this.props.showsUserLocation}
          followsUserLocation={this.props.followsUserLocation}
          onRegionChangeComplete={(region) => this._onRegionChangeComplete(region)} //没弄明白region,annotations
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          />
      </View>
    )
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      showGeo:false
    };
  }
  
  componentDidMount() {
    if(Platform.OS === "ios"){
      StatusBar.setBarStyle(0);
    }
  }

  _getLocation() {
    this.setState({
      showGeo: true
    })
  }

	render() {
		return(
			<View style={styles.container}>
        <Map mapTyle="standard" mapStyle={styles.map} showsUserLocation={this.state.showGeo} followsUserLocation={this.state.showGeo}></Map>
        <TouchableHighlight underlayColor="#00bd03" style={styles.btn} onPress={() => this._getLocation()}>
          <Text style={styles.btnText}><Icon size={18} name="md-navigate"> </Icon> Find my location</Text>
        </TouchableHighlight>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
  },
  map:{
    width: Util.size.width,
    height: Util.size.height-120
  },
  btn:{
    backgroundColor:"#00a803",
    width: Util.size.width-80,
    height: 40,
    borderWidth:Util.pixel,
    borderColor: "#009302",
    borderRadius: 4,
    justifyContent:"center",
    marginTop:10
  },
  btnText:{
    textAlign:"center",
    fontSize:18,
    color:"#fff"
  },
});