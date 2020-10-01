import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      favouriteJokes: []
    };

    this.newJoke = this.newJoke.bind(this)
    this.addToFav = this.addToFav.bind(this)
    this.clearFav= this.clearFav.bind(this)
    this.deleteFav = this.deleteFav(this)
  }

  newJoke() {
    fetch("https://api.icndb.com/jokes/random")
      .then((data) => data.json())
      .then((d) => this.setState({jokes: [d]}))
  }

  addToFav() {
    let jokes = this.state.jokes
    let favJokes = this.state.favouriteJokes

    if (favJokes.length > 9) {
      favJokes.shift()
      console.log(favJokes)
      this.setState({favouriteJokes: favJokes})
    }

    jokes.map(j => {
      favJokes.push(j)
    })

    this.setState({favouriteJokes: favJokes}) 
  }

  clearFav() {
    let favJokes = this.state.favouriteJokes
    favJokes = [];
    this.setState({favouriteJokes: favJokes})
  }

  deleteFav(i) {
    let favJokes = this.state.favouriteJokes
    favJokes.splice(i, 1)
    this.setState({favouriteJokes: favJokes})
  }

  componentDidMount() {
    fetch("https://api.icndb.com/jokes/random")
      .then((data) => data.json())
      .then((d) => this.setState({jokes: [d]}))
      .then(console.log(this.state.jokes))
  }

  render() {
    return (
      <div className="App">
        <div id="joke-block">
          {this.state.jokes.map(j => {
            return (
              <p id="text" key={j.value.id}>{j.value.joke}</p>
            )
          })}

          <button id="new-joke" onClick={this.newJoke}>New Joke</button>
          <button id="addToFav" onClick={this.addToFav}>Add to Favourite</button>
        </div>

        <div className="favorite-jokes-block">
          <h2>Favourite Jokes</h2>
          <div onClick={this.clearFav}>Clear <i className="fas fa-trash-alt"></i></div>

          {this.state.favouriteJokes.map(j => {
            return (
              <div className="favourite-joke" key={Date.now().toString()}>
                <div  key={j.value.id}>{j.value.joke}</div>
                <i className="fas fa-times" onClick={this.deleteFav}></i>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
