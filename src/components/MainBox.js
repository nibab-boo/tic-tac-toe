import React, { useEffect } from 'react';
import TickRow from './TickRow';
import { useTurn, useTurnUpdate } from './TurnProvider'

const MainBox = () => {
  const turn = useTurn()
  useEffect(() => {
    console.log(turn);
  }, [turn])
  const turnToggle = useTurnUpdate();
  const handleClick = (e) => {
    console.log(e.currentTarget.dataset.row, e.currentTarget.dataset.col);
    turnToggle();
  }

  let rows = [];
  for (let i = 1; i <= 3; i++) {
    rows.push(<TickRow click={handleClick} key={i} row={i}/>);
  }
  return (
    <div>
      <table>
        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
  );
};

export default MainBox;