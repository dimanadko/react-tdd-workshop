import React, { Fragment } from 'react';
import Registration from './Registration';
import Game from './Game';
import { gameStatus } from './gameService';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      p1Name: '',
      p2Name: '',
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      currentPlayer: 'X',
    };
  }
  onNewGame = ({ p1Name, p2Name }) => {
    this.setState({ p1Name, p2Name });
  };

  handleCellClick = (rIndex, cIndex) => {
    const board = this.state.board.map(row => [...row]);
    if (!board[rIndex][cIndex]) {
      board[rIndex][cIndex] = this.state.currentPlayer;
      if (gameStatus(board) === this.state.currentPlayer) {
        this.setState({ winner: this.state.currentPlayer });
      }
      if (gameStatus(board) === 'tie') {
        this.setState({ winner: 'tie' });
      }
      const nextPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
      this.setState({ board, currentPlayer: nextPlayer });
    }
  };

  saveGame = () => {
    localStorage.setItem('board', JSON.stringify(this.state.board));
    localStorage.setItem('currentPlayer', this.state.currentPlayer);
  };
  loadGame = () => {
    this.setState({ board: JSON.parse(localStorage.getItem('board')) });
    this.setState({ currentPlayer: localStorage.getItem('currentPlayer') });
  };
  render() {
    const { p1Name, p2Name } = this.state;
    return (
      <div className="App">
        {p1Name || p2Name ? (
          <Fragment>
            <Game
              onCellClicked={this.handleCellClick}
              board={this.state.board}
              p1Name={this.state.p1Name}
              p2Name={this.state.p2Name}
            />
            <div>
              <button onClick={this.saveGame}>Save</button>
              <button onClick={this.loadGame}>Load</button>
            </div>
          </Fragment>
        ) : (
          <Registration onNewGame={this.onNewGame} />
        )}
        {this.state.winner && (
          <div data-hook="winner-message">
            {this.state.winner === 'tie'
              ? "It's a tie!"
              : `${this.state.winner === 'X' ? this.state.p1Name : this.state.p2Name} won!`}
          </div>
        )}
      </div>
    );
  }
}
export default App;
