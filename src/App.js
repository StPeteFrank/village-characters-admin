import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      village: [],
      character: []
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
    axios.get('https://localhost:5001/api/Character').then(response => {
      this.setState({
        character: response.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Village Characters</h1>
        <h3>List of Villages</h3>
        {this.state.village.map((village, index) => {
          return <p key={index}>{village.name}</p>
        })}
        <h3>List of Characters</h3>
        {this.state.character.map((character, index) => {
          return <p key={index}>{character.name}</p>
        })}
      </div>
    )
  }
}

export default App
