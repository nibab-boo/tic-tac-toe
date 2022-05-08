import React from 'react';
import TickRow from './TickRow';
import { useTurn, useTurnUpdate } from './TurnProvider'

const MainBox = () => {
  // Context from useContext.
  const turn = useTurn()
  const turnToggle = useTurnUpdate();

  // Game Checker
  const checkGame = (e) => {
    const row = e.currentTarget.dataset.row;
    const col = e.currentTarget.dataset.col;
    let game = false;
    const rowBoxes = document.querySelectorAll(`[data-row="${row}"`);
    const colBoxes = document.querySelectorAll(`[data-col="${col}"`);
    // Horizontal Check
    // 1. Row remains same and only Columns change.
    const horizontalCheck = () => {
      game = Array.from(rowBoxes).every(td => td.dataset.turn === `${turn}`)
      if (game) Array.from(rowBoxes).forEach((td)=> {td.style.background="green"})
    }
    horizontalCheck();
    // Vertical Check
    // 1. Column remains same and only Rows change.
    const verticalCheck = () => {
      game = Array.from(colBoxes).every(td => td.dataset.turn === `${turn}`)
      if (game) Array.from(colBoxes).forEach((td)=> {td.style.background="green"})
    }
    verticalCheck();
    // Cross Check
    const crossCheck = () => {
      // return if e.currentTarget is one of this four box.
      const skipThese= ['1x2', '2x1','2x3', '3x2'];
      if (skipThese.includes(`${row}x${col}`)) return
      // right slash check
      const boxes = [];
      for (let i = 1; i <= 3; i++ ) {
        boxes.push(document.querySelector(`[data-row="${i}"][data-col="${i}"]`))
      }
      game = (boxes).every(td => td.dataset.turn === `${turn}`)
      if (game) (boxes).forEach((td)=> {td.style.background="green"})
      // left slash check
      boxes.length = 0;
      for (let i = 1; i <= 3; i++ ) {
        boxes.push(document.querySelector(`[data-row="${i}"][data-col="${4 - i}"]`))
        console.log(boxes);
      }
      game = (boxes).every(td => td.dataset.turn === `${turn}`)
      if (game) (boxes).forEach((td)=> {td.style.background="green"})
    }
    crossCheck();
  }
  

  // Handling Click event.
  const handleClick = (e) => {
    if (e.currentTarget.dataset.turn) return
    if (turn) {
      e.currentTarget.textContent = "X";
    } else {
      e.currentTarget.textContent = "O"
    }
    e.currentTarget.dataset.turn = turn;
    checkGame(e);
    turnToggle();
  }



  // Creating rows.
  const rows = [];
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