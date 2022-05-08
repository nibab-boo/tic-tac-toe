import React, {createContext, useContext} from 'react';
import TickRow from './TickRow';
import { useTurn, useTurnUpdate } from './TurnProvider'

const ClickHandleContext = createContext();
export const ClickContextCheck = () => {
  return useContext(ClickHandleContext);
}

const MainBox = () => {
  // Context from useContext.
  const turn = useTurn()
  const turnToggle = useTurnUpdate();

  // Game Checker
  const checkGame = (row, col) => {
    const rowBoxes = document.querySelectorAll(`[data-row="${row}"`);
    const colBoxes = document.querySelectorAll(`[data-col="${col}"`);

    const checkBoxes = (boxes) => {
      if (boxes.every(td => td.dataset.turn === `${turn}`)) {
        boxes.forEach((td)=> {td.style.background="green"});
        return
      }
    }
      // Horizontal Check
    checkBoxes(Array.from(rowBoxes));
    // Vertical Check
    checkBoxes(Array.from(colBoxes));
    // Cross Check
    const crossCheck = () => {
      // return if e.currentTarget is one of this four box.
      const skipThese= ['1x2', '2x1','2x3', '3x2'];
      if (skipThese.includes(`${row}x${col}`)) return
      const rightBoxes = [], leftBoxes = [];
      for (let i = 1; i <= 3; i++ ) {
        rightBoxes.push(document.querySelector(`[data-row="${i}"][data-col="${i}"]`))
        leftBoxes.push(document.querySelector(`[data-row="${i}"][data-col="${4 - i}"]`))
      }
      checkBoxes(rightBoxes);
      checkBoxes(leftBoxes);
    }
    crossCheck();
  }
  

  // Handling Click event.
  const handleClick = (e) => {
    if (e.currentTarget.dataset.turn) return
    turn ? e.currentTarget.textContent = "X" : e.currentTarget.textContent = "O" ;
    e.currentTarget.dataset.turn = turn;
    checkGame( e.currentTarget.dataset.row, e.currentTarget.dataset.col);
    turnToggle();
  }

  // Creating rows.
  const rows = [];
  for (let i = 1; i <= 3; i++) {
    rows.push(<TickRow click={handleClick} key={i} row={i}/>);
  }

  return (
    <ClickHandleContext.Provider>
      <table>
        <tbody>
          { rows }
        </tbody>
      </table>
    </ClickHandleContext.Provider>
  );
};

export default MainBox;