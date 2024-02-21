import React, { useState } from "react"
import { Alert, StyleSheet, TextInput, View, Pressable, Text } from "react-native"
import { supabase } from "../config/supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced]}>
        <TextInput
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email@address.com"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={styles.input}
        />
      </View>

        <Pressable onPress={() => signInWithEmail()}>
          <View style={styles.button}>
            <Text style={styles.text}>Sign In</Text>
          </View>
        </Pressable>
      

        <Pressable onPress={() => signUpWithEmail()}>
          <View style={styles.button}>
            <Text style={styles.text}>Sign Up</Text>
          </View>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 15,
    backgroundColor: "#c7f9cc",
    justifyContent:'center',
    alignItems:'center'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    backgroundColor:'#90e0ef',
    borderRadius:17,
    margin:5,
    paddingHorizontal:10,
    justifyContent:'center',
    height:50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input:{
    height:50,
    borderRadius:15,
  },
  button: {
    borderRadius:25,
    backgroundColor:'#00b4d8',
    width:150,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    margin:7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text:{
    fontSize:22,
    color:'white'
  }
})
