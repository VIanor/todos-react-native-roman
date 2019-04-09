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
  render () {
    if (this.props.edit) {
      if (this.props.identificator === this.props.data.id) {
        return (
          <View style={styles.root}>
            <View>
              <CheckBox
                onChange={() => {
                  this.props.toggleStatus(this.props.data.id)
                }}
                value={this.props.data.completed}
                checked={this.props.data.completed}
              />
            </View>
            <View>
              <TextInput
                type='text'
                value={this.props.data.value}
                onChangeText={input => {
                  this.props.toggleChangeItem(input, this.props.data.id)
                }}
              />
            </View>
            <View>
              <Button title='done' onPress={this.props.changeInit} />
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.root}>
            <View>
              <CheckBox
                onChange={() => {
                  this.props.toggleStatus(this.props.data.id)
                }}
                value={this.props.data.completed}
                checked={this.props.data.completed}
              />
            </View>
            <View>
              <Text>{this.props.data.value}</Text>
            </View>
            <View>
              <Button
                title='edit'
                onPress={() => {
                  return null
                }}
              />
            </View>
          </View>
        )
      }
    }
    return (
      <View style={styles.root}>
        <View>
          <CheckBox
            onChange={() => {
              this.props.toggleStatus(this.props.data.id)
            }}
            value={this.props.data.completed}
            checked={this.props.data.completed}
          />
        </View>
        <View>
          <Text>{this.props.data.value}</Text>
        </View>
        <View>
          <Button title='edit' onPress={this.props.changeInit} />
        </View>
      </View>
    )
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
