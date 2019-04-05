import React from 'react'
import idGenerator from 'react-id-generator'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox
} from 'react-native'

class Todo {
  value
  id
  completed

  constructor (value) {
    this.value = value
    this.id = idGenerator()
    this.completed = false
  }
}

export default class Todos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      items: [],
      items_count: undefined,
      uncompleted_items_count: undefined
    }
  }

  toggleComplete (todo) {
    todo.completed = !todo.completed
    this.setState ({
      uncompleted_items_count: this.state.items.filter(item => !item.completed).length
    })
  }

  render () {

    const items = this.state.items.map(item => (
      <View style={styles.task} key={item.id}>
        <View>
          <CheckBox
          onChange={this.toggleComplete.bind(this, item)}
          value={item.completed}
          checked={item.completed} />
        </View>
        <View>
          <TextInput 
            type='text'
            value={item.value}
            onChangeText={input => {
              item.value = input
              this.setState({
                text: ''
              })
            }}
          />
        </View>
      </View>
    ))

    let count_info = undefined

    if(this.state.items_count && !this.state.uncompleted_items_count)
      count_info = <Text>{this.state.items_count} - total count of tasks</Text>
    
    if(this.state.items_count && this.state.uncompleted_items_count)
      count_info = <Text>{this.state.uncompleted_items_count} / {this.state.items_count} tasks is not completed</Text>
    
    if(this.state.uncompleted_items_count === 0) {
      count_info = <Text>All tasks is comlete</Text>
    }

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
          onPress={() => {
            this.setState({
              text: '',
              items: [...this.state.items, (new Todo(this.state.text))],
              items_count: this.state.items.length + 1,
              uncompleted_items_count: this.state.uncompleted_items_count + 1
            })
          }}
        />
        <View>{items}</View>
        {count_info}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  task: {
    flexDirection: 'row'
  }
})