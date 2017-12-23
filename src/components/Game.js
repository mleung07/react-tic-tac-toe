import React from 'react';
import Board from './Board';
import helpers from '../libs/helpers';
import ai from '../libs/ai';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: Array(2).fill(null),
      }],
      stepNumber: 0,
      currentStep: null,
      xIsNext: false,
      reverse: false,
      highlight: [],
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const location = [i % 3 + 1, Math.floor(i / 3) + 1];
    if (helpers.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: location,
      }]),
      stepNumber: history.length,
      currentStep: history.length,
      xIsNext: !this.state.xIsNext,
      highlight: helpers.highlight(squares),
    });
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      currentStep: step,
      xIsNext: (step & 2) === 0,
    })
  }

  reverse () {
    // console.log(this.state.reverse);
    this.setState({
        reverse: !this.state.reverse,
    })
  }

  restart () {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        location: Array(2).fill(null),
      }],
      stepNumber: 0,
      currentStep: null,
      xIsNext: false,
      reverse: false,
      highlight: [],
    })
  }
  
  componentWillUpdate (prevProps, prevState) {
    const history = prevState.history;
    const current = history[prevState.stepNumber];
    const winner = helpers.calculateWinner(current.squares);
      
    if (!winner & history.length < 9) {
      const aiMove = prevState.xIsNext;
      if (aiMove) {
        const move = ai.bestMove(current.squares.slice());
        const squares = current.squares.slice();
        const location = [move % 3 + 1, Math.floor(move / 3) + 1];
        squares[move] = 'X';

        this.setState({
          history: history.concat([{
            squares: squares,
            location: location,
          }]),
          stepNumber: history.length,
          currentStep: history.length,
          xIsNext: !aiMove,
          highlight: helpers.highlight(squares),
        });
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = helpers.calculateWinner(current.squares);
    // const currentStep = this.state.currentStep;
    const highlight = this.state.highlight;

    let order = [];

    if (this.state.reverse) {
      history.forEach((curr, index, array) => {
        order.push(array[array.length - 1 - index]);
      });
    } else {
      order = history;
    }

    /*const moves = order.map((step, move) => {
      if (this.state.reverse) {
        move = order.length - move - 1;
      }
      const desc = move ?
        'Go to move #' + move + ' (' + step['location'][0] + ',' + step['location'][1] + ')' :
        'Go to game start';
      if (move === currentStep) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><strong>{desc}</strong></button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });*/

    let status = '';
    let restart = <button onClick={() => this.restart()}>Restart</button>;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (helpers.isFull(current.squares)) {
        status = 'Draw';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        restart = false;
      }
    }

    return (
      <div className="game">
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="game-wrapper">
          <div className="game-board">
            <Board squares={current.squares} highlight={highlight} onClick={(i) => this.handleClick(i)}/>
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{restart}</div>
          {/*<div><button onClick={() => this.reverse()}>Toggle Order</button></div>
          <ul>{moves}</ul>*/}
        </div>
      </div>
    );
  }
}

export default Game;