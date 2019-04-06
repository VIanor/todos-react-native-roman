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
    let items = this.props.state.items.map(item => (
      <View style={styles.root} key={item.id}>
        <View>
          <CheckBox
            onChange={() => {
              this.props.toggleItemStatus(item.id)
            }}
            value={item.completed}
            checked={item.completed}
          />
        </View>
        <View>
          <Text>{item.value}</Text>
        </View>
      </View>
    ))
    if (this.props.state.edit_mode) {
      items = this.props.state.items.map(item => (
        <View style={styles.root} key={item.id}>
          <View>
            <CheckBox
              onChange={() => {
                this.props.toggleItemStatus(item.id)
              }}
              value={item.completed}
              checked={item.completed}
            />
          </View>
          <View>
            <TextInput
              type='text'
              value={item.value}
              onChangeText={input => {
                this.props.changeItem(input, item.id)
              }}
            />
          </View>
        </View>
      ))
    }
    return <View>{items}</View>
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row'
  }
})
