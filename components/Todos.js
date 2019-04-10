import React from 'react'
import TodoModel from './models/Todo'
import Todo from './Todo'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox
} from 'react-native'

export default class Todos extends React.Component {
  state = {
    text: '',
    items: []
  }

  addItem = () => {
    const text = this.state.text
    if (!text.trim()) return
    this.setState(state => ({
      text: '',
      items: [...state.items, new TodoModel(text.trim())]
    }))
  }

  toggleItemStatus = id => {
    this.setState(state => ({
      items: state.items.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    }))
  }

  saveItem = (id, input) => {
    this.setState(state => ({
      items: state.items.map(todo => {
        if (todo.id === id) {
          return { ...todo, value: input }
        }
        return todo
      })
    }))
  }

  getTotalItemsCount = () => {
    return this.state.items.length
  }

  getUncompletedItemsCount = () => {
    return this.state.items.filter(item => !item.completed).length
  }

  render () {
    return (
      <View style={styles.root}>
        <View>
          <Text>TO DO :</Text>
          <TextInput
            type='text'
            value={this.state.text}
            placeholder='new task'
            onChangeText={input => {
              this.setState({ text: input })
            }}
          />
          <Button title='Add the task' onPress={this.addItem} />
        </View>
        {this.state.items.map(item => {
          return (
            <Todo
              key={item.id}
              data={item}
              toggleStatus={this.toggleItemStatus}
              save={this.saveItem}
            />
          )
        })}
        <Text>Total count of task: {this.getTotalItemsCount()}</Text>
        <Text>Uncompleted tasks count: {this.getUncompletedItemsCount()}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20
  }
})
