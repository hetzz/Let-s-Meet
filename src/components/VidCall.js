import React, { Component } from "react";

import {
    View,
    Platform,
    TextInput,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";

export default class VidCall extends Component {
    render() {
        let { remoteVideo, myVideo, code, endCall, switchCamera } = this.props;
        //console.log(localStream, remoteStream)
        return (
            <>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    <View style={{ alignItems: "center", width: "100%" }}>
                        <Text>{code}</Text>
                    </View>

                    {/* <View style={styles.toggleButtons}>
          <Button title="Switch camera" onPress={switchCamera} />
        </View> */}
                    <View
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "80%",
                        }}
                    >
                        <RTCView
                            streamURL={remoteVideo ? remoteVideo.toURL() : null}
                            style={styles.remotevid}
                        />
                        <RTCView
                            streamURL={myVideo ? myVideo.toURL() : null}
                            style={styles.myvideo}
                        />
                    </View>
                    <View
                        style={{ padding: 10, flex: 1, flexDirection: "row" }}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={switchCamera}>
                                <View
                                    style={{
                                        backgroundColor: "#332959",
                                        padding: 10,
                                        maxWidth: 50,
                                        borderRadius: 50,
                                        marginTop: 20,
                                    }}
                                >
                                    <Icon1
                                        name="camera-switch"
                                        onPress={switchCamera}
                                        size={30}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity onPress={endCall}>
                                <View
                                    style={{
                                        backgroundColor: "#ff0000",
                                        padding: 20,
                                        maxWidth: 100,
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Icon2
                                        name="call-end"
                                        size={40}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    myvideo: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "30%",
        height: "30%",
    },
    remotevid: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
    },
    container: {
        backgroundColor: "#313131",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    text: {
        fontSize: 30,
    },
    rtcself: {
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
        width: "20%",
        right: 0,
        zIndex: 999,
        position: "absolute",
        backgroundColor: "black",
    },
    rtcremote: {
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "100%",
        backgroundColor: "black",
    },
    rtc: {
        width: "80%",
        height: "100%",
    },
    toggleButtons: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
