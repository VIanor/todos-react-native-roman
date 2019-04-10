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
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      items: []
    }
  }

  addItem = () => {
    const text = this.state.text
    if (!text.trim()) return null
    this.setState({
      text: '',
      items: [...this.state.items, new TodoModel(text.trim())]
    })
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

  edit = (input, id) => {
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
    return this.state.items
      .filter(item => !item.completed).length
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
          <Button
            title='Add the task'
            onPress={this.addItem}
          />
        </View>
        {this.state.items.map(item => {
          return (
            <Todo
              key={item.id}
              data={item}
              toggleStatus={this.toggleItemStatus}
              save={this.edit}
            />
          )
        })}
        <Text>{this.getTotalItemsCount()} - total count of task</Text>
        <Text>{this.getUncompletedItemsCount()} - uncompleted tasks count</Text>
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
