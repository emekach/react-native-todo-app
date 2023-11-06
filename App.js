import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoitem";
import AddTodo from "./components/addTodo";
import Sandbox from "./components/sandbox";


export default function App() {
  const [todos, setTodo] = useState([
    { text: 'buy coffee', key: '1' },
    { text: ' create an app', key: '2' },
    { text: 'play on the switch', key: '3' }
  ]);

  const pressHandler = (key) => {
    setTodo((prevTodos) => {
      return prevTodos.filter(todo => todo.key !== key)
    })
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodo((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('Oops!', 'Todos must be over 3 chars long', [
        { text: 'Understood', onPress: () => console.log('alert closed') }
      ])
    }

  }


  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
      console.log('dismissed keyboard')
    }} >

      <View style={styles.container}>

        <Header />
        {/* header */}

        <View style={styles.content}>
          {/* Todo Form */}
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>

            <FlatList
              keyExtractor={(item) => item.key}
              data={todos}
              renderItem={({ item }) => (

                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>

        </View>

      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {

    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  }


});
