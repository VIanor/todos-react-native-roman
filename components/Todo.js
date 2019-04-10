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
  state = {
    edit: false,
    text: ''
  }

  toggleEditStatus = () => {
    this.setState(state => ({
      edit: !state.edit,
      text: this.props.data.value
    }))
  }

  save = () => {
    this.props.save(this.props.data.id, this.state.text)
    this.toggleEditStatus()
  }

  render () {
    let { data } = this.props
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
        {this.state.edit ? (
          <View>
            <View>
              <TextInput
                type='text'
                value={this.state.text}
                onChangeText={text => {
                  this.setState({ text })
                }}
              />
            </View>
            <View>
              <Button title='cancel' onPress={this.toggleEditStatus} />
            </View>
            <View>
              <Button title='done' onPress={this.save} />
            </View>
          </View>
        ) : (
          <View style={styles.edit}>
            <View>
              <Text>{data.value}</Text>
            </View>
            <View>
              <Button title='edit' onPress={this.toggleEditStatus} />
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  edit: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
