import './App.css';
import React from 'react';
import TickRow from './components/TickRow';

const ClickHandleContext = React.createContext();
export const useClickContextCheck = () => {
  return React.useContext(ClickHandleContext);
}
function App() {
  const [isX, setIsX] = React.useState(false);
  const toggleTurn = () => {
    setIsX(() => !isX)
  }


  const checkGame = (row, col) => {
    const rowBoxes = document.querySelectorAll(`[data-row="${row}"`);
    const colBoxes = document.querySelectorAll(`[data-col="${col}"`);

    const checkBoxes = (boxes) => {
      if (boxes.every(td => td.dataset.turn === `${isX}`)) {
        boxes.forEach((td)=> {td.style.background="green"});
        console.log(boxes);
        setTimeout(()=> {
          const tdes = document.querySelectorAll('td');
          if (window.confirm("Would you like to start a new game?")) {
            tdes.forEach(td => {
              td.dataset.turn = "";
              td.textContent = "";
              td.style.background = "initial";
            })
          } else {
            tdes.forEach(td => {
              if (!td.dataset.turn) td.dataset.turn = "over";
            })
            return
          }
        }, 1000)
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
      const rightSlashBoxes = [], leftSlashBoxes = [];
      for (let i = 1; i <= 3; i++ ) {
        rightSlashBoxes.push(document.querySelector(`[data-row="${i}"][data-col="${i}"]`))
        leftSlashBoxes.push(document.querySelector(`[data-row="${i}"][data-col="${4 - i}"]`))
      }
      checkBoxes(rightSlashBoxes);
      checkBoxes(leftSlashBoxes);
    }
    crossCheck();
  }
  

  // Handling Click event.
  const handleClick = (e) => {
    if (e.currentTarget.dataset.turn) return
    isX ? e.currentTarget.textContent = "X" : e.currentTarget.textContent = "O" ;
    e.currentTarget.dataset.turn = isX;
    console.log(e.currentTarget.dataset.turn);
    checkGame( e.currentTarget.dataset.row, e.currentTarget.dataset.col);
    toggleTurn();
  }




  const rows = [];
  for (let i = 1; i <= 3; i++) {
    rows.push(<TickRow key={i} row={i}/>);
  }

  return (
    <ClickHandleContext.Provider value={handleClick}>  
      <div className="App">
        <table>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    </ClickHandleContext.Provider>
  );
}

export default App;
