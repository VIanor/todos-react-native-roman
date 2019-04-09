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
      items: [],
      editMode: false,
      id: undefined
    }
  }

  addItem = () => {
    this.setState({
      text: '',
      items: [...this.state.items, new TodoModel(this.state.text.trim())]
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

  changeEvent = itemId => {
    this.setState(state => ({
      editMode: !state.editMode,
      id: itemId
    }))
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
              edit={this.state.editMode}
              identificator={this.state.id}
              data={item}
              toggleStatus={this.toggleItemStatus}
              changeInit={this.changeEvent.bind(this, item.id)}
              toggleChangeItem={this.changeItem}
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
