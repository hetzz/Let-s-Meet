/**
 * 
 * 
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import VidCall from './components/VidCall';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
} from 'react-native-webrtc';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref();
let metadatabase = firebase.database().ref();
let yourId = Math.floor(Math.random() * 1000000000);
const configuration = {
  iceServers: [{url: 'stun:stun.l.google.com:19302'}],
};
const pc = new RTCPeerConnection(configuration);
pc.onicecandidate = event => {
  
  event.candidate ? sendMessage(yourId, JSON.stringify({ice: event.candidate})) : console.log('Sent All Ice');
};
readMessage = data => {
  try {
    let msg = JSON.parse(data.val().message);
    let sender = data.val().sender;
    if (sender != yourId) {
      if (msg.ice != undefined) pc.addIceCandidate(new RTCIceCandidate(msg.ice));
      else if (msg.sdp.type == 'offer')
        pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
          .then(() => pc.createAnswer())
          .then(answer => pc.setLocalDescription(answer))
          .then(() => sendMessage(yourId, JSON.stringify({sdp: pc.localDescription})));
      else if (msg.sdp.type == 'answer') pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
  } catch (e) {
    console.log(e);
  }
};


// database.on('child_added', readMessage);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

type Props = {};

let welcome = 'Hi!';
const array = ['Hello!', 'Wilcommen!', 'Hola!', 'नमस्ते!', '你好', 'Привет'];

const randomString = length => {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

const getButtonStyle = color => {
  return {
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
  };
};
export default class App extends Component {
  constructor(props) {
    console.log('hiii');
    super(props);
    this.state = {
      remoteVideo: null,
      myVideo: null,
      isFront: true,
      logs: 'nothing',
      appState: 0,
      i: 0,
      j: 0,
      forward: true,
      waitCount: 6,
    };
    console.log(this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  readMetaMessage = data => {
    try {
      let message = data.val().message;
      
      
      if(message === "CALL_END") {
        this.setState({
          appState: 0
        })
      }
    } catch (e) {
      console.log("meta")
      console.log(e);
    }
  }

  sendEndMessage = () => {
    let msg = metadatabase.push({message: "CALL_END"});
  }

  handleChange(event) {
    let {name, value} = event;
    console.log(name, value);
    this.setState({[name]: value});
  }

  handleTextChange(text) {
    console.log(text);
    this.setState({code: text});
  }

  componentDidMount() {
    const {isFront} = this.state;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == 'video' && sourceInfo.facing == (isFront ? 'front' : 'back')) {
          videoSourceId = sourceInfo.id;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, 
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          console.log('Streaming OK', stream);
          this.setState({
            myVideo: stream,
          });
          pc.addStream(stream);
        })
        .catch(error => {
          // Log error
        });
    });
    pc.onaddstream = event => this.setState({remoteVideo: event.stream});
    sendMessage = (senderId, data) => {
      let msg = database.push({sender: senderId, message: data});
      // msg.remove();
    };

    setInterval(() => {
      let {i, j, forward, waitCount} = this.state;
      welcome = array[i].slice(0, j + 1);

      if (waitCount < 6) {
        waitCount += 1;
        this.setState({
          i,
          j,
          forward,
          waitCount,
        });
        return;
      }

      if (forward) {
        j = j + 1;
        if (j == array[i].length) {
          forward = false;
          j = j - 1;
          waitCount = 0;
        }
      } else {
        j = j - 1;
        if (j == -1) {
          forward = true;
          i = (i + 1) % array.length;
        }
      }
      this.setState({
        i,
        j,
        forward,
        waitCount,
      });
    }, 80);
  }
  showPartnerFace = () => {
    //database = firebase.database().ref(`room-${this.state.code}`);
    // database.on('child_added', readMessage);
    pc.createOffer().then(desc => {
      pc.setLocalDescription(desc).then(() => {
        
        //this.setState({logs: pc.localDescription});
        sendMessage(yourId, JSON.stringify({sdp: pc.localDescription}));
      });
    });
  };

  joinRoom = startCallToo => {
    database = firebase.database().ref(`room-${this.state.code}`);
    metadatabase = firebase.database().ref(`room-${this.state.code}-meta`);
    database.on('child_added', readMessage);
    metadatabase.on('child_added', this.readMetaMessage);
    this.setState({
      appState: 4,
    });

    if (startCallToo) {
      this.showPartnerFace();
    }
  };

  switchCamera = () => {
    console.log('camera');
    this.state.myVideo.getVideoTracks().forEach(track => track._switchCamera());
  };

  endCall = () => {
    this.setState(
      {
        appState: 0,
        code: '',
      },
      () => {
        database = null;
      },
    );
  };

  createRoom = () => {
    this.setState(
      {
        code: randomString(6),
      },
      () => {
        this.setState({
          appState: 2,
        });
      },
    );
  };
  render() {
    let appState = this.state.appState;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{height: '100%', width: '100%'}}>
          {appState === 4 ? (
            <VidCall
              remoteVideo={this.state.remoteVideo}
              myVideo={this.state.myVideo}
              switchCamera={this.switchCamera}
              code={this.state.code}
              endCall={this.sendEndMessage}
            />
          ) : (
            <View style={styles.container}>
              <Text style={styles.title}>{welcome}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  height: 100,
                  padding: 20,
                }}
              />
              {appState == 0 ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        appState: 1,
                      });
                    }}>
                    <View style={getButtonStyle('#332959')}>
                      <Text style={{color: 'white', fontSize: 20}}>Join a meet</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 20,
                      padding: 20,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.createRoom();
                    }}>
                    <View style={getButtonStyle('#332959')}>
                      <Text style={{color: 'white', fontSize: 20}}>Create a meet</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TextInput
                    style={{
                      padding: 18,
                      borderColor: 'gray',
                      borderWidth: 2,
                      borderRadius: 30,
                      fontSize: 20,
                      color: 'black',
                    }}
                    onChangeText={text => {
                      appState == 2 ? null : this.handleTextChange(text);
                    }}
                    editable={appState == 1}
                    textAlign="center"
                    value={this.state.code}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 20,
                      padding: 20,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.joinRoom(appState === 1);
                    }}>
                    <View style={getButtonStyle('#332959')}>
                      <Text style={{color: 'white', fontSize: 20}}>Go</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          <View style={{marginTop: 20}} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '50%',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 40,
    fontWeight: '900',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
