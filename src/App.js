import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

export default class Game extends React.Component {
  constructor() {
    // console.log("constructor");
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    console.log("while handle click", i);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // console.log("handle click history:", history, history.length);
    const current = history[history.length - 1];
    // console.log("current:", current);
    const squares = current.squares.slice();
    // console.log("squares:", squares);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    console.log("while jumpTo click", step);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    console.log("Game component rendered");
    // console.log(<Board />);
    // console.log("this.state:", this.state);
    const history = this.state.history;
    // console.log("history:", history, history.length);
    const current = history[this.state.stepNumber];
    // console.log("current:", current);
    // console.log("current.squares:", current.squares);
    const winner = calculateWinner(current.squares);
    // console.log("winner:", winner);

    const moves = history.map((step, move) => {
      // console.log("step:", step, "move:", move);
      const desc = move ?
        "Go to move #" + move :
        "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner:" + winner;
    } else {
      status = "Next player:" + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}