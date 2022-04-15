import React from 'react';

interface Props {
  value: string;
  highlight: boolean;
  onClick: () => void;
}

function Cell(props: Props) {
  const { value, highlight = false, onClick } = props;

  return (
    <button className={`cell${highlight && ' highlight'}`} onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Cell;
