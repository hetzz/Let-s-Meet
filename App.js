/**
 * 
 * 
 *
 * @format
 * @flow strict-local
 */


import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';


function Separator() {
  return <View style={styles.separator} />;
}

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [buttonState, setButtonState] = useState(0);

  function randomString(length) {
		let chars =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

  const [value, onChangeText] = React.useState('Useless Placeholder');
  return (<>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.container}>


      <View>
        <Text style={styles.title}>
          Welcome to P2P
        </Text>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            padding: 20
          }}
        >
        </View>
        {
          buttonState == 0 ? (
            <View>
              <TouchableOpacity onPress={() => { setButtonState(1) }}>
                <View style={{
                  backgroundColor: "#332959", alignItems: 'center',
                  justifyContent: 'center', padding: 20, borderRadius: 30
                }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Join a meet</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  height: 20,
                  padding: 20
                }}
              >
              </View>
              <TouchableOpacity onPress={() => { setButtonState(2) }}>
                <View style={{
                  backgroundColor: "#332959", alignItems: 'center',
                  justifyContent: 'center', padding: 20, borderRadius: 30
                }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Create a meet</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) :
            (
              <View>
            <TextInput
              style={{ height: 60, borderColor: 'gray', borderWidth: 2, borderRadius: 30 }}
              onChangeText={text => {buttonState == 2? null: onChangeText(text)}}
              editable={buttonState == 1}
              textAlign="center"
              
              value={buttonState == 2 ? randomString(6) : value }
            />
            <View
                style={{
                  flexDirection: "row",
                  height: 20,
                  padding: 20
                }}
              >
              </View>
            <TouchableOpacity onPress={() => { setButtonState(0) }}>
                <View style={{
                  backgroundColor: "#332959", alignItems: 'center',
                  justifyContent: 'center', padding: 20, borderRadius: 30
                }}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
                </View>
              </TouchableOpacity>
              </View>
            )
        }
      </View>

      <View style={{ marginTop: 20 }}>


      </View>

    </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '50%',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 30,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});


export default App;
