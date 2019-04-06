import React from 'react'
import TodoItem from './models/TodoModel'
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
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      edit_mode: false,
      items: []
    }
  }

  addItem = () => {
    this.setState({
        text: '',
        items: [...this.state.items, new TodoItem(this.state.text)]
      })
  }

  changeItems = () => {
    this.setState({edit_mode: !this.state.edit_mode})
  }

  toggleItemStatus = (id) => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    })
  }

  changeItem = (input, id) => {
    this.setState({
      items: this.state.items.map(todo => {
        if (todo.id === id) {
          return { ...todo, value: input }
        }
        return todo
      })
    })
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
        <Text>TO DO :</Text>
        <TextInput
          type='text'
          value={this.state.text}
          placeholder='new task'
          onChangeText={input => {
            this.setState({ text: input })
          }}
        />
        <Button
          title='Add the task'
          onPress={this.addItem}
        />

        <Todo state={this.state} toggleItemStatus={this.toggleItemStatus} changeItem={this.changeItem} />
        <Text>{this.getTotalItemsCount()} - total count of task</Text>
        <Text>{this.getUncompletedItemsCount()} - uncompleted tasks count</Text>
        <Button title='Edit Mode' onPress={this.changeItems}/>
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
