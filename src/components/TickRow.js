import React from 'react';
import TickBox from './TickBox';

const TickRow = ({row}) => {
  let tdata = [];
  for (let j= 1; j <=3; j++) {
    tdata.push(<TickBox key={j} row={row} col={j}/>);
  }
  return (
    <tr data-row-no={row}>
      { tdata }
    </tr>
  );
};

export default TickRow;