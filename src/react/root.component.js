import React from 'react';
import axios from 'axios';
import e from '../event-bus'

export default class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'When Angular receives message, we should see a confirmation here 😎',
      data: []
    }

    this.messageHandler = this.messageHandler.bind(this)
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.setState({data: res.data})
      console.log(res.data, "hdjhdhj")
    }).catch(error => {
      console.log(error, "nadsbsad")
  });

    e.on('received', this.messageHandler)
  }

  // componentWillUnmount() {
  //   e.off('received', this.messageHandler)
  // }

  messageHandler(message) {
    this.setState({
      message: message.text
    })
  }

  sendMessage(id) {
    let filterValue = this.state.data.filter(number => number.id === id);
    console.log(filterValue, "jhjhhjbhj")
    // e.emit('message', { text: `Hello from React: ${filterValue[0].title} and body value is ${filterValue[0].body}` })
    e.emit('message', {text: filterValue})
  }

  render() {
    return (
      <div style={{marginTop: '10px'}}>
        <h1>This was written in React</h1>
        <ul className="get-data-ul">
          {this.state.data && this.state.data.map((user) => {
            return <li onClick={() => this.sendMessage(user.id)} key={user.id}>{user.title}</li>
          })}
        </ul>
        
        <p>
          {this.state.message}
        </p>
      </div>
    )
  }
}
