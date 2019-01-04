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
  componentDidMount() {
    this.getAllVillages()
    this.getAllCharacters()
  }
  getAllVillages = () => {
    axios.get('https://localhost:5001/api/Village').then(response => {
      this.setState({
        village: response.data
      })
    })
  }
  getAllCharacters = () => {
    axios.get('https://localhost:5001/api/character').then(response => {
      this.setState({
        character: response.data
      })
    })
  }

  addVillageToApi = e => {
    e.preventDefault()
    axios
      .post('https://localhost:5001/api/village', {
        Name: this.state.Name,
        VillageLevel: this.state.VillageLevel,
        TroopCapacity: this.state.TroopCapacity,
        NumberOfWalls: this.state.NumberOfWalls
      })
      .then(response => {
        this.getAllVillages()
      })
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <br />

        <h1>Village Characters</h1>

        <h3>List of Characters</h3>
        <div className="ListOfCharacters">
          {this.state.character.map(character => {
            return (
              <option value={character.id} key={character.id}>
                Character: {character.name} Health: {character.health} Speed:
                {character.speed} Hitpoints: {character.hitpoints}
              </option>
            )
          })}
        </div>

        {/* {this.state.village.map((village, index) => {
          return <p key={index}>{village.name}</p>
        })} */}

        {/* {this.state.character.map((character, index) => {
          return <p key={index}>{character.name}</p>
        })} */}
        <div>
          {/* <select name="dealerId" onChange={this.handleDropDownChange}>
            {/* // display all the dealers */}
          {/* <option value="0">Select a Dealer</option> */}
          <br />
          <h3>List of Villages</h3>

          {this.state.village.map(village => {
            return (
              <option value={village.id} key={village.id}>
                {village.name}
              </option>
            )
          })}

          <form onSubmit={this.addVillageToApi}>
            <input
              type="text"
              placeholder="Name"
              name="Name"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Village Level"
              name="VillageLevel"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Troop Capacity"
              name="TroopCapacity"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Number Of Walls"
              name="NumberOfWalls"
              onChange={this.handleChange}
            />
            <br />
            <button>Add Village</button>
          </form>
          <section>
            {/* <ul>
              {this.state.village.map(village => {
                return <li key={village.id}>{village.name}</li>
              })}
            </ul> */}
          </section>
        </div>
      </div>
    )
  }
}
export default App
