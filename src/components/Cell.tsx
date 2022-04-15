interface Props {
  value: string;
  highlight?: boolean;
  onClick: () => void;
}

const Cell = (props: Props) => {
  const {value, highlight, onClick} = props;

  return (
    <button className={"cell " + (highlight && 'highlight')}  onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Cell;