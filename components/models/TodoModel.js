import idGenerator from 'react-id-generator'

export default class TodoItem {
  value
  id
  completed

  constructor (value) {
    this.value = value
    this.id = idGenerator()
    this.completed = false
  }
}