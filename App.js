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

const styles = StyleSheet.create({
  all: {
    flex: 1,
    justifyContent: 'center'
  },
  task: {
    flexDirection: 'row'
  }
})

class Todo {
  value
  id
  checked

  constructor (value) {
    this.value = value
    this.id = idGenerator()
    this.checked = false
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      todos: []
    }
  }

  render () {
    const list = this.state.todos.map(item => (
      <View style={styles.task} key={item.id}>
        <View>
          <CheckBox value={item.checked} checked={item.checked} />
        </View>
        <View>
          <Text>{item.value}</Text>
        </View>
      </View>
    ))

    return (
      <View style={styles.all}>
        <Text>TO DO :</Text>
        <TextInput
          type='text'
          value={this.state.text}
          placeholder='new task'
          onChangeText={item => {
            this.setState({ text: item })
          }}
        />
        <Button
          title='Add the task'
          onPress={() => {
            this.state.todos.push(new Todo(this.state.text))
            this.setState({
              text: ''
            })
          }}
        />
        <View>{list}</View>
      </View>
    )
  }
}
