import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  CheckBox
} from 'react-native'

export default function Todo (props) {
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')

  const toggleEditStatus = () => {
    setEdit(!edit)
    setText(props.data.value)
  }

  const save = () => {
    props.save(props.data.id, text)
    toggleEditStatus()
  }

  let { data } = props
  return (
    <View style={styles.root}>
      <View>
        <CheckBox
          onChange={() => {
            props.toggleStatus(data.id)
          }}
          value={data.completed}
          checked={data.completed}
        />
      </View>
      {edit ? (
        <View style={styles.item}>
          <View style={styles.item}>
            <TextInput
              type='text'
              value={text}
              onChangeText={textt => {
                setText(textt)
              }}
            />
          </View>
          <View>
            <Button title='cancel' onPress={toggleEditStatus} />
          </View>
          <View>
            <Button title='done' onPress={save} />
          </View>
        </View>
      ) : (
        <View style={styles.item}>
          <View style={styles.item}>
            <Text>{data.value}</Text>
          </View>
          <View>
            <Button title='edit' onPress={toggleEditStatus} />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
