import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      village: []
    }
  }

  // getAllVillages = () => {
  //   axios.get('https://localhost:5001/api/Village').then(response => {
  //     this.setState({
  //       village: response.data
  //     })
  //   })
  // }
  componentDidMount() {
    axios.get('https://localhost:5001/api/Village').then(response => {
      this.setState({
        village: response.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Village Characters</h1>
        {this.state.village.map((village, index) => {
          return <p key={index}>{village.name}</p>
        })}
      </div>
    )
  }
}

export default App
