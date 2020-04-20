import React, {Component} from 'react';

import {View, Platform, TextInput, Button, StyleSheet, Text} from 'react-native';

import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

export default class VidCall extends Component {
  render() {
    let {remoteVideo, myVideo, code, endCall, switchCamera} = this.props;
    //console.log(localStream, remoteStream)
    return (
      <>
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
          <View>
            <Text>{code}</Text>
          </View>

          {/* <View style={styles.toggleButtons}>
          <Button title="Switch camera" onPress={switchCamera} />
        </View> */}
          <View
            style={{
              position: 'relative',
              width: '100%',
              height: '80%',
            }}>
            <RTCView streamURL={remoteVideo ? remoteVideo.toURL(): null} style={styles.remotevid} />
            <RTCView streamURL={myVideo ? myVideo.toURL(): null} style={styles.myvideo} />
          </View>
          <View style={{padding:10}}>
            <Button title="Switch Camera" onPress={switchCamera}/>
          </View>
          <View style={{padding:10}}>
            <Button title="End call"/>
          </View>
          
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  myvideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '30%',
  },
  remotevid: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: '#313131',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },
  rtcself: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '20%',
    right: 0,
    zIndex: 999,
    position: 'absolute',
    backgroundColor: 'black',
  },
  rtcremote: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '100%',
    backgroundColor: 'black',
  },
  rtc: {
    width: '80%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
