interface Props {
  value: string;
  highlight?: boolean;
  onClick: () => void;
}

const Square = (props: Props) => {
  const {value, highlight, onClick} = props;

  return (
    <button className={"square " + (highlight && 'highlight')}  onClick={() => onClick()}>
      {value}
    </button>
  );
}

export default Square;