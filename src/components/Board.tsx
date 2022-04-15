import Square from './Square';

interface Props {
  cells: string[];
  highlight: number[];
  onClick: (arg0: number) => void;
}

const Board = (props: Props) => {
  const {cells, highlight, onClick} = props;

  const renderSquare = (i: number) => {
    const shouldHighlight = highlight.includes(i);
    return <Square value={cells[i]} highlight={shouldHighlight} key={i} onClick={() => onClick(i)}/>;
  }

  const renderRow = (row: number) => {
    let squares = [];
    for (let i = 0; i < 3; i++) {
      squares.push(renderSquare(row * 3 + i));
    }
    return (
      <div className="board-row" key={row}>
        {squares}
      </div>
    );
  }

  const renderBoard = () => {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(renderRow(i));
    }
    return (
      rows
    )
  }

  return <>
    {renderBoard()}
  </>;
}

export default Board;