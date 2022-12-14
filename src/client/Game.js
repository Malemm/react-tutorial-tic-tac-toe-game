import React from 'react';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.winningSquare ? { backgroundColor: 'blue' } : { backgroundColor: null }}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winningSquare={this.props.winningLine?.includes(i)}
      />
    );
  }

  render() {

    // return (
    //   <div>
    //     <div className="board-row">
    //       {this.renderSquare(0)}
    //       {this.renderSquare(1)}
    //       {this.renderSquare(2)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(3)}
    //       {this.renderSquare(4)}
    //       {this.renderSquare(5)}
    //     </div>
    //     <div className="board-row">
    //       {this.renderSquare(6)}
    //       {this.renderSquare(7)}
    //       {this.renderSquare(8)}
    //     </div>
    //   </div>
    // );

    return (
      <div>
        {[0, 1, 2].map((i, iindex) => {
          return (
            <div className="board-row" key={iindex}>
              {[0, 1, 2].map((j, jindex) => {
                let position = getPosition(j, i);
                return this.renderSquare(position);
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null), clickedButton: null }
      ],
      xIsNext: true,
      stepNumber: 0,
      movesAscSorted: true,
      winningLine: null
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const winningLine = calculateWinner(squares)?.winningLine;

    this.setState({
      history: history.concat([{ squares: squares, clickedButton: i }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      winningLine: winningLine
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  changeMovesOrder() {
    this.setState({
      movesAscSorted: !this.state.movesAscSorted
    })
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const clickedButton = step.clickedButton;
      let { col, row } = getCoordinate(clickedButton);

      const desc = move ?
        'Go to move #' + move + ' (' + col + ', ' + row + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            style={this.state.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
          >
            {desc}
          </button>
        </li>
      );
    });

    moves = this.state.movesAscSorted ? moves : moves.reverse();

    let status;
    if (winner) {
      status = 'Winner: ' + winner?.player;
    } else if (!current.squares.includes(null)) {
      status = 'Draw game!'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let sort;
    if (this.state.movesAscSorted) {
      sort = 'Sort Descending';
    } else {
      sort = 'Sort Ascending';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningLine={winner?.winningLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <button onClick={() => this.changeMovesOrder()}>{sort}</button>

          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], winningLine: lines[i] };
    }
  }
  return null;
}

function getCoordinate(clickedButton) {
  switch (clickedButton) {
    case 0:
      return { col: 1, row: 1 };
    case 1:
      return { col: 2, row: 1 };
    case 2:
      return { col: 3, row: 1 };
    case 3:
      return { col: 1, row: 2 };
    case 4:
      return { col: 2, row: 2 };
    case 5:
      return { col: 3, row: 2 };
    case 6:
      return { col: 1, row: 3 };
    case 7:
      return { col: 2, row: 3 };
    case 8:
      return { col: 3, row: 3 };
    case null:
      return { col: '', row: '' }
  }
}

function getPosition(col, row) {
  if (col === 0 && row === 0)
    return 0;
  else if (col === 1 && row === 0)
    return 1;
  else if (col === 2 && row === 0)
    return 2;
  else if (col === 0 && row === 1)
    return 3;
  else if (col === 1 && row === 1)
    return 4;
  else if (col === 2 && row === 1)
    return 5;
  else if (col === 0 && row === 2)
    return 6;
  else if (col === 1 && row === 2)
    return 7;
  else if (col === 2 && row === 2)
    return 8;
}
