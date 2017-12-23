import React from 'react';
import Square from './Square';

class Board extends React.Component {

  renderSquare(i) {
    const highlight = this.props.highlight;
    if (highlight.indexOf(i) > -1) {
      return <Square value={this.props.squares[i]} highlight={true} key={i} onClick={() => this.props.onClick(i)}/>;
      } else {
      return <Square value={this.props.squares[i]} key={i} onClick={() => this.props.onClick(i)}/>;
    }
  }

  renderRow(row) {
    let squares = [];
    for (let i = 0; i < 3; i++) {
      squares.push(this.renderSquare(row * 3 + i));
    }
    return (
      <div className="board-row" key={row}>
        {squares}
      </div>
    );
  }

  renderBoard() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      rows
    )
  }

  render() {
    return (
      this.renderBoard()
    );
  }
}

export default Board;