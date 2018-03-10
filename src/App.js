import React from 'react';
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
  render() {
    const { p1Name, p2Name } = this.state;
    return (
      <div className="App">
        {p1Name || p2Name ? (
          <Game
            onCellClicked={this.handleCellClick}
            board={this.state.board}
            p1Name={this.state.p1Name}
            p2Name={this.state.p2Name}
          />
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
