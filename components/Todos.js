import React, { useState } from 'react'
import idGenerator from 'react-id-generator'
import Todo from './Todo'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox
} from 'react-native'

export default function Todos () {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const addItem = () => {
    if (!text.trim()) return
    const newItem = {
      value: text.trim(),
      id: idGenerator(),
      completed: false
    }

    setText('')
    setItems([...items, newItem])
  }

  const toggleItemStatus = id => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )
  }

  const saveItemText = (id, text) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, value: text }
        }
        return item
      })
    )
  }

  const getTotalItemsCount = () => {
    return items.length
  }

  const getUncompletedItemsCount = () => {
    return items.filter(item => !item.completed).length
  }

  return (
    <View style={styles.root}>
      <View>
        <Text>TO DO :</Text>
        <TextInput
          type='text'
          value={text}
          placeholder='new task'
          onChangeText={input => {
            setText(input)
          }}
        />
        <Button title='Add the task' onPress={addItem} />
      </View>
      {items.map(item => {
        return (
          <Todo
            key={item.id}
            data={item}
            toggleStatus={toggleItemStatus}
            save={saveItemText}
          />
        )
      })}
      <Text>Total count of task: {getTotalItemsCount()}</Text>
      <Text>Uncompleted tasks count: {getUncompletedItemsCount()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20
  }
})
