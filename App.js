import React, { useState } from 'react'
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

export default class App extends React.Component {
  render () {
    return <TodosComponent />
  }
}

export class TodosComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      items: []
    }
  }

  render () {
    const items = this.state.items.map(item => (
      <View style={styles.task} key={item.id}>
        <View>
          <CheckBox value={item.completed} checked={item.completed} />
        </View>
        <View>
          <Text>{item.value}</Text>
        </View>
      </View>
    ))

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
            const new_task = new Todo(this.state.text)
            this.setState({
              text: '',
              items: [...this.state.items, new_task]
            })
          }}
        />
        <View>{items}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center'
  },
  task: {
    flexDirection: 'row'
  }
})
