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

  addCharacterToApi = e => {
    e.preventDefault()
    axios
      .post('https://localhost:5001/api/character', {
        Name: this.state.CharacterName, //Name
        Health: this.state.Health,
        Speed: this.state.Speed,
        Hitpoints: this.state.Hitpoints,
        VillageId: this.state.VillageId
      })
      .then(response => {
        this.getAllCharacters()
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteCharacter = character => {
    console.log(character)
    axios
      .delete('https://localhost:5001/api/character', {
        data: character
      })
      .then(() => {
        this.getAllCharacters()
      })
  }

  deleteVillage = village => {
    axios
      .delete('https://localhost:5001/api/village', {
        data: village
      })
      .then(this.getAllVillages())
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
              <div value={character.id} key={character.id}>
                Character: {character.name} Health: {character.health} Speed:
                {character.speed} Hitpoints: {character.hitpoints}
                <button onClick={() => this.deleteCharacter(character)}>
                  Remove Character
                </button>
              </div>
            )
          })}
          <form onSubmit={this.addCharacterToApi}>
            <input
              type="text"
              placeholder="Name"
              name="CharacterName"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Health"
              name="Health"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Speed"
              name="Speed"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Hitpoints"
              name="Hitpoints"
              onChange={this.handleChange}
            />
            <input
              type="number"
              placeholder="Village Id"
              name="VillageId"
              onChange={this.handleChange}
            />
            <br />
            <button>Add Character</button>
          </form>
        </div>

        <div>
          <br />
          <h3>List of Villages</h3>

          {this.state.village.map(village => {
            return (
              <div value={village.id} key={village.id}>
                Village: {village.name} Level:{village.villageLevel} Capacity:{' '}
                {village.troopCapacity} Number of Walls {village.numberOfWalls}
                <button onClick={() => this.deleteVillage(village)}>
                  Remove Village
                </button>
              </div>
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
          {/* Remove button does not work. */}
          <button onClick={this.deleteVillage}>Remove Village</button>
        </div>
      </div>
    )
  }
}
export default App
