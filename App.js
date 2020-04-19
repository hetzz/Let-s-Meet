/**
 * 
 * 
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from "react";

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
} from "react-native";

function Separator() {
    return <View style={styles.separator} />;
}

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

function randomString(length) {
    let chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function getButtonStyle(color) {
    return {
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 30,
    };
}
let welcome = "Hi!";
const array = ["Hello!", "Wilcommen!", "Hola!", "नमस्ते!", "你好", "Привет"];
let first = true;

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const App: () => React$Node = () => {
    const [buttonState, setButtonState] = useState(0);
    const [value, onChangeText] = React.useState("Enter Code");
    const [ij, setIJ] = useState({i: 0, j: 0, forward: true, waitCount: 6});

    useInterval(() => {
        let {i, j, forward, waitCount} = ij;
        welcome = array[i].slice(0, j+1);

        if(waitCount < 6) {
          waitCount += 1;
          setIJ({i, j, forward, waitCount});
          return;
        }

        

        if(forward) {
          j = j + 1;
          if (j == array[i].length) {
              forward = false;
              j = j - 1;
              waitCount = 0;
          }
        } else{
          j = j - 1;
          if (j == -1) {
            forward = true;
            i = (i + 1) % array.length;
          }
        }
        
        setIJ({i, j, forward, waitCount});
    }, 80);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>{welcome}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            height: 100,
                            padding: 20,
                        }}
                    />
                    {buttonState == 0 ? (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setButtonState(1);
                                }}
                            >
                                <View style={getButtonStyle("#332959")}>
                                    <Text
                                        style={{ color: "white", fontSize: 20 }}
                                    >
                                        Join a meet
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    height: 20,
                                    padding: 20,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setButtonState(2);
                                }}
                            >
                                <View style={getButtonStyle("#332959")}>
                                    <Text
                                        style={{ color: "white", fontSize: 20 }}
                                    >
                                        Create a meet
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TextInput
                                style={{
                                    padding: 18,
                                    borderColor: "gray",
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    fontSize: 20,
                                    color: buttonState == 1 ? "grey" : "black",
                                }}
                                onChangeText={(text) => {
                                    buttonState == 2
                                        ? null
                                        : onChangeText(text);
                                }}
                                editable={buttonState == 1}
                                textAlign="center"
                                value={
                                    buttonState == 2 ? randomString(6) : value
                                }
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    height: 20,
                                    padding: 20,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setButtonState(0);
                                }}
                            >
                                <View style={getButtonStyle("#332959")}>
                                    <Text
                                        style={{ color: "white", fontSize: 20 }}
                                    >
                                        Back
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={{ marginTop: 20 }} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "50%",
        marginHorizontal: 16,
    },
    title: {
        textAlign: "center",
        marginVertical: 8,
        fontSize: 40,
        fontWeight: "900",
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: "#737373",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default App;
