import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox
} from 'react-native'

export default class Todo extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  edit = (input, id) => {
    this.props.save(input, id)
  }

  render () {
    let {data} = this.props

    if (!this.state.edit) {
      return (
        <View style={styles.root}>
          <View>
            <CheckBox
              onChange={() => {
                this.props.toggleStatus(data.id)
              }}
              value={data.completed}
              checked={data.completed}
            />
          </View>
          <View>
            <Text>{data.value}</Text>
          </View>
          <View>
            <Button title='edit' onPress={() => {
              this.setState({
                edit: !this.state.edit
              })
            }} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.root}>
          <View>
            <CheckBox
              onChange={() => {
                this.props.toggleStatus(data.id)
              }}
              value={data.completed}
              checked={data.completed}
            />
          </View>
          <View>
            <TextInput
              type='text'
              value={data.value}
              onChangeText={input => {
                this.edit(input, data.id)
              }}
            />
          </View>
          <View>
            <Button title='done' onPress={() => {
            this.setState(state => ({
                  edit: !state.edit
                }))
              }} />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  edit: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})
